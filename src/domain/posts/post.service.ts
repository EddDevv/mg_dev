import { Injectable, NotFoundException } from '@nestjs/common';
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
import { LikePostRequest } from '../../application/dto/likes/likes.request';
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

    return new PostResponse(new Post(post));
  }

  async getAllPosts({
    userId,
  }: PostsGetListRequest): Promise<PostListResponse> {
    const [posts, count] = await this.postsRepository.findAndCount({
      relations: ['user', 'user.business'],
      where: {
        userId,
      },
    });

    if (count == 0) {
      return new PostListResponse([], 0);
    }

    const resPosts = posts.map((post) => {
      return new Post(post);
    });

    return new PostListResponse(resPosts, count);
  }

  async create({ userId, text }: PostsCreateRequest): Promise<PostResponse> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(CustomExceptions.user.NotFound);
    }

    const post = new PostEntity(user, userId, text);
    await this.postsRepository.save(post);
    return new PostResponse(new Post(post));
  }

  async addView({ id }: PostsAddViewRequest): Promise<void> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(CustomExceptions.posts.NotFound);
    }

    post.views += 1;

    await this.postsRepository.save(post);
  }

  async update(
    id: number,
    { text }: PostsUpdateRequest,
  ): Promise<PostResponse> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(CustomExceptions.posts.NotFound);
    }

    post.text = text;
    await this.postsRepository.save(post);

    return new PostResponse(new Post(post));
  }

  async deletePost(id: number): Promise<void> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(CustomExceptions.posts.NotFound);
    }

    await this.postsRepository.softDelete({ id: post.id });
  }

  async like(user: User, { postId }: LikePostRequest): Promise<LikePost> {
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(CustomExceptions.posts.NotFound);
    }

    const existUser = await this.usersRepository.findOne({
      where: { id: user.id },
    });

    const like = new LikesEntity(existUser, user.id, post, null);
    await this.likesRepository.save(like);

    return new LikePost(user, new Post(post));
  }

  async getLikes({ postId }: LikePostRequest): Promise<LikeListPostResponse> {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });
    if (!post) {
      throw new NotFoundException(CustomExceptions.posts.NotFound);
    }

    const [likes, count] = await this.likesRepository.findAndCount({
      where: { postId: post.id },
      relations: ['user'],
    });

    const likesResponse = likes.map((like) => {
      return new LikePost(like.user, like.post);
    });

    return new LikeListPostResponse(likesResponse, count);
  }
}
