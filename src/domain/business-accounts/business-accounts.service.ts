import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/domain/users/user.service';
import {
  BusinessAccountsCreateRequest,
  BusinessAccountsUpdateRequest,
} from '../../application/dto/business-accounts/business-accounts.request';
import { BusinessAccountsRepository } from '../../infrastructure/repositories/business-accounts.repository';
import { User, UserResponse } from '../../application/dto/users/users.response';
import {
  IBusinessAccount,
  BusinessAccountEntity,
} from './business-account.entity';
import {
  BusinessAccountsListResponse,
  BusinessAccounts,
  BusinessAccountResponse,
} from '../../application/dto/business-accounts/business-accounts.response';
import { CustomExceptions } from '../../config/messages/custom.exceptions';

@Injectable()
export class BusinessAccountService {
  constructor(
    private businessAccountRepository: BusinessAccountsRepository,
    private userService: UserService,
  ) {}

  async create(data: BusinessAccountsCreateRequest): Promise<UserResponse> {
    const isBusiness = await this.businessAccountRepository.findOne({
      where: { userId: data.userId },
    });

    if (!isBusiness) {
      const businessAccount = await this.businessAccountRepository.save(
        new BusinessAccountEntity(data.businessName),
      );

      if (businessAccount) {
        return await this.userService.updateRole(data.userId);
      }
    } else {
      throw new BadRequestException(
        CustomExceptions.businessAccount.AlreadyHave,
      );
    }
  }

  async findAll(): Promise<BusinessAccountsListResponse> {
    const [businessAccounts, count] =
      await this.businessAccountRepository.findAndCount({});

    if (count == 0) {
      return new BusinessAccountsListResponse([], 0);
    }

    const accountsResponse = businessAccounts.map((acc) => {
      return new BusinessAccounts(acc);
    });

    return new BusinessAccountsListResponse(accountsResponse, count);
  }

  async findOne(id: number): Promise<BusinessAccountResponse> {
    const businessAccount = await this.businessAccountRepository.findOne({
      where: { id },
    });
    if (!businessAccount) {
      throw new NotFoundException(CustomExceptions.user.NotFound);
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
