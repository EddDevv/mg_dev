import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/domain/users/user.service';
import {
  BusinessAccountsCreateRequest,
  BusinessAccountsGetListRequest,
  BusinessAccountsGetRequest,
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
import { I18nContext, I18nService } from 'nestjs-i18n';
import { UsersRepository } from 'src/infrastructure/repositories/users.repository';

@Injectable()
export class BusinessAccountService {
  constructor(
    private businessAccountRepository: BusinessAccountsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly userService: UserService,
    private readonly i18n: I18nService,
  ) {}

  async create({
    userId,
    businessName,
  }: BusinessAccountsCreateRequest): Promise<UserResponse> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(
        this.i18n.t('exceptions.user.NotFound', {
          lang: I18nContext.current().lang,
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
        return await this.userService.updateRole(user);
      }
    } else {
      throw new BadRequestException(
        this.i18n.t('exceptions.businessAccount.AlreadyHave', {
          lang: I18nContext.current().lang,
        }),
      );
    }
  }

  async findAll({
    createdAt,
  }: BusinessAccountsGetListRequest): Promise<BusinessAccountsListResponse> {
    const [businessAccounts, count] =
      await this.businessAccountRepository.findAndCount({
        order: { createdAt: createdAt },
      });

    if (count == 0) {
      return new BusinessAccountsListResponse([], 0);
    }

    const accountsResponse = businessAccounts.map((acc) => {
      return new BusinessAccounts(acc);
    });

    return new BusinessAccountsListResponse(accountsResponse, count);
  }

  async findOne({
    id,
  }: BusinessAccountsGetRequest): Promise<BusinessAccountResponse> {
    const businessAccount = await this.businessAccountRepository.findOne({
      where: { id },
    });
    if (!businessAccount) {
      throw new NotFoundException(
        this.i18n.t('exceptions.user.NotFound', {
          lang: I18nContext.current().lang,
        }),
      );
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
