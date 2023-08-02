import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IPost } from '../../../domain/posts/post.entity';
import { UserEntity } from '../../../domain/users/user.entity';

// export class EventCreateRequest
//   implements Omit<IPost, 'user' | 'shareId' | 'comments' | 'views' | 'likes'>
// {
//   @ApiProperty({ example: '2', description: 'The user id' })
//   @IsNotEmpty()
//   userId: number;

//   @ApiProperty({
//     example:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     description: 'The post text',
//   })
//   @IsNotEmpty()
//   @IsString()
//   text: string;
// }

// export class PostsGetRequest {
//   @ApiProperty()
//   id: number;
// }

// export class PostsGetListRequest {
//   @ApiProperty()
//   userId: number;
// }

// export class PostsUpdateRequest
//   implements
//     Omit<IPost, 'userId' | 'user' | 'shareId' | 'comments' | 'views' | 'likes'>
// {
//   @ApiProperty({
//     example:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     description: 'The first name of the user',
//   })
//   @IsString()
//   text: string;
// }

// export class PostsAddViewRequest {
//   @ApiProperty()
//   id: number;
// }
