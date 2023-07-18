import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { CommentEntity } from './comment.entity';
import { PostEntity } from '../posts/post.entity';
import { UserEntity } from '../users/user.entity';
import { CommentsRepository } from 'src/infrastructure/repositories/comments.repository';
import { PostModule } from '../posts/post.module';
import { CommentsService } from './comment.service';
import { CommentsController } from 'src/application/controllers/comments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), UserModule, PostModule],
  providers: [CommentsService, CommentsRepository, JwtService],
  controllers: [CommentsController],
  exports: [CommentsService, CommentsRepository],
})
export class CommentModule {}
