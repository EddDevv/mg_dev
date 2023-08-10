import { ApiProperty } from '@nestjs/swagger';
import { CommentEntity, IComment } from 'src/domain/comments/comment.entity';
import {
  BasicResponse,
  BasicResponseArray,
} from '../../../config/basic.response';
import { Post } from '../posts/posts.response';
import { User } from '../users/users.response';
import moment from 'moment';

export class Comment
  implements
    Omit<
      IComment,
      | 'userId'
      | 'postId'
      | 'deletedAt'
      | 'post'
      | 'updatedAt'
      | 'user'
      | 'parentComment'
      | 'parentCommentId'
      | 'childrenComments'
      | 'createdAt'
    >
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  text: string;

  @ApiProperty({ type: User })
  user: User;

  @ApiProperty({ type: Comment })
  parentComment?: Comment;

  @ApiProperty({ type: Comment, isArray: true })
  childrenComments: Comment[];

  @ApiProperty({ type: Post })
  post: Post;

  @ApiProperty()
  createdAt: string;

  constructor(comment: CommentEntity) {
    this.id = comment.id;
    this.text = comment.text;
    this.createdAt = moment(comment.createdAt).format('YYYY-MM-DD');
  }
}

export class CommentResponse extends BasicResponse<Comment> {
  constructor(comment: Comment) {
    super(comment);
  }

  @ApiProperty({ type: Comment })
  item: Comment;
}

export class CommentsListResponse extends BasicResponseArray<Comment> {
  constructor(comments: Comment[], count: number) {
    super(comments, count);
  }

  @ApiProperty({ type: Comment, isArray: true })
  items: Comment[];
}
