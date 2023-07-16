import { ApiProperty } from '@nestjs/swagger';
import {
  IBusinessAccount,
  BusinessAccountEntity,
} from '../../../domain/business-accounts/business-account.entity';
import {
  BasicResponse,
  BasicResponseArray,
} from '../../../config/basic.response';

export class BusinessAccounts implements IBusinessAccount {
  @ApiProperty()
  id: number;

  @ApiProperty()
  businessName: string;

  @ApiProperty()
  registrationNumber: string;

  @ApiProperty()
  userId: number;

  constructor(data: BusinessAccountEntity) {
    this.id = data.id;
    this.businessName = data.businessName;
    this.registrationNumber = data.registrationNumber;
    this.userId = data.userId;
  }
}

export class BusinessAccountResponse extends BasicResponse<BusinessAccounts> {
  constructor(account: BusinessAccounts) {
    super(account);
  }

  @ApiProperty({ type: BusinessAccounts })
  item: BusinessAccounts;
}

export class BusinessAccountsListResponse extends BasicResponseArray<BusinessAccounts> {
  constructor(accounts: BusinessAccounts[], count: number) {
    super(accounts, count);
  }

  @ApiProperty({ type: BusinessAccounts, isArray: true })
  items: BusinessAccounts[];
}
