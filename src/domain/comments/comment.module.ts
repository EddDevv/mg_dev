import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { CommentEntity } from './comment.entity';
import { CommentsRepository } from 'src/infrastructure/repositories/comments.repository';
import { PostModule } from '../posts/post.module';
import { CommentsService } from './comment.service';
import { CommentsController } from 'src/application/controllers/comments.controller';
import { LikesModule } from '../likes/likes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    UserModule,
    PostModule,
    LikesModule,
  ],
  providers: [CommentsService, CommentsRepository, JwtService],
  controllers: [CommentsController],
  exports: [CommentsService, CommentsRepository],
})
export class CommentModule {}
