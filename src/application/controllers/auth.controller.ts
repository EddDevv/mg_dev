import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from '../../domain/auth/auth.service';
import {
  AuthLoginRequest,
  AuthRefreshRequest,
  AuthRegisterRequest,
} from '../dto/auth/auth.request';
import {
  AuthLoginResponse,
  AuthRefreshResponse,
  AuthRegisterResponse,
} from '../dto/auth/auth.response';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeaders,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseMessages } from '../../config/messages/response.messages';
import { CustomExceptions } from '../../config/messages/custom.exceptions';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    type: AuthRegisterResponse,
    description: ResponseMessages.auth.register,
  })
  @ApiBadRequestResponse({
    description: CustomExceptions.auth.AlreadyRegistered,
  })
  @Post('register')
  register(
    @Headers('accept-language') lang: string,
    @Body() body: AuthRegisterRequest,
  ): Promise<AuthRegisterResponse> {
    return this.authService.register(body, lang);
  }

  @ApiOkResponse({
    type: AuthLoginResponse,
    description: ResponseMessages.auth.login,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.user.NotFound })
  @ApiBadRequestResponse({ description: CustomExceptions.auth.InvalidCred })
  @Post('login')
  login(
    @Headers('accept-language') lang: string,
    @Body() body: AuthLoginRequest,
  ): Promise<AuthLoginResponse> {
    return this.authService.login(body, lang);
  }

  @ApiOkResponse({
    type: AuthRefreshResponse,
    description: ResponseMessages.auth.refreshToken,
  })
  @ApiBadRequestResponse({ description: CustomExceptions.auth.InvalidRefresh })
  @Post('refresh')
  refreshToken(
    @Headers('accept-language') lang: string,
    @Body() body: AuthRefreshRequest,
  ): Promise<AuthRefreshResponse> {
    return this.authService.refreshToken(body.token, lang);
  }
}
