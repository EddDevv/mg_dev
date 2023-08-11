import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
  UserGetListRequest,
  UserGetRequest,
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
  findAll(@Query() query: UserGetListRequest): Promise<UsersListResponse> {
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
  @Patch(':id')
  update(
    @Headers('accept-language') lang: string,
    @Req() { user }: IRequestUser,
    @Param('id') id: number,
    @Body() body: UserUpdateRequest,
  ): Promise<UserResponse> {
    return this.userService.update(id, user, body, lang);
  }

  @ApiOkResponse({ description: ResponseMessages.user.remove })
  @ApiNotFoundResponse({ description: CustomExceptions.user.NotFound })
  @Delete(':id')
  remove(@Headers('accept-language') lang: string, @Param('id') id: string) {
    return this.userService.remove(+id, lang);
  }
}
