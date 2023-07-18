import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { UserEntity } from '../../../domain/users/user.entity';
import { PostEntity } from '../../../domain/posts/post.entity';
import { CommentEntity } from '../../../domain/comments/comment.entity';

export class CommentsCreateRequest {
  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    description: 'The first name of the user',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: 1, description: 'The post id' })
  @IsOptional()
  postId: number;

  @ApiProperty({ example: 1, description: 'The parent comment id' })
  @IsOptional()
  parentCommentId: number;
}

export class CommentsUpdateRequest {
  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    description: 'The first name of the user',
  })
  @IsString()
  @MinLength(1)
  text: string;
}
