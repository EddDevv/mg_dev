import { Module } from '@nestjs/common';
import { RecordsController } from '../../application/controllers/records.controller';
import { RecordsService } from './records.service';
import { RecordsRepository } from 'src/infrastructure/repositories/records.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { EventsModule } from '../events/events.module';
import { RecordsEntity } from './records.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecordsEntity]),
    UserModule,
    EventsModule,
  ],
  controllers: [RecordsController],
  providers: [RecordsService, RecordsRepository, JwtService],
  exports: [RecordsService, RecordsRepository],
})
export class RecordsModule {}
