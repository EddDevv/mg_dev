import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from '../../application/controllers/locations.controller';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService]
})
export class LocationsModule {}
