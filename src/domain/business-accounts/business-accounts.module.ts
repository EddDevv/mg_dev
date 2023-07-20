import { Module } from '@nestjs/common';
import { UserModule } from 'src/domain/users/user.module';
import { BusinessAccountController } from '../../application/controllers/business-accounts.controller';
import { BusinessAccountService } from './business-accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessAccountEntity } from './business-account.entity';
import { BusinessAccountsRepository } from '../../infrastructure/repositories/business-accounts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessAccountEntity]), UserModule],
  controllers: [BusinessAccountController],
  providers: [BusinessAccountService, BusinessAccountsRepository],
  exports: [BusinessAccountService, BusinessAccountsRepository],
})
export class BusinessAccountModule {}
