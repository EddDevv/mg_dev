import { Injectable } from '@nestjs/common';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { UserEntity } from '../../domain/users/user.entity';
import { BasicRepository } from '../../config/basic-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository implements BasicRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  find(
    options: FindManyOptions<UserEntity>,
  ): Promise<UserEntity[] | undefined> {
    return this.repo.find(options);
  }

  findOne(
    options: FindOneOptions<UserEntity>,
  ): Promise<UserEntity | undefined> {
    return this.repo.findOne(options);
  }

  async save(data: UserEntity): Promise<UserEntity> {
    return this.repo.save(data);
  }

  async softDelete(options: FindOptionsWhere<UserEntity>): Promise<void> {
    await this.repo.softDelete(options);
  }
}
