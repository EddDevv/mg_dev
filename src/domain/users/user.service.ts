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
  UserGetListRequest,
  UserGetRequest,
  UserUpdateRequest,
} from '../../application/dto/users/users.request';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly i18n: I18nService,
  ) {}

  async findAll({ createdAt }: UserGetListRequest): Promise<UsersListResponse> {
    const users = await this.userRepository.find({
      order: { createdAt: createdAt },
    });

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
      throw new NotFoundException(
        this.i18n.t('exceptions.user.NotFound', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    if (user.id !== bdUser.id) {
      throw new ForbiddenException(
        this.i18n.t('exceptions.user.NotSelfUpdate', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    Object.assign(bdUser, updateUserDto);
    await this.userRepository.save(bdUser);

    return new UserResponse(new User(bdUser));
  }

  async updateRole(user: UserEntity): Promise<UserResponse> {
    if (user && user.role !== UserRoleEnum.Business) {
      user.role = UserRoleEnum.Business;
      await this.userRepository.save(user);

      return new UserResponse(new User(user));
    } else {
      throw new BadRequestException(
        this.i18n.t('exceptions.businessAccount.AlreadyHave', {
          lang: I18nContext.current().lang,
        }),
      );
    }
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(
        this.i18n.t('exceptions.user.NotFound', {
          lang: I18nContext.current().lang,
        }),
      );
    }
    await this.userRepository.softDelete({ id: user.id });
  }
}
