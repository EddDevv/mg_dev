import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from '../../application/controllers/locations.controller';
import { LocationsRepository } from '../../infrastructure/repositories/locations.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from './location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity])],
  controllers: [LocationsController],
  providers: [LocationsService, LocationsRepository],
})
export class LocationsModule {}
