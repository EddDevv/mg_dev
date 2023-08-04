import { Injectable } from '@nestjs/common';
import { BasicRepository } from '../../config/basic-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { RecordsEntity } from 'src/domain/records/records.entity';

@Injectable()
export class RecordsRepository implements BasicRepository<RecordsEntity> {
  constructor(
    @InjectRepository(RecordsEntity)
    private readonly repo: Repository<RecordsEntity>,
  ) {}

  find(
    options: FindManyOptions<RecordsEntity>,
  ): Promise<RecordsEntity[] | undefined> {
    return this.repo.find(options);
  }

  findAndCount(
    options: FindManyOptions<RecordsEntity>,
  ): Promise<[RecordsEntity[], number]> {
    return this.repo.findAndCount(options);
  }

  findOne(
    options: FindOneOptions<RecordsEntity>,
  ): Promise<RecordsEntity | undefined> {
    return this.repo.findOne(options);
  }

  save(data: RecordsEntity): Promise<RecordsEntity> {
    return this.repo.save(data);
  }

  async softDelete(options: FindOptionsWhere<RecordsEntity>): Promise<void> {
    await this.repo.softDelete(options);
  }
}
