import { Injectable } from '@nestjs/common';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicRepository } from '../../config/basic-repository.interface';
import { CategoriesEntity } from 'src/domain/categories/categories.entity';

@Injectable()
export class CategoriesRepository implements BasicRepository<CategoriesEntity> {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly repo: Repository<CategoriesEntity>,
  ) {}

  find(
    options: FindManyOptions<CategoriesEntity>,
  ): Promise<CategoriesEntity[] | undefined> {
    return this.repo.find(options);
  }

  findAndCount(
    options: FindManyOptions<CategoriesEntity>,
  ): Promise<[CategoriesEntity[], number]> {
    return this.repo.findAndCount(options);
  }

  findOne(
    options: FindOneOptions<CategoriesEntity>,
  ): Promise<CategoriesEntity | undefined> {
    return this.repo.findOne(options);
  }

  async save(data: CategoriesEntity): Promise<CategoriesEntity> {
    return this.repo.save(data);
  }

  async softDelete(options: FindOptionsWhere<CategoriesEntity>): Promise<void> {
    await this.repo.softDelete(options);
  }
}
