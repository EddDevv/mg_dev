import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/domain/users/user.service';
import {
  BusinessAccountsCreateRequest,
  BusinessAccountsGetRequest,
  BusinessAccountsListRequest,
  BusinessAccountsUpdateRequest,
} from '../../application/dto/business-accounts/business-accounts.request';
import { BusinessAccountsRepository } from '../../infrastructure/repositories/business-accounts.repository';
import { UserResponse } from '../../application/dto/users/users.response';
import { BusinessAccountEntity } from './business-account.entity';
import {
  BusinessAccountsListResponse,
  BusinessAccounts,
  BusinessAccountResponse,
} from '../../application/dto/business-accounts/business-accounts.response';
import { I18nService } from 'nestjs-i18n';
import { UsersRepository } from 'src/infrastructure/repositories/users.repository';

@Injectable()
export class BusinessAccountService {
  constructor(
    private businessAccountRepository: BusinessAccountsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly userService: UserService,
    private readonly i18n: I18nService,
  ) {}

  async create(
    { userId, businessName }: BusinessAccountsCreateRequest,
    lang: string,
  ): Promise<UserResponse> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(
        this.i18n.t('exceptions.user.NotFound', {
          lang: lang,
        }),
      );
    }

    const isBusiness = await this.businessAccountRepository.findOne({
      where: { userId: userId },
    });

    if (!isBusiness) {
      const businessAccount = await this.businessAccountRepository.save(
        new BusinessAccountEntity(userId, businessName),
      );

      if (businessAccount) {
        return await this.userService.updateRole(user, lang);
      }
    } else {
      throw new BadRequestException(
        this.i18n.t('exceptions.businessAccount.AlreadyHave', {
          lang: lang,
        }),
      );
    }
  }

  async findAll({
    page,
    take,
    orderBy,
  }: BusinessAccountsListRequest): Promise<BusinessAccountsListResponse> {
    const [businessAccounts, count] =
      await this.businessAccountRepository.findAndCount({
        take: take || 10,
        skip: page ? page * 10 : 0,
        order: {
          createdAt: orderBy || 'ASC',
        },
      });

    if (count == 0) {
      return new BusinessAccountsListResponse([], 0);
    }

    const accountsResponse = businessAccounts.map((acc) => {
      return new BusinessAccounts(acc);
    });

    return new BusinessAccountsListResponse(accountsResponse, count);
  }

  async findOne(
    { id }: BusinessAccountsGetRequest,
    lang: string,
  ): Promise<BusinessAccountResponse> {
    const businessAccount = await this.businessAccountRepository.findOne({
      where: { userId: id },
    });
    if (!businessAccount) {
      return new BusinessAccountResponse(null);
    }

    return new BusinessAccountResponse(new BusinessAccounts(businessAccount));
  }

  update(id: number, updateBusinessAccountDto: BusinessAccountsUpdateRequest) {
    return `This action updates a #${id} businessAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessAccount`;
  }
}
