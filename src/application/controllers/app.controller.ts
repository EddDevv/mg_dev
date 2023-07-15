import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../guards/jwt.guard';
import { Request } from 'express';
import { IRequestUser } from '../../config/user-request.interface';

@ApiTags('Main')
@Controller()
export class AppController {
  @ApiOkResponse()
  @UseGuards(JwtGuard)
  @Get('/profile')
  getProfile(@Req() { user }: IRequestUser) {
    return user;
  }
}
