import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'
import { User } from './entities/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [SequelizeModule.forFeature([User]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
	exports: [UserService],
})
export class UserModule {}