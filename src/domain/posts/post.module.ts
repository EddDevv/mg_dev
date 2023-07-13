import { Module } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { UserEntity } from '../users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from 'src/application/controllers/post.controller';
import { PostsService } from './post.service';
import { PostsRepository } from 'src/infrastructure/repositories/posts.repository';
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity]), UserModule],
  providers: [PostsService, PostsRepository],
  controllers: [PostController],
  exports: [PostsService, PostsRepository]
})
export class PostModule {}
