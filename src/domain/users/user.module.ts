import { Module } from '@nestjs/common';
import { UserController } from '../../application/controllers/user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { PostEntity } from '../posts/post.entity';
import { PostModule } from '../posts/post.module';
import { CommentEntity } from '../comments/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PostEntity, CommentEntity])],
  controllers: [UserController],
  providers: [UserService, UsersRepository],
  exports: [UserService, UsersRepository],
})
export class UserModule {}
