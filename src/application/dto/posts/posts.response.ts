import { ApiProperty } from '@nestjs/swagger';
import { IPost, PostEntity } from 'src/domain/posts/post.entity';
import { UserRoleEnum } from 'src/config/enums/user-role.enum';
import { UserEntity } from 'src/domain/users/user.entity';
import {
  BasicResponse,
  BasicResponseArray,
} from '../../../config/basic.response';

export class Post implements Omit<IPost, 'user' | 'userId'> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  shareId: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  createdAt: Date;

  constructor(post: PostEntity) {
    this.id = post.id;
    this.shareId = post.shareId;
    this.text = post.text;
    this.createdAt = post.createdAt;
  }
}

export class PostResponse extends BasicResponse<Post> {
  constructor(post: Post) {
    super(post);
  }

  @ApiProperty({ type: Post })
  item: Post;
}

export class PostListResponse extends BasicResponseArray<Post> {
  constructor(posts: Post[], count: number) {
    super(posts, count);
  }

  @ApiProperty({ type: Post, isArray: true })
  items: Post[];
}
