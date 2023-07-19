import { Injectable } from '@nestjs/common';
import { BasicRepository } from '../../config/basic-repository.interface';
import { LocationEntity } from '../../domain/locations/location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class LocationsRepository implements BasicRepository<LocationEntity> {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly repo: Repository<LocationEntity>,
  ) {}

  find(
    options: FindManyOptions<LocationEntity>,
  ): Promise<LocationEntity[] | undefined> {
    return this.repo.find(options);
  }

  findOne(
    options: FindOneOptions<LocationEntity>,
  ): Promise<LocationEntity | undefined> {
    return this.repo.findOne(options);
  }

  save(data: LocationEntity): Promise<LocationEntity> {
    return this.repo.save(data);
  }

  async softDelete(options: FindOptionsWhere<LocationEntity>): Promise<void> {
    await this.repo.softDelete(options);
  }
}
