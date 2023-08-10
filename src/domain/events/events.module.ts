import { Module } from '@nestjs/common';
import { EventsController } from '../../application/controllers/events.controller';
import { EventsService } from './events.service';
import { EventsRepository } from '../../infrastructure/repositories/events.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsEntity } from './events.entity';
import { UserModule } from '../users/user.module';
import { RecordsModule } from '../records/records.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventsEntity]),
    UserModule,
    RecordsModule,
  ],
  controllers: [EventsController],
  providers: [EventsService, EventsRepository, JwtService],
  exports: [EventsService, EventsRepository],
})
export class EventsModule {}
