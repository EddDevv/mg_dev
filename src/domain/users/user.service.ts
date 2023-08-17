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
  UserListRequest,
  UserUpdateRequest,
} from '../../application/dto/users/users.request';
import { logger } from 'nestjs-i18n';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UsersRepository) {}

  async findAll({
    page,
    take,
    orderBy,
  }: UserListRequest): Promise<UsersListResponse> {
    const [users, count] = await this.userRepository.findAndCount({
      skip: page ? page * 10 : 0,
      take: take ?? 10,
      order: {
        createdAt: orderBy ?? 'ASC',
      },
    });

    const resUser = users.map((user) => {
      return new User(user);
    });

    if (resUser.length == 0) {
      return new UsersListResponse([], 0);
    }

    return new UsersListResponse(resUser, count);
  }

  async findOne({ id }: UserGetRequest): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new UserResponse(new User(user));
  }

  async update(
    user: User,
    updateUserDto: UserUpdateRequest,
  ): Promise<UserResponse> {
    const bdUser = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!bdUser) {
      throw new NotFoundException(CustomExceptions.user.NotFound);
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
}
