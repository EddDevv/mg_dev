import { ApiProperty } from '@nestjs/swagger';
import { BasicEntity } from '../../config/basic.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '../users/user.entity';

export interface Post {
  text: string;
  likes: number;
  comments: number;
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
  comments: number;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  shares: number;

  @ManyToOne(() => UserEntity, user => user.posts)
  user: UserEntity;
}
