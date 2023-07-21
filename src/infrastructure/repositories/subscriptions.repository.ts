import { Injectable } from '@nestjs/common';
import { BasicRepository } from '../../config/basic-repository.interface';
import { SubscriptionsEntity } from '../../domain/subscriptions/subscriptions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class SubscriptionsRepository
  implements BasicRepository<SubscriptionsEntity>
{
  constructor(
    @InjectRepository(SubscriptionsEntity)
    private readonly repo: Repository<SubscriptionsEntity>,
  ) {}

  find(
    options: FindManyOptions<SubscriptionsEntity>,
  ): Promise<SubscriptionsEntity[] | undefined> {
    return this.repo.find(options);
  }

  findAndCount(
    options: FindManyOptions<SubscriptionsEntity>,
  ): Promise<[SubscriptionsEntity[], number]> {
    return this.repo.findAndCount(options);
  }

  findOne(
    options: FindOneOptions<SubscriptionsEntity>,
  ): Promise<SubscriptionsEntity | undefined> {
    return this.repo.findOne(options);
  }

  async save(data: SubscriptionsEntity): Promise<SubscriptionsEntity> {
    return await this.repo.save(data);
  }

  async softDelete(
    options: FindOptionsWhere<SubscriptionsEntity>,
  ): Promise<void> {
    await this.repo.softDelete(options);
  }
}
