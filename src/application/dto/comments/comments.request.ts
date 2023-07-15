import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    description: 'The first name of the user',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: 1, description: 'The user id' })
  @IsOptional()
  userId: number;

  @ApiProperty({ example: 1, description: 'The post id' })
  @IsOptional()
  postId: number;

  @ApiProperty({ example: 1, description: 'The parent comment id' })
  @IsOptional()
  parentCommentId: number;
}

export class UpdateCommentDto {
  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
    description: 'The first name of the user',
  })
  @IsString()
  @IsOptional()
  text?: string;

  @ApiProperty({ example: 1, description: 'The user id' })
  @IsOptional()
  userId: number;

  @ApiProperty({ example: 1, description: 'The post id' })
  @IsOptional()
  postId?: number;

  @ApiProperty({ example: 1, description: 'The parent comment id' })
  @IsOptional()
  parentCommentId?: number;
}

export class CommentUpdateRequest extends PartialType(UpdateCommentDto) {}
