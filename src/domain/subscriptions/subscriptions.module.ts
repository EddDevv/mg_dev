import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsEntity } from './subscriptions.entity';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from '../../application/controllers/subscriptions.controller';
import { SubscriptionsRepository } from '../../infrastructure/repositories/subscriptions.repository';
import { UserModule } from '../users/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionsEntity]), UserModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, SubscriptionsRepository, JwtService],
  exports: [SubscriptionsService, SubscriptionsRepository],
})
export class SubscriptionsModule {}
