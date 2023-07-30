import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from '../../application/controllers/services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesEntity } from './services.entity';
import { CategoriesModule } from '../categories/categories.module';
import { ServicesRepository } from 'src/infrastructure/repositories/services.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ServicesEntity]), CategoriesModule],
  controllers: [ServicesController],
  providers: [ServicesService, ServicesRepository],
  exports: [ServicesService, ServicesRepository],
})
export class ServicesModule {}
