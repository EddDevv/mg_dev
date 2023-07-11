import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BusinessAccountService } from '../../domain/business-accounts/business-accounts.service';
import {
  BusinessAccountsCreateRequest,
  BusinessAccountsUpdateRequest,
} from '../dto/business-accounts/business-accounts.request';

@Controller('business-accounts')
export class BusinessAccountController {
  constructor(
    private readonly businessAccountService: BusinessAccountService,
  ) {}

  @Post('create')
  create(@Body() createBusinessAccountDto: BusinessAccountsCreateRequest) {
    return this.businessAccountService.create(createBusinessAccountDto);
  }

  @Get()
  findAll() {
    return this.businessAccountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessAccountService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusinessAccountDto: BusinessAccountsUpdateRequest,
  ) {
    return this.businessAccountService.update(+id, updateBusinessAccountDto);
  }
}
