import { Module } from '@nestjs/common';
import { PortfolioController } from '../../application/controllers/portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { PortfolioRepository } from 'src/infrastructure/repositories/portfolio.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessAccountModule } from '../business-accounts/business-accounts.module';
import { JwtService } from '@nestjs/jwt';
import { PortfolioEntity } from './portfolio.entity';
import { CategoriesModule } from '../categories/categories.module';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PortfolioEntity]),
    BusinessAccountModule,
    CategoriesModule,
    ServicesModule,
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService, PortfolioRepository, JwtService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
