import { ILike } from '../../../domain/likes/likes.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from '../../../config/pagination';

export class LikePostRequest
  implements Omit<ILike, 'comment' | 'commentId' | 'post' | 'user' | 'userId'>
{
  @ApiProperty()
  postId: number;
}

export class LikeCommentRequest
  implements Omit<ILike, 'comment' | 'post' | 'user' | 'userId' | 'postId'>
{
  @ApiProperty()
  commentId: number;
}

export class LikePostListRequest extends Pagination {
  @ApiProperty()
  postId: number;
}
