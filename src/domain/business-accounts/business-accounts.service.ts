import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserService } from 'src/domain/users/user.service';
import { BusinessAccount } from './business-account.entity';
import {
  BusinessAccountsCreateRequest,
  BusinessAccountsUpdateRequest,
} from '../../application/dto/business-accounts/business-accounts.request';

@Injectable()
export class BusinessAccountService {
  constructor(
    @InjectModel(BusinessAccount)
    private businessAccountRepository: typeof BusinessAccount,
    private userService: UserService,
  ) {}

  async create(createBusinessAccountDto: BusinessAccountsCreateRequest) {
    const userId = createBusinessAccountDto.userId;
    const isBusiness = await this.businessAccountRepository.findByPk(userId);

    if (!isBusiness) {
      const businessAccount = await this.businessAccountRepository.create(
        createBusinessAccountDto,
      );

      if (businessAccount) {
        const user = await this.userService.updateRole(
          createBusinessAccountDto.userId,
        );
        return user;
      }
    } else {
      throw new BadRequestException('You already have a business account');
    }
  }

  async findAll(): Promise<BusinessAccount[]> {
    const businessAccounts = await this.businessAccountRepository.findAll();
    return businessAccounts;
  }

  async findOne(id: number): Promise<BusinessAccount> {
    const businessAccount = await this.businessAccountRepository.findByPk(id);
    if (!businessAccount) {
      throw new NotFoundException('User not found');
    }
    return businessAccount;
  }

  update(id: number, updateBusinessAccountDto: BusinessAccountsUpdateRequest) {
    return `This action updates a #${id} businessAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessAccount`;
  }
}
