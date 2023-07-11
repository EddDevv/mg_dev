import { FindOptions } from 'sequelize';

export interface BasicRepository<T> {
  findOne(options: FindOptions<T>): Promise<T | undefined>;
  find(options: FindOptions<T>): Promise<T[] | undefined>;
  save(data: T): Promise<T>;
  softRemove(data: T): void;
}
