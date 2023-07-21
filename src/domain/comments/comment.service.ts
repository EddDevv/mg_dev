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
import { LikeCommentRequest } from '../../application/dto/likes/likes.request';
import { LikesEntity } from '../likes/likes.entity';
import {
  LikeComment,
  LikeListCommentResponse,
  LikePost,
} from '../../application/dto/likes/likes.response';
import { LikesRepository } from '../../infrastructure/repositories/likes.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly likesRepository: LikesRepository,
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
    const comment = await this.commentsRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(CustomExceptions.comments.NotFound);
    }

    await this.commentsRepository.softDelete({ id: comment.id });
  }

  async likeComment(
    user: User,
    { commentId }: LikeCommentRequest,
  ): Promise<LikeComment> {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId },
    });
    if (!comment) {
      throw new NotFoundException(CustomExceptions.comments.NotFound);
    }

    const existUser = await this.usersRepository.findOne({
      where: { id: user.id },
    });

    const like = new LikesEntity(existUser, user.id, null, comment);
    await this.likesRepository.save(like);

    return new LikeComment(user, new Comment(comment));
  }

  async getLikes({
    commentId,
  }: LikeCommentRequest): Promise<LikeListCommentResponse> {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId },
    });
    if (!comment) {
      throw new NotFoundException(CustomExceptions.comments.NotFound);
    }

    const [likes, count] = await this.likesRepository.findAndCount({
      where: { commentId: comment.id },
      relations: ['user'],
    });

    const likesResponse = likes.map((like) => {
      return new LikePost(like.user, like.post);
    });

    return new LikeListCommentResponse(likesResponse, count);
  }
}
