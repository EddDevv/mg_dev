import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Post } from '../posts/posts.response';
import { User } from '../users/users.response';
import { Comment } from '../comments/comments.response';
import { BasicResponseArray } from '../../../config/basic.response';
import * as moment from 'moment';

export class Like {
  @ApiProperty({ type: User })
  user: User;

  @ApiProperty({ type: Post })
  post: Post;

  @ApiProperty({ type: Comment })
  comment: Comment;

  constructor(user: User, post: Post, comment: Comment) {
    this.user = user;
    this.post = post;
    this.post.createdAt = moment(post.createdAt).format('YYYY-MM-DD');
    this.comment = comment;
  }
}

export class LikePost extends OmitType(Like, ['comment']) {
  constructor(user: User, post: Post) {
    super(user, post);
  }
}

export class LikeComment extends OmitType(Like, ['comment']) {
  constructor(user: User, comment: Comment) {
    super(user, comment);
  }
}

export class LikeListResponse {
  @ApiProperty({ type: User, isArray: true })
  users: User[];

  @ApiProperty()
  count: number;

  constructor(users: User[], count: number) {
    this.users = users;
    this.count = count;
  }
}
