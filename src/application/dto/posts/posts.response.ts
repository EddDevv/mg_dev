import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Post, PostEntity } from 'src/domain/posts/post.entity';
import { IsOptional } from 'class-validator';
import { UserRoleEnum } from 'src/config/enums/user-role.enum';

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
  @ApiProperty()
  post: PostsResponse;

  @ApiProperty({ nullable: true })
  @IsOptional()
  firstname?: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  lastName?: string | null;

  @ApiProperty({ nullable: true })
  @IsOptional()
  businessName?: string;

  constructor(post: PostEntity) {
    this.post = new PostsResponse(post);
    if (!post.user) {
      this.firstname = 'Unknown';
      this.lastName = null;
    } else {
      if (post.user.role == UserRoleEnum.Business) {
        this.businessName = post.user.business.businessName;
      }
      if (post.user.role == UserRoleEnum.Client) {
        this.firstname = post.user.firstname;
        this.lastName = post.user.lastName;
      }
    }
  }
}

export class PostRoleListResponse {
  @ApiProperty()
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
