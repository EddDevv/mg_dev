import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/domain/posts/post.entity';

@Injectable()
export class PostsRepository {
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

  async softDelete(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }
}
