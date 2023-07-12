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
import { UsersResponse } from '../../application/dto/users/users.response';
import {
  BusinessAccount,
  BusinessAccountEntity,
} from './business-account.entity';
import {
  BusinessAccountsListResponse,
  BusinessAccountsResponse,
} from '../../application/dto/business-accounts/business-accounts.response';

@Injectable()
export class BusinessAccountService {
  constructor(
    private businessAccountRepository: BusinessAccountsRepository,
    private userService: UserService,
  ) {}

  async create(data: BusinessAccountsCreateRequest): Promise<UsersResponse> {
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
      throw new BadRequestException('You already have a business account');
    }
  }

  async findAll(): Promise<BusinessAccountsListResponse> {
    const businessAccounts = await this.businessAccountRepository.find({});
    return new BusinessAccountsListResponse(businessAccounts);
  }

  async findOne(id: number): Promise<BusinessAccountsResponse> {
    const businessAccount = await this.businessAccountRepository.findOne({
      where: { id },
    });
    if (!businessAccount) {
      throw new NotFoundException('User not found');
    }

    return new BusinessAccountsResponse(businessAccount);
  }

  update(id: number, updateBusinessAccountDto: BusinessAccountsUpdateRequest) {
    return `This action updates a #${id} businessAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessAccount`;
  }
}
