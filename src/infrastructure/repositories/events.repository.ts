import { Injectable } from '@nestjs/common';
import { BasicRepository } from '../../config/basic-repository.interface';
import { EventsEntity } from '../../domain/events/events.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export class EventsRepository implements BasicRepository<EventsEntity> {
  constructor(
    @InjectRepository(EventsEntity)
    private readonly repo: Repository<EventsEntity>,
  ) {}

  find(
    options: FindManyOptions<EventsEntity>,
  ): Promise<EventsEntity[] | undefined> {
    return this.repo.find(options);
  }

  findAndCount(
    options: FindManyOptions<EventsEntity>,
  ): Promise<[EventsEntity[], number]> {
    return this.repo.findAndCount(options);
  }

  findOne(
    options: FindOneOptions<EventsEntity>,
  ): Promise<EventsEntity | undefined> {
    return this.repo.findOne(options);
  }

  async save(data: EventsEntity): Promise<EventsEntity> {
    return await this.repo.save(data);
  }

  async softDelete(options: FindOptionsWhere<EventsEntity>): Promise<void> {
    await this.repo.softDelete(options);
  }
}
