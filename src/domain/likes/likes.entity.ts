import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BasicEntity } from '../../config/basic.entity';
import { UserEntity } from '../users/user.entity';
import { PostEntity } from '../posts/post.entity';
import { CommentEntity } from '../comments/comment.entity';

export interface ILike {
  user: UserEntity;
  userId: number;
  post: PostEntity;
  postId: number;
  comment: CommentEntity;
  commentId: number;
}

@Entity('likes')
export class LikesEntity extends BasicEntity implements ILike {
  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @Column()
  userId: number;

  @ManyToOne(() => PostEntity, (post) => post.likes, {
    cascade: ['insert', 'update', 'soft-remove', 'remove'],
  })
  post: PostEntity;

  @Column({ nullable: true })
  postId: number;

  @ManyToOne(() => CommentEntity, (comment) => comment.likes)
  comment: CommentEntity;

  @Column({ nullable: true })
  commentId: number;

  constructor(
    user: UserEntity,
    userId: number,
    post?: PostEntity,
    comment?: CommentEntity,
  ) {
    super();
    this.user = user;
    this.userId = userId;
    this.post = post || null;
    this.postId = post ? post.id : null;
    this.comment = comment || null;
    this.commentId = comment ? comment.id : null;
  }
}
