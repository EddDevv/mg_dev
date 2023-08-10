import { Module } from '@nestjs/common';
import { RecordsRepository } from 'src/infrastructure/repositories/records.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { RecordsEntity } from './records.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecordsEntity]), UserModule],
  providers: [RecordsRepository, JwtService],
  exports: [RecordsRepository],
})
export class RecordsModule {}
