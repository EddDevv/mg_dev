import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../domain/users/user.service';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserUpdateRequest } from '../dto/users/users.request';
import {
  User,
  UserResponse,
  UsersListResponse,
} from '../dto/users/users.response';
import { ResponseMessages } from '../../config/messages/response.messages';
import { IRequestUser } from '../../config/user-request.interface';
import { JwtGuard } from '../guards/jwt.guard';
import { CustomExceptions } from '../../config/messages/custom.exceptions';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: UsersListResponse,
    description: ResponseMessages.user.findAll,
  })
  @Get()
  findAll(): Promise<UsersListResponse> {
    return this.userService.findAll();
  }

  @ApiOkResponse({
    type: User,
    description: ResponseMessages.user.findOne,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserResponse> {
    return this.userService.findOne(+id);
  }

  @ApiOkResponse({
    type: UserResponse,
    description: ResponseMessages.user.update,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.user.NotFound })
  @ApiForbiddenResponse({ description: CustomExceptions.user.NotSelfUpdate })
  @ApiUnauthorizedResponse({ description: CustomExceptions.auth.Unauthorized })
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Req() { user }: IRequestUser,
    @Param('id') id: number,
    @Body() body: UserUpdateRequest,
  ): Promise<UserResponse> {
    return this.userService.update(id, user, body);
  }

  @ApiOkResponse({ description: ResponseMessages.user.remove })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
