import { ApiProperty } from '@nestjs/swagger';
import { IPost, PostEntity } from 'src/domain/posts/post.entity';
import {
  BasicResponse,
  BasicResponseArray,
} from '../../../config/basic.response';
import { Comment } from '../comments/comments.response';
import { User } from '../users/users.response';
import * as moment from 'moment';

export class Post
  implements Omit<IPost, 'user' | 'userId' | 'comments' | 'likes'>
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  shareId: string;

  @ApiProperty()
  text: string;

  @ApiProperty({ type: User })
  user: User;

  @ApiProperty()
  comments: Comment[];

  @ApiProperty()
  views: number;

  @ApiProperty()
  createdAt: string;

  constructor(post: PostEntity) {
    this.id = post.id;
    this.shareId = post.shareId;
    this.text = post.text;
    this.user = new User(post.user);
    this.views = post.views;
    this.createdAt = moment(post.createdAt).format('YYYY-MM-DD');
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
