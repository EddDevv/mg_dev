import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRoleEnum } from '../../config/enums/user-role.enum';
import { UpdateUserDto } from '../../application/dto/users/users.request';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import {
  UserListResponse,
  UsersResponse,
} from '../../application/dto/users/users.response';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UsersRepository) {}

  async findAll(): Promise<UserListResponse> {
    const users = await this.userRepository.find({});

    return new UserListResponse(users, 0);
  }

  async findOne(id: number): Promise<UsersResponse> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new UsersResponse(user);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UsersResponse> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);

    return new UsersResponse(user);
  }

  async updateRole(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user && user.role !== UserRoleEnum.Business) {
      user.role = UserRoleEnum.Business;
      await this.userRepository.save(user);

      return new UsersResponse(user);
    } else {
      throw new BadRequestException('You already have a business account');
    }
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    await this.userRepository.softRemove(user);
  }
}
