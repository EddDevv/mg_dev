import { Injectable } from '@nestjs/common';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { BasicRepository } from '../../config/basic-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/domain/comments/comment.entity';

@Injectable()
export class CommentsRepository implements BasicRepository<CommentEntity> {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly repo: Repository<CommentEntity>,
  ) {}

  find(
    options: FindManyOptions<CommentEntity>,
  ): Promise<CommentEntity[] | undefined> {
    return this.repo.find(options);
  }

  findOne(
    options: FindOneOptions<CommentEntity>,
  ): Promise<CommentEntity | undefined> {
    return this.repo.findOne(options);
  }

  async save(data: CommentEntity): Promise<CommentEntity> {
    return this.repo.save(data);
  }

  async softDelete(options: FindOptionsWhere<CommentEntity>): Promise<void> {
    await this.repo.softDelete(options);
  }
}
