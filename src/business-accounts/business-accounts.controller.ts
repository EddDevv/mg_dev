import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { BusinessAccountService } from './business-accounts.service'
import { CreateBusinessAccountDto } from './dto/create-business-account.dto'
import { UpdateBusinessAccountDto } from './dto/update-business-account.dto'

@Controller('business-accounts')
export class BusinessAccountController {
  constructor(private readonly businessAccountService: BusinessAccountService) {}

  @Post('create')
  create(@Body() createBusinessAccountDto: CreateBusinessAccountDto) {
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
  update(@Param('id') id: string, @Body() updateBusinessAccountDto: UpdateBusinessAccountDto) {
    return this.businessAccountService.update(+id, updateBusinessAccountDto);
  }

}
