import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { PostEntity } from '../posts/post.entity';
import { UserEntity } from '../users/user.entity';
import { UpdateCommentDto } from 'src/application/dto/comments/comments.request';

@Entity('comments')
export class CommentEntity {
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
  replies: CommentEntity[];

  update(commentData: UpdateCommentDto) {
    if (commentData.hasOwnProperty('text')) {
      this.text = commentData.text;
    }
  }
}
