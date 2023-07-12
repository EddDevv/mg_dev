import { FindManyOptions, FindOneOptions } from 'typeorm';

export interface BasicRepository<T> {
  findOne(options: FindOneOptions<T>): Promise<T | undefined>;
  find(options: FindManyOptions<T>): Promise<T[] | undefined>;
  save(data: T): Promise<T>;
  softRemove(data: T): Promise<void>;
}
