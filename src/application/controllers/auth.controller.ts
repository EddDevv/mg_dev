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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new PasswordMatchPipe())
  register(@Body() body: AuthRegisterRequest): Promise<AuthRegisterResponse> {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: AuthLoginRequest): Promise<AuthLoginResponse> {
    return this.authService.login(body);
  }

  @Post('refresh')
  refreshToken(@Headers('Authorization') authorizationHeader: string) {
    const token = authorizationHeader.replace('Bearer ', '');

    return this.authService.refreshToken(token);
  }
}
