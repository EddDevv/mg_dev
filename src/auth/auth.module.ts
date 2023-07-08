import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/users/entities/user.entity'
import { UserService } from 'src/users/user.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    SequelizeModule.forFeature([User]), 
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
	exports: [AuthService],
})
export class AuthModule {}
