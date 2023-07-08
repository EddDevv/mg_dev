import { Body, Controller, Headers, Post, UsePipes } from '@nestjs/common'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'
import { AuthUserDto } from './dto/auth-user.dto'
import { PasswordMatchPipe } from './pipes/pass-match.pipe'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @UsePipes(new PasswordMatchPipe())
  create(@Body() dto: CreateUserDto) {
    return this.authService.create(dto);
  }

  @Post('login')
  login(@Body() dto: AuthUserDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  refreshToken(@Headers('Authorization') authorizationHeader: string) {
    const token = authorizationHeader.replace('Bearer ', '');
    
    return this.authService.refreshToken(token);
  }

}
