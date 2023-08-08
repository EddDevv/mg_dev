import { Module } from '@nestjs/common';
import { EventsController } from '../../application/controllers/events.controller';
import { EventsService } from './events.service';
import { EventsRepository } from '../../infrastructure/repositories/events.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsEntity } from './events.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventsEntity])],
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
  exports: [EventsService, EventsRepository],
})
export class EventsModule {}
