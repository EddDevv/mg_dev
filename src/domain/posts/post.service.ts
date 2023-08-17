import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostEntity } from './post.entity';
import { UsersRepository } from 'src/infrastructure/repositories/users.repository';
import { PostsRepository } from 'src/infrastructure/repositories/posts.repository';
import {
  PostsAddViewRequest,
  PostsCreateRequest,
  PostsGetListRequest,
  PostsGetRequest,
  PostsUpdateRequest,
} from 'src/application/dto/posts/posts.request';
import {
  Post,
  PostListResponse,
  PostResponse,
} from 'src/application/dto/posts/posts.response';
import { CustomExceptions } from 'src/config/messages/custom.exceptions';
import { User } from '../../application/dto/users/users.response';
import {
  LikePostListRequest,
  LikePostRequest,
} from '../../application/dto/likes/likes.request';
import {
  LikePost,
  LikeListPostResponse,
} from '../../application/dto/likes/likes.response';
import { LikesEntity } from '../likes/likes.entity';
import { LikesRepository } from '../../infrastructure/repositories/likes.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly likesRepository: LikesRepository,
  ) {}

  async getPost({ id }: PostsGetRequest): Promise<PostResponse> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!post) {
      throw new NotFoundException(CustomExceptions.posts.NotFound);
    }

    return new PostResponse(new Post(post.id, post));
  }

  async getAllPosts({
    userId,
    page,
    take,
    orderBy,
  }: PostsGetListRequest): Promise<PostListResponse> {
    const [posts, count] = await this.postsRepository.findAndCount({
      relations: ['user', 'user.business'],
      where: {
        userId,
      },
      skip: page ? page * 10 : 0,
      take: take ?? 10,
      order: {
        createdAt: orderBy ?? 'ASC',
      },
    });

    if (posts.length == 0) {
      return new PostListResponse([], 0);
    }

    const resPosts = posts.map((post) => {
      return new Post(post.id, post);
    });

    return new PostListResponse(resPosts, count);
  }

  async create(
    current: User,
    { text }: PostsCreateRequest,
  ): Promise<PostResponse> {
    const currentUser = await this.usersRepository.findOne({
      where: { id: current.id },
    });
    if (!currentUser) {
      throw new NotFoundException(CustomExceptions.user.NotFound);
    }

    const post = new PostEntity(currentUser, currentUser.id, text);
    await this.postsRepository.save(post);

    return new PostResponse(new Post(post.id, post));
  }

  async addView(user: User, { id }: PostsAddViewRequest): Promise<void> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(CustomExceptions.posts.NotFound);
    }

    if (post.userId == user.id) {
      throw new ForbiddenException(CustomExceptions.posts.ViewYourOwn);
    }

    post.views += 1;

    await this.postsRepository.save(post);
  }

  async update(
    id: number,
    { text }: PostsUpdateRequest,
  ): Promise<PostResponse> {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });
    if (!post) {
      throw new NotFoundException(CustomExceptions.posts.NotFound);
    }

    post.text = text;
    await this.postsRepository.save(post);

    return new PostResponse(new Post(post.id, post));
  }

  async deletePost(user: User, id: number): Promise<void> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(CustomExceptions.posts.NotFound);
    }

    if (post.userId !== user.id) {
      throw new ForbiddenException(CustomExceptions.posts.DeleteOnlyOwn);
    }

    await this.postsRepository.softDelete({ id: post.id });
  }

  async like(user: User, { postId }: LikePostRequest): Promise<LikePost> {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['user'],
    });
    if (!post) {
      throw new NotFoundException(CustomExceptions.posts.NotFound);
    }

    const existUser = await this.usersRepository.findOne({
      where: { id: user.id },
    });

    const existLike = await this.likesRepository.findOne({
      where: {
        postId,
        userId: user.id,
      },
    });

    if (existLike) {
      throw new ForbiddenException(CustomExceptions.posts.AlreadyHaveLike);
    }

    const like = new LikesEntity(existUser, user.id, post, null);
    await this.likesRepository.save(like);

    return new LikePost(user, new Post(post.id, post));
  }

  async getLikes({
    postId,
    take,
    orderBy,
    page,
  }: LikePostListRequest): Promise<LikeListPostResponse> {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });
    if (!post) {
      throw new NotFoundException(CustomExceptions.posts.NotFound);
    }

    const [likes, count] = await this.likesRepository.findAndCount({
      where: { postId: post.id },
      take: take ?? 10,
      skip: page ? page * 10 : 0,
      order: {
        createdAt: orderBy ?? 'ASC',
      },
      relations: ['user'],
    });

    const likesResponse = likes.map((like) => {
      return new LikePost(
        new User(like.user),
        new Post(like.post.id, like.post),
      );
    });

    if (likesResponse.length == 0) {
      return new LikeListPostResponse([], 0);
    }

    return new LikeListPostResponse(likesResponse, count);
  }
}
