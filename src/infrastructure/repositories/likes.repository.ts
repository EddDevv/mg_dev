import { Injectable } from '@nestjs/common';
import { BasicRepository } from '../../config/basic-repository.interface';
import { LikesEntity } from '../../domain/likes/likes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class LikesRepository implements BasicRepository<LikesEntity> {
  constructor(
    @InjectRepository(LikesEntity)
    private readonly repo: Repository<LikesEntity>,
  ) {}

  find(
    options: FindManyOptions<LikesEntity>,
  ): Promise<LikesEntity[] | undefined> {
    return this.repo.find(options);
  }

  findAndCount(
    options: FindManyOptions<LikesEntity>,
  ): Promise<[LikesEntity[], number]> {
    return this.repo.findAndCount(options);
  }

  findOne(
    options: FindOneOptions<LikesEntity>,
  ): Promise<LikesEntity | undefined> {
    return this.repo.findOne(options);
  }

  save(data: LikesEntity): Promise<LikesEntity> {
    return this.repo.save(data);
  }

  async softDelete(options: FindOptionsWhere<LikesEntity>): Promise<void> {
    await this.repo.softDelete(options);
  }
}
