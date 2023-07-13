import { Injectable } from '@nestjs/common';
import { Post, PostEntity } from './post.entity';
import { UsersRepository } from 'src/infrastructure/repositories/users.repository';
import { PostsRepository } from 'src/infrastructure/repositories/posts.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ['user'],
    });
  }

  async getPostById(id: number): Promise<Post> {
    return this.postsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async createPost(text: string, userId: number): Promise<Post> {
    const id = userId;
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    const newPost = new PostEntity();
    newPost.text = text;
    newPost.user = user;

    return this.postsRepository.save(newPost);
  }

  // async updatePost(id: number, updatedPost: Partial<Post>): Promise<Post> {
  //   await this.postsRepository.update(id, updatedPost);
  //   return this.postsRepository.findOne({
  //     where: { id },
  //     relations: ['user'],
  //   });
  // }

  async deletePost(id: number): Promise<void> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new Error('Post not found');
    }
    await this.postsRepository.softRemove(post);
  }
}