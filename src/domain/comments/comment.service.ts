import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentsRepository } from 'src/infrastructure/repositories/comments.repository';
import { PostsRepository } from 'src/infrastructure/repositories/posts.repository';
import { CommentEntity } from './comment.entity';
import { UsersRepository } from 'src/infrastructure/repositories/users.repository';
import {
  Comment,
  CommentResponse,
} from 'src/application/dto/comments/comments.response';
import {
  CommentsCreateRequest,
  CommentsUpdateRequest,
} from '../../application/dto/comments/comments.request';
import { User } from '../../application/dto/users/users.response';
import { CustomExceptions } from '../../config/messages/custom.exceptions';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(
    user: User,
    { postId, text, parentCommentId }: CommentsCreateRequest,
  ): Promise<CommentResponse> {
    if (!postId && !parentCommentId) {
      throw new BadRequestException(CustomExceptions.comments.NotPasteData);
    }

    const existUser = await this.usersRepository.findOne({
      where: { id: user.id },
    });

    const comment: CommentEntity = new CommentEntity(
      existUser,
      existUser.id,
      text,
    );

    if (postId) {
      const post = await this.postsRepository.findOne({
        where: { id: postId },
      });
      if (!post) {
        throw new NotFoundException(CustomExceptions.posts.NotFound);
      }
      comment.addPostInfo(post);
    }

    if (parentCommentId) {
      const parentComment = await this.commentsRepository.findOne({
        where: { id: parentCommentId },
      });
      if (!parentComment) {
        throw new NotFoundException(CustomExceptions.comments.NotFound);
      }

      comment.addParentCommentInfo(parentComment);
    }

    await this.commentsRepository.save(comment);

    return new CommentResponse(new Comment(comment));
  }

  async findOne(id: number): Promise<CommentResponse> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['user', 'post', 'replies'],
    });
    if (!comment) {
      throw new NotFoundException(CustomExceptions.comments.NotFound);
    }
    return new CommentResponse(new Comment(comment));
  }

  async update(
    id: number,
    { text }: CommentsUpdateRequest,
  ): Promise<CommentResponse> {
    const comment = await this.commentsRepository.findOne({
      where: { id: id },
    });

    if (!comment) {
      throw new NotFoundException(CustomExceptions.comments.NotFound);
    }
    comment.text = text;

    await this.commentsRepository.save(comment);

    return new CommentResponse(new Comment(comment));
  }

  async remove(id: number): Promise<void> {
    await this.commentsRepository.softDelete(id);
  }
}
