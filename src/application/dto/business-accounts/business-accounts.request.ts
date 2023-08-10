import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { FindOptionsOrderValue } from 'typeorm';

export class BusinessAccountsCreateRequest {
  @ApiProperty({ example: '2', description: 'The user id' })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 'Nails Beauty', description: 'The business name' })
  @IsNotEmpty()
  @IsString()
  businessName: string;
}

export class BusinessAccountsUpdateRequest extends PartialType(
  BusinessAccountsCreateRequest,
) {}

export class BusinessAccountsGetRequest {
  @ApiProperty()
  id: number;
}

export class BusinessAccountsGetListRequest {
  @ApiProperty()
  createdAt: string;
}
