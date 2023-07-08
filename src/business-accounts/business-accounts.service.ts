import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserService } from 'src/users/user.service'
import { CreateBusinessAccountDto } from './dto/create-business-account.dto'
import { UpdateBusinessAccountDto } from './dto/update-business-account.dto'
import { BusinessAccount } from './entities/business-account.entity'

@Injectable()
export class BusinessAccountService {
  constructor(
    @InjectModel(BusinessAccount) 
    private businessAccountRepository: typeof BusinessAccount,
    private userService: UserService
  ) {}

  async create(createBusinessAccountDto: CreateBusinessAccountDto) {
    const userId = createBusinessAccountDto.userId;
    const isBusiness = await this.businessAccountRepository.findByPk(userId);
    
    if (!isBusiness) {
      const businessAccount = await this.businessAccountRepository.create(createBusinessAccountDto);
      
      if (businessAccount) {
        const user = await this.userService.updateRole(createBusinessAccountDto.userId);
        return user;
      }
    } else {
      throw new BadRequestException('You already have a business account');
    }
  
}

  async findAll(): Promise<BusinessAccount []> {
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

  update(id: number, updateBusinessAccountDto: UpdateBusinessAccountDto) {
    return `This action updates a #${id} businessAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessAccount`;
  }
}
