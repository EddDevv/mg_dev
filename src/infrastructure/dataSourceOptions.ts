import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config.js';
import { EntitiesArray } from '../config/entities.array';

export const databaseProviders: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      type: 'postgres',
      host: configService.get<string>('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'),
      username: configService.get<string>('DATABASE_USERNAME'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: configService.get<string>('DATABASE_NAME'),
      logging: false,
      synchronize: false,
      name: 'default',
      entities: EntitiesArray,
      migrationsTableName: 'migrations',
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    };
  },
};

export const dataSourceOptions: DataSourceOptions = {
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: String(process.env.DATABASE_USERNAME),
  password: String(process.env.DATABASE_PASSWORD),
  database: String(process.env.DATABASE_NAME),
  logging: false,
  synchronize: false,
  name: 'default',
  entities: EntitiesArray,
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  // subscribers: ['src/subscriber/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(dataSourceOptions);
