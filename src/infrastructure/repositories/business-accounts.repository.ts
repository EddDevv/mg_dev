import { Injectable } from '@nestjs/common';
import { BasicRepository } from '../../config/basic-repository.interface';
import { BusinessAccountEntity } from '../../domain/business-accounts/business-account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class BusinessAccountsRepository
  implements BasicRepository<BusinessAccountEntity>
{
  constructor(
    @InjectRepository(BusinessAccountEntity)
    private readonly repo: Repository<BusinessAccountEntity>,
  ) {}

  find(
    options: FindManyOptions<BusinessAccountEntity>,
  ): Promise<BusinessAccountEntity[] | undefined> {
    return this.repo.find(options);
  }

  findAndCount(
    options: FindManyOptions<BusinessAccountEntity>,
  ): Promise<[BusinessAccountEntity[], number]> {
    return this.repo.findAndCount(options);
  }

  findOne(
    options: FindOneOptions<BusinessAccountEntity>,
  ): Promise<BusinessAccountEntity | undefined> {
    return this.repo.findOne(options);
  }

  save(data: BusinessAccountEntity): Promise<BusinessAccountEntity> {
    return this.repo.save(data);
  }

  async softDelete(
    options: FindOptionsWhere<BusinessAccountEntity>,
  ): Promise<void> {
    await this.repo.softDelete(options);
  }
}
