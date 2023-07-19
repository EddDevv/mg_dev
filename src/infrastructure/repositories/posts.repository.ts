import { Injectable } from '@nestjs/common';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/domain/posts/post.entity';
import { BasicRepository } from '../../config/basic-repository.interface';

@Injectable()
export class PostsRepository implements BasicRepository<PostEntity> {
  constructor(
    @InjectRepository(PostEntity)
    private readonly repo: Repository<PostEntity>,
  ) {}

  find(
    options: FindManyOptions<PostEntity>,
  ): Promise<PostEntity[] | undefined> {
    return this.repo.find(options);
  }

  findAndCount(
    options: FindManyOptions<PostEntity>,
  ): Promise<[PostEntity[], number]> {
    return this.repo.findAndCount(options);
  }

  findOne(
    options: FindOneOptions<PostEntity>,
  ): Promise<PostEntity | undefined> {
    return this.repo.findOne(options);
  }

  async save(data: PostEntity): Promise<PostEntity> {
    return this.repo.save(data);
  }

  async softDelete(options: FindOptionsWhere<PostEntity>): Promise<void> {
    await this.repo.softDelete(options);
  }
}
