import { ApiProperty } from '@nestjs/swagger';
import {
  BusinessAccount,
  BusinessAccountEntity,
} from '../../../domain/business-accounts/business-account.entity';

export class BusinessAccountsResponse implements BusinessAccount {
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

export class BusinessAccountsListResponse {
  @ApiProperty()
  accounts: BusinessAccountsResponse[];

  constructor(data: BusinessAccountEntity[]) {
    this.accounts = this.makeAccountResponse(data);
  }

  makeAccountResponse(accounts: BusinessAccountEntity[]) {
    return accounts.map((account) => {
      return new BusinessAccountsResponse(account);
    });
  }
}
