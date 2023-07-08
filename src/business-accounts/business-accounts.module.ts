import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModule } from 'src/users/user.module'
import { BusinessAccountController } from './business-accounts.controller'
import { BusinessAccountService } from './business-accounts.service'
import { BusinessAccount } from './entities/business-account.entity'

@Module({
  imports: [SequelizeModule.forFeature([BusinessAccount]), UserModule],
  controllers: [BusinessAccountController],
  providers: [BusinessAccountService]
})
export class BusinessAccountModule {}
