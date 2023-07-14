import { Injectable, NotFoundException } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { UsersRepository } from 'src/infrastructure/repositories/users.repository';
import { PostsRepository } from 'src/infrastructure/repositories/posts.repository';
import {
  PostsCreateRequest,
  UpdatePostDto,
} from 'src/application/dto/posts/posts.request';
import {
  PostRoleListResponse,
  PostsResponse,
  PostsRoleResponse,
} from 'src/application/dto/posts/posts.response';
import { BusinessAccountService } from '../business-accounts/business-accounts.service';
import { CustomExceptions } from 'src/config/messages/custom.exceptions';

@Injectable()
export class PostsService {

  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly businessAccountService: BusinessAccountService,
  ) {}

  async getAllPosts(): Promise<PostRoleListResponse> {
    const posts = await this.postsRepository.find({
      relations: ['user', 'user.business'],
    });
    return new PostRoleListResponse(posts);
  }

  async getPostById(id: number): Promise<PostsRoleResponse> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user', 'user.business'],
    });
    if (!post) {
      throw new NotFoundException(CustomExceptions.posts.NotFound);
    }
    return new PostsRoleResponse(post);
  }

  async createPost({
    userId,
    text,
  }: PostsCreateRequest): Promise<PostsResponse> {
    const user = await this.usersRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException(CustomExceptions.user.NotFound);
    }

    const post = new PostEntity(userId, text);
    await this.postsRepository.save(post);
    return new PostsResponse(post);
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<PostsResponse> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(CustomExceptions.posts.NotFound);
    }

    post.update(updatePostDto);
    await this.postsRepository.save(post);

    return new PostsResponse(post);
  }

  async deletePost(id: number): Promise<void> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(CustomExceptions.posts.NotFound);
    }
    await this.postsRepository.softDelete(id);
  }
}
