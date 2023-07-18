import { Module } from '@nestjs/common';
import { PostEntity } from './post.entity';
import { UserEntity } from '../users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from 'src/application/controllers/posts.controller';
import { PostsService } from './post.service';
import { PostsRepository } from 'src/infrastructure/repositories/posts.repository';
import { UserModule } from '../users/user.module';
import { BusinessAccountModule } from '../business-accounts/business-accounts.module';
import { JwtService } from '@nestjs/jwt';
import { CommentEntity } from '../comments/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    UserModule,
    BusinessAccountModule,
  ],
  providers: [PostsService, PostsRepository, JwtService],
  controllers: [PostsController],
  exports: [PostsService, PostsRepository],
})
export class PostModule {}
