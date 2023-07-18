import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../guards/jwt.guard';
import { IRequestUser } from '../../config/user-request.interface';
import { UserResponse } from '../dto/users/users.response';
import { ResponseMessages } from '../../config/messages/response.messages';

@ApiTags('Main')
@Controller()
export class AppController {
  @ApiOkResponse({
    type: UserResponse,
    description: ResponseMessages.user.findOne,
  })
  @UseGuards(JwtGuard)
  @Get('/profile')
  getProfile(@Req() { user }: IRequestUser) {
    return user;
  }
}
