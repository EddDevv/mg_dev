import { ILike } from '../../../domain/likes/likes.entity';
import { ApiProperty } from '@nestjs/swagger';

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
