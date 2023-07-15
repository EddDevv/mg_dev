import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BusinessAccountService } from '../../domain/business-accounts/business-accounts.service';
import {
  BusinessAccountsCreateRequest,
  BusinessAccountsUpdateRequest,
} from '../dto/business-accounts/business-accounts.request';
import { User, UserResponse } from '../dto/users/users.response';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseMessages } from '../../config/messages/response.messages';
import { CustomExceptions } from '../../config/messages/custom.exceptions';
import {
  BusinessAccountResponse,
  BusinessAccountsListResponse,
} from '../dto/business-accounts/business-accounts.response';

@ApiTags('Business Account')
@Controller('business-accounts')
export class BusinessAccountController {
  constructor(
    private readonly businessAccountService: BusinessAccountService,
  ) {}

  @ApiCreatedResponse({
    type: UserResponse,
    description: ResponseMessages.businessAccount.create,
  })
  @ApiBadRequestResponse({
    description: CustomExceptions.businessAccount.AlreadyHave,
  })
  @Post('create')
  create(@Body() body: BusinessAccountsCreateRequest): Promise<UserResponse> {
    return this.businessAccountService.create(body);
  }

  @ApiOkResponse({
    type: BusinessAccountsListResponse,
    description: ResponseMessages.businessAccount.findAll,
  })
  @Get()
  findAll(): Promise<BusinessAccountsListResponse> {
    return this.businessAccountService.findAll();
  }

  @ApiOkResponse({
    type: BusinessAccountResponse,
    description: ResponseMessages.businessAccount.findOne,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.user.NotFound })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<BusinessAccountResponse> {
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
