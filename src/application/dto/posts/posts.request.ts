import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PostsCreateRequest {
  @ApiProperty({ example: '2', description: 'The user id' })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    description: 'The post text',
  })
  @IsNotEmpty()
  @IsString()
  text: string;
}

export class UpdatePostDto {
  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    description: 'The first name of the user',
  })
  @IsString()
  text?: string;

  @ApiProperty({ example: 1, description: 'The number of likes' })
  @IsNumber()
  likes?: number;

  @ApiProperty({
    example: 23,
    description: 'The number of comments',
  })
  @IsNumber()
  comments?: number;

  @ApiProperty({
    example: 2,
    description: 'The number of views',
  })
  @IsNumber()
  views?: number;

  @ApiProperty({
    example: 12,
    description: 'The number of shares',
  })
  @IsNumber()
  shares?: number;
}

export class PostsUpdateRequest extends PartialType(UpdatePostDto) {}
