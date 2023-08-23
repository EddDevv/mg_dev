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
import {
  UserGetRequest,
  UserListRequest,
  UserUpdateRequest,
} from '../../application/dto/users/users.request';
import { I18nService } from 'nestjs-i18n';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly i18n: I18nService,
  ) {}

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

  async findOne({ id }: UserGetRequest, lang: string): Promise<UserResponse> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(
        this.i18n.t('exceptions.user.NotFound', {
          lang: lang,
        }),
      );
    }

    return new UserResponse(new User(user));
  }

  async update(
    user: User,
    updateUserDto: UserUpdateRequest,
    lang: string,
  ): Promise<UserResponse> {
    const bdUser = await this.userRepository.findOne({
      where: { id: user.id },
    });
    if (!bdUser) {
      throw new NotFoundException(
        this.i18n.t('exceptions.user.NotFound', {
          lang: lang,
        }),
      );
    }

    if (user.id !== bdUser.id) {
      throw new ForbiddenException(
        this.i18n.t('exceptions.user.NotSelfUpdate', {
          lang: lang,
        }),
      );
    }

    Object.assign(bdUser, updateUserDto);
    await this.userRepository.save(bdUser);

    return new UserResponse(new User(bdUser));
  }

  async updateRole(user: UserEntity, lang: string): Promise<UserResponse> {
    if (user && user.role !== UserRoleEnum.Business) {
      user.role = UserRoleEnum.Business;
      await this.userRepository.save(user);

      return new UserResponse(new User(user));
    } else {
      throw new BadRequestException(
        this.i18n.t('exceptions.businessAccount.AlreadyHave', {
          lang: lang,
        }),
      );
    }
  }

  async remove(id: number, lang: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(
        this.i18n.t('exceptions.user.NotFound', {
          lang: lang,
        }),
      );
    }
    await this.userRepository.softDelete({ id: user.id });
  }
}
