import { ApiProperty } from '@nestjs/swagger';
import { BasicEntity } from '../../config/basic.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { UpdatePostDto } from 'src/application/dto/posts/posts.request';
import { CommentEntity } from '../comments/comment.entity';

export interface Post {
  text: string;
  likes: number;
  commentsCount: number;
  views: number;
  shares: number;
}

@Entity('posts')
export class PostEntity extends BasicEntity implements Post {
  
  @Column({ length: 5000 })
  text: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  commentsCount: number;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  shares: number;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  constructor(userId: number, text: string) {
    super();
    this.userId = userId;
    this.text = text;
  }

  update(postData: UpdatePostDto) {
    if (postData.hasOwnProperty('text')) {
      this.text = postData.text;
    }
    if (postData.hasOwnProperty('likes')) {
      this.likes = postData.likes;
    }
    if (postData.hasOwnProperty('comments')) {
      this.commentsCount = postData.commentsCount;
    }
    if (postData.hasOwnProperty('views')) {
      this.views = postData.views;
    }
    if (postData.hasOwnProperty('shares')) {
      this.shares = postData.shares;
    }
  }
}
