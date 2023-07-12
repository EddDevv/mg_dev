import { Body, Controller, Headers, Post, UsePipes } from '@nestjs/common';
import { AuthService } from '../../domain/auth/auth.service';
import { PasswordMatchPipe } from '../guards/pass-match.pipe';
import {
  AuthLoginRequest,
  AuthRegisterRequest,
} from '../dto/auth/auth.request';
import {
  AuthLoginResponse,
  AuthRegisterResponse,
} from '../dto/auth/auth.response';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ResponseMessages } from '../../config/messages/response.messages';
import { CustomExceptions } from '../../config/messages/custom.exceptions';

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
  @UsePipes(new PasswordMatchPipe())
  register(@Body() body: AuthRegisterRequest): Promise<AuthRegisterResponse> {
    return this.authService.register(body);
  }

  @ApiOkResponse({
    type: AuthLoginResponse,
    description: ResponseMessages.auth.login,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.user.NotFound })
  @ApiBadRequestResponse({ description: CustomExceptions.auth.InvalidCred })
  @Post('login')
  login(@Body() body: AuthLoginRequest): Promise<AuthLoginResponse> {
    return this.authService.login(body);
  }

  @ApiOkResponse({ description: ResponseMessages.auth.refreshToken })
  @ApiBadRequestResponse({ description: CustomExceptions.auth.InvalidRefresh })
  @Post('refresh')
  refreshToken(
    @Headers('Authorization') authorizationHeader: string,
  ): Promise<string> {
    const token = authorizationHeader.replace('Bearer ', '');

    return this.authService.refreshToken(token);
  }
}
