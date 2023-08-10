import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRoleEnum } from '../../config/enums/user-role.enum';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import {
  User,
  UserResponse,
  UsersListResponse,
} from '../../application/dto/users/users.response';
import { CustomExceptions } from '../../config/messages/custom.exceptions';
import {
  UserGetRequest,
  UserUpdateRequest,
} from '../../application/dto/users/users.request';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UsersRepository) {}

  async findAll(): Promise<UsersListResponse> {
    const users = await this.userRepository.find({});

    const resUser = users.map((user) => {
      return new User(user);
    });

    return new UsersListResponse(resUser, 0);
  }

  async findOne({ id }: UserGetRequest): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new UserResponse(new User(user));
  }

  async update(
    id: number,
    user: User,
    updateUserDto: UserUpdateRequest,
  ): Promise<UserResponse> {
    const bdUser = await this.userRepository.findOne({ where: { id } });
    if (!bdUser) {
      throw new NotFoundException(CustomExceptions.user.NotFound);
    }

    if (user.id !== bdUser.id) {
      throw new ForbiddenException(CustomExceptions.user.NotSelfUpdate);
    }

    Object.assign(bdUser, updateUserDto);
    await this.userRepository.save(bdUser);

    return new UserResponse(new User(bdUser));
  }

  async updateRole(id: number): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user && user.role !== UserRoleEnum.Business) {
      user.role = UserRoleEnum.Business;
      await this.userRepository.save(user);

      return new UserResponse(new User(user));
    } else {
      throw new BadRequestException('You already have a business account');
    }
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(CustomExceptions.user.NotFound);
    }
    await this.userRepository.softDelete({ id: user.id });
  }
}
