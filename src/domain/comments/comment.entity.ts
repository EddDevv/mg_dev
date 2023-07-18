import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { PostEntity } from '../posts/post.entity';
import { UserEntity } from '../users/user.entity';
import { BasicEntity } from '../../config/basic.entity';

export interface IComment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  text: string;
  user: UserEntity;
  userId: number;
  post: PostEntity;
  postId: number;
  parentComment: CommentEntity;
  parentCommentId: number;
  childrenComments: CommentEntity[];
}

@Entity('comments')
export class CommentEntity extends BasicEntity implements IComment {
  @Column()
  text: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;

  @Column()
  userId: number;

  @ManyToOne(() => PostEntity, (post) => post.comments, {
    nullable: true,
  })
  post: PostEntity;

  @Column({ nullable: true })
  postId: number;

  @ManyToOne(
    () => CommentEntity,
    (commentEntity) => commentEntity.childrenComments,
    {
      nullable: true,
      onDelete: 'CASCADE',
    },
  )
  parentComment: CommentEntity;

  @Column()
  parentCommentId: number;

  @OneToMany(
    () => CommentEntity,
    (commentEntity) => commentEntity.parentComment,
  )
  @JoinColumn()
  childrenComments: CommentEntity[];

  constructor(user: UserEntity, userId: number, text) {
    super();
    this.user = user;
    this.userId = userId;
    this.text = text;
  }

  addPostInfo(post: PostEntity) {
    this.post = post;
    this.postId = post.id;
  }

  addParentCommentInfo(parentComment: CommentEntity) {
    this.parentComment = parentComment;
    this.parentCommentId = parentComment.id;
  }
}
