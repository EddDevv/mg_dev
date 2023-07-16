import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Post, PostEntity } from 'src/domain/posts/post.entity';
import { IsOptional } from 'class-validator';
import { UserRoleEnum } from 'src/config/enums/user-role.enum';
import { UserEntity } from 'src/domain/users/user.entity';

export class PostsResponse implements Post {
  @ApiProperty()
  id: number;

  @ApiProperty()
  text: string;

  @ApiProperty()
  likes: number;

  @ApiProperty()
  comments: number;

  @ApiProperty()
  views: number;

  @ApiProperty()
  shares: number;

  @ApiProperty()
  createdAt: Date;

  constructor(post: PostEntity) {
    this.id = post.id;
    this.text = post.text;
    this.likes = post.likes;
    this.comments = post.comments;
    this.views = post.views;
    this.shares = post.shares;
    this.createdAt = post.createdAt;
  }
}

export class PostsRoleResponse {
  @ApiProperty({ type: PostsRoleResponse })
  post: PostsResponse;

  @ApiProperty({ nullable: true })
  firstName?: string;

  @ApiProperty({ nullable: true })
  lastName?: string | null;

  @ApiProperty({ nullable: true })
  businessName?: string;

  constructor(post: PostEntity) {
    this.post = new PostsResponse(post);

    const { firstName, lastName, businessName } = this.getUserInfo(post.user);
    this.firstName = firstName;
    this.lastName = lastName;
    this.businessName = businessName;
  }

  private getUserInfo(user: UserEntity | null): {
    firstName?: string;
    lastName?: string | null;
    businessName?: string;
  } {
    if (!user) {
      return {
        firstName: 'Unknown',
        lastName: undefined,
        businessName: undefined,
      };
    } else {
      switch (user.role) {
        case UserRoleEnum.Business:
          return {
            firstName: undefined,
            lastName: undefined,
            businessName: user.business.businessName,
          };
        case UserRoleEnum.Client:
          return {
            firstName: user.firstname,
            lastName: user.lastName,
            businessName: undefined,
          };
        default:
          return {
            firstName: undefined,
            lastName: undefined,
            businessName: undefined,
          };
      }
    }
  }
}

export class PostRoleListResponse {
  @ApiProperty({ type: PostsRoleResponse, isArray: true })
  posts: PostsRoleResponse[];

  constructor(posts: PostEntity[]) {
    this.posts = this.makePostsRoleResponse(posts);
  }

  makePostsRoleResponse(posts: PostEntity[]): PostsRoleResponse[] {
    return posts.map((post) => {
      return new PostsRoleResponse(post);
    });
  }
}
