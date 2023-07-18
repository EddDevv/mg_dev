import { Injectable, NotFoundException } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { UsersRepository } from 'src/infrastructure/repositories/users.repository';
import { PostsRepository } from 'src/infrastructure/repositories/posts.repository';
import {
  PostsCreateRequest,
  PostsUpdateRequest,
} from 'src/application/dto/posts/posts.request';
import {
  Post,
  PostListResponse,
  PostResponse,
} from 'src/application/dto/posts/posts.response';
import { CustomExceptions } from 'src/config/messages/custom.exceptions';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getPost(id: number): Promise<PostResponse> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!post) {
      throw new NotFoundException(CustomExceptions.posts.NotFound);
    }

    return new PostResponse(new Post(post));
  }

  async getAllPosts(userId: number): Promise<PostListResponse> {
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

    await this.postsRepository.softDelete(id);
  }
}
