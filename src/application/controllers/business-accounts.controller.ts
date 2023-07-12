import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BusinessAccountService } from '../../domain/business-accounts/business-accounts.service';
import {
  BusinessAccountsCreateRequest,
  BusinessAccountsUpdateRequest,
} from '../dto/business-accounts/business-accounts.request';
import { UsersResponse } from '../dto/users/users.response';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ResponseMessages } from '../../config/messages/response.messages';
import { CustomExceptions } from '../../config/messages/custom.exceptions';

@Controller('business-accounts')
export class BusinessAccountController {
  constructor(
    private readonly businessAccountService: BusinessAccountService,
  ) {}

  @ApiCreatedResponse({
    type: UsersResponse,
    description: ResponseMessages.businessAccount.create,
  })
  @ApiBadRequestResponse({
    description: CustomExceptions.businessAccount.AlreadyHave,
  })
  @Post('create')
  create(@Body() body: BusinessAccountsCreateRequest): Promise<UsersResponse> {
    return this.businessAccountService.create(body);
  }

  @ApiOkResponse({ description: ResponseMessages.businessAccount.findAll })
  @Get()
  findAll() {
    return this.businessAccountService.findAll();
  }

  @ApiOkResponse({ description: ResponseMessages.businessAccount.findOne })
  @ApiNotFoundResponse({ description: CustomExceptions.user.NotFound })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessAccountService.findOne(+id);
  }

  @ApiOkResponse({ description: ResponseMessages.businessAccount.update })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusinessAccountDto: BusinessAccountsUpdateRequest,
  ) {
    return this.businessAccountService.update(+id, updateBusinessAccountDto);
  }
}
