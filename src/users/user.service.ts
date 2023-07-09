import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/create-user.dto'
import { UserRoleEnum } from './enums/user-role.enum'

import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(createUserDto);
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
  
    Object.assign(user, updateUserDto);
  
    await user.save();
  
    return user;
  }
  
  async updateRole(userId: number) {
    const user = await this.findOne(userId);
    if (user && user.role !== UserRoleEnum.Business) {
      user.role = UserRoleEnum.Business;
      await user.save();
      return user
    } else {
      throw new BadRequestException('You already have a business account')
    }
  }
  

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.deleteCascade();
  }

}
