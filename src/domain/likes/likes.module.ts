import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesEntity } from './likes.entity';
import { LikesRepository } from '../../infrastructure/repositories/likes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LikesEntity])],
  providers: [LikesRepository],
  exports: [LikesRepository],
})
export class LikesModule {}
