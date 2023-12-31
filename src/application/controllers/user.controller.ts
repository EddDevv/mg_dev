import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { UserService } from '../../domain/users/user.service';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  UserGetRequest,
  UserListRequest,
  UserUpdateRequest,
} from '../dto/users/users.request';
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
  @Get('/list')
  findAll(@Query() query: UserListRequest): Promise<UsersListResponse> {
    return this.userService.findAll(query);
  }

  @ApiOkResponse({
    type: User,
    description: ResponseMessages.user.findOne,
  })
  @Get()
  findOne(
    @Headers('accept-language') lang: string,
    @Query() query: UserGetRequest,
  ): Promise<UserResponse> {
    return this.userService.findOne(query, lang);
  }

  @ApiOkResponse({
    type: UserResponse,
    description: ResponseMessages.user.update,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.user.NotFound })
  @ApiForbiddenResponse({ description: CustomExceptions.user.NotSelfUpdate })
  @ApiUnauthorizedResponse({ description: CustomExceptions.auth.Unauthorized })
  @UseGuards(JwtGuard)
  @Patch('/update')
  update(
    @Headers('accept-language') lang: string,
    @Req() { user }: IRequestUser,
    @Body() body: UserUpdateRequest,
  ): Promise<UserResponse> {
    return this.userService.update(user, body, lang);
  }
}
