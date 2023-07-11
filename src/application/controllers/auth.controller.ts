import { Body, Controller, Headers, Post, UsePipes } from '@nestjs/common';
import { AuthService } from '../../domain/auth/auth.service';
import { PasswordMatchPipe } from '../guards/pass-match.pipe';
import {
  AuthLoginRequest,
  AuthRegisterRequest,
} from '../dto/auth/auth.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new PasswordMatchPipe())
  create(@Body() body: AuthRegisterRequest) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: AuthLoginRequest) {
    return this.authService.login(body);
  }

  @Post('refresh')
  refreshToken(@Headers('Authorization') authorizationHeader: string) {
    const token = authorizationHeader.replace('Bearer ', '');

    return this.authService.refreshToken(token);
  }
}
