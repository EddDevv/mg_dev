import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserService } from '../../domain/users/user.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserUpdateRequest } from '../dto/users/users.request';
import { UserListResponse, UsersResponse } from '../dto/users/users.response';
import { ResponseMessages } from '../../config/messages/response.messages';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: UserListResponse,
    description: ResponseMessages.user.findAll,
  })
  @Get()
  findAll(): Promise<UserListResponse> {
    return this.userService.findAll();
  }

  @ApiOkResponse({
    type: UsersResponse,
    description: ResponseMessages.user.findOne,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<UsersResponse> {
    return this.userService.findOne(+id);
  }

  @ApiOkResponse({
    type: UsersResponse,
    description: ResponseMessages.user.update,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UserUpdateRequest,
  ): Promise<UsersResponse> {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOkResponse({ description: ResponseMessages.user.remove })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
