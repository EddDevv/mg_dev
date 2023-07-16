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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseMessages } from '../../config/messages/response.messages';
import { CustomExceptions } from '../../config/messages/custom.exceptions';
import { request } from 'express';

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

  @ApiOkResponse({
    type: AuthRefreshResponse,
    description: ResponseMessages.auth.refreshToken,
  })
  @ApiBadRequestResponse({ description: CustomExceptions.auth.InvalidRefresh })
  @Post('refresh')
  refreshToken(@Body() body: AuthRefreshRequest): Promise<AuthRefreshResponse> {
    return this.authService.refreshToken(body.token);
  }
}
