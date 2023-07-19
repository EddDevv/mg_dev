import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';

export interface BasicRepository<T> {
  findOne(options: FindOneOptions<T>): Promise<T | undefined>;
  find(options: FindManyOptions<T>): Promise<T[] | undefined>;
  save(data: T): Promise<T>;
  softDelete(options: FindOptionsWhere<T>): Promise<void>;
}
