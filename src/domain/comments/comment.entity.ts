import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { PostEntity } from '../posts/post.entity';
import { UserEntity } from '../users/user.entity';
import { UpdateCommentDto } from 'src/application/dto/comments/comments.request';

export interface Comment {
  text: string;
  userId: number;
  postId?: number;
  parentCommentId?: number;
}

@Entity('comments')
export class CommentEntity implements Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  userId: number;

  @Column()
  postId: number;

  @Column()
  parentCommentId: number;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  post: PostEntity;

  @ManyToOne(() => CommentEntity, (commentEntity) => commentEntity.replies, {
    onDelete: 'CASCADE',
  })
  parentComment: CommentEntity;

  @OneToMany(
    () => CommentEntity,
    (commentEntity) => commentEntity.parentComment,
  )
  @JoinColumn()
  replies: CommentEntity[];

  update(commentData: UpdateCommentDto) {
    if (commentData.hasOwnProperty('text')) {
      this.text = commentData.text;
    }
  }
}
