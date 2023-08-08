import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

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

export class CommentsGetRequest {
  @ApiProperty()
  id: number;
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
