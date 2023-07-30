import { Injectable } from '@nestjs/common';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicRepository } from '../../config/basic-repository.interface';
import { ServicesEntity } from 'src/domain/services/services.entity';

@Injectable()
export class ServicesRepository implements BasicRepository<ServicesEntity> {
  constructor(
    @InjectRepository(ServicesEntity)
    private readonly repo: Repository<ServicesEntity>,
  ) {}

  find(
    options: FindManyOptions<ServicesEntity>,
  ): Promise<ServicesEntity[] | undefined> {
    return this.repo.find(options);
  }

  findAndCount(
    options: FindManyOptions<ServicesEntity>,
  ): Promise<[ServicesEntity[], number]> {
    return this.repo.findAndCount(options);
  }

  findOne(
    options: FindOneOptions<ServicesEntity>,
  ): Promise<ServicesEntity | undefined> {
    return this.repo.findOne(options);
  }

  async save(data: ServicesEntity): Promise<ServicesEntity> {
    return this.repo.save(data);
  }

  async softDelete(options: FindOptionsWhere<ServicesEntity>): Promise<void> {
    await this.repo.softDelete(options);
  }
}
