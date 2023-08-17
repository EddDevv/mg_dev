import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from '../../application/controllers/services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesEntity } from './services.entity';
import { CategoriesModule } from '../categories/categories.module';
import { ServicesRepository } from 'src/infrastructure/repositories/services.repository';
import { BusinessAccountModule } from '../business-accounts/business-accounts.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServicesEntity]),
    CategoriesModule,
    BusinessAccountModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService, ServicesRepository, JwtService],
  exports: [ServicesService, ServicesRepository],
})
export class ServicesModule {}
