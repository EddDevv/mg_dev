import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCommentDto,
  UpdateCommentDto,
} from 'src/application/dto/comments/comments.request';
import { CommentsRepository } from 'src/infrastructure/repositories/comments.repository';
import { PostsRepository } from 'src/infrastructure/repositories/posts.repository';
import { CommentEntity } from './comment.entity';
import { UsersRepository } from 'src/infrastructure/repositories/users.repository';
import { CommentsResponse } from 'src/application/dto/comments/comments.response';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const comment = new CommentEntity();
    comment.text = createCommentDto.text;

    if (createCommentDto.userId) {
      const user = await this.usersRepository.findOne({
        where: { id: createCommentDto.userId },
      });
      if (!user) {
        throw new NotFoundException(
          `User with id ${createCommentDto.userId} not found`,
        );
      }
      comment.user = user;
    }

    if (createCommentDto.postId) {
      const post = await this.postsRepository.findOne({
        where: { id: createCommentDto.postId },
      });
      if (!post) {
        throw new NotFoundException(
          `Post with id ${createCommentDto.postId} not found`,
        );
      }
      comment.post = post;
    }

    if (createCommentDto.parentCommentId) {
      const parentComment = await this.commentsRepository.findOne({
        where: { id: createCommentDto.parentCommentId },
      });
      if (!parentComment) {
        //throw new NotFoundException(`Comment with id ${createCommentDto.parentCommentId} not found`);
      }
      comment.parentComment = parentComment;
    }

    this.commentsRepository.save(comment);
    return new CommentsResponse(comment);
  }

  async findAll(): Promise<CommentEntity[]> {
    return this.commentsRepository.find({
      relations: ['user', 'post', 'replies'],
    });
  }

  async findOne(id: number) {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['user', 'post', 'replies'],
    });
    if (!comment) {
      //throw new NotFoundException(`Comment with id ${id} not found`);
    }
    return new CommentsResponse(comment);
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CommentEntity> {
    const comment = await this.commentsRepository.findOne({
      where: { id: id },
    });
    //Object.assign(comment, updateCommentDto);
    comment.update(updateCommentDto);
    return this.commentsRepository.save(comment);
  }

  async remove(id: number): Promise<void> {
    await this.commentsRepository.softDelete(id);
  }
}
