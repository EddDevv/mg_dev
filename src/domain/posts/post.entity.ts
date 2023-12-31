import { v4 as uuidv4 } from 'uuid';
import { BasicEntity } from '../../config/basic.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { CommentEntity } from '../comments/comment.entity';
import { LikesEntity } from '../likes/likes.entity';

export interface IPost {
  shareId: string;
  text: string;
  user: UserEntity;
  userId: number;
  likes: LikesEntity[];
  comments: CommentEntity[];
  views: number;
  image: string;
  // shares: number;
}

@Entity('posts')
export class PostEntity extends BasicEntity implements IPost {
  @Column()
  shareId: string;

  @Column({ length: 5000 })
  text: string;

  @ManyToOne(() => UserEntity, (user) => user.posts, {
    cascade: ['insert', 'update', 'remove', 'soft-remove'],
  })
  user: UserEntity;

  @Column()
  userId: number;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  @Column({ default: 0 })
  views: number;

  @OneToMany(() => LikesEntity, (like) => like.post)
  @JoinColumn()
  likes: LikesEntity[];

  @Column({ nullable: true })
  image: string;

  constructor(user: UserEntity, userId: number, text: string) {
    super();
    this.shareId = uuidv4();
    this.user = user;
    this.userId = userId;
    this.text = text;
  }
}
