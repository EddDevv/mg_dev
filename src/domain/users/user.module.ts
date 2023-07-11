import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/domain/auth/auth.module'
import { User } from './user.entity'
import { UserController } from '../../application/controllers/user.controller'
import { UserService } from './user.service'

@Module({
  imports: [SequelizeModule.forFeature([User]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
	exports: [UserService],
})
export class UserModule {}