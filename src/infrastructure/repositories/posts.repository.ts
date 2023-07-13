import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { BasicRepository } from '../../config/basic-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/domain/posts/post.entity';

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

  findOne(
    options: FindOneOptions<PostEntity>,
  ): Promise<PostEntity | undefined> {
    return this.repo.findOne(options);
  }

  async save(data: PostEntity): Promise<PostEntity> {
    return this.repo.save(data);
  }

  async softRemove(data: PostEntity): Promise<void> {
    await this.repo.softRemove(data);
  }
}
