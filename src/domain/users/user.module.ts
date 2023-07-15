import { Module } from '@nestjs/common';
import { UserController } from '../../application/controllers/user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { AppController } from '../../application/controllers/app.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController, AppController],
  providers: [UserService, UsersRepository, JwtService],
  exports: [UserService, UsersRepository],
})
export class UserModule {}
