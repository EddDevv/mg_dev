import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesEntity } from './categories.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from 'src/application/controllers/categories.controller';
import { CategoriesRepository } from 'src/infrastructure/repositories/categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesEntity])],
  providers: [CategoriesService, CategoriesRepository],
  controllers: [CategoriesController],
  exports: [CategoriesService, CategoriesRepository]
})
export class CategoriesModule {}
