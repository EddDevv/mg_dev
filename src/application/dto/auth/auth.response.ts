import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.response';
import { UserEntity } from '../../../domain/users/user.entity';

export class AuthTokensResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

export class AuthRegisterResponse {
  @ApiProperty()
  user: User;

  @ApiProperty()
  tokens: AuthTokensResponse;

  constructor(user: UserEntity, tokens: AuthTokensResponse) {
    this.user = new User(user);
    this.tokens = tokens;
  }
}

export class AuthLoginResponse extends AuthRegisterResponse {}

export class AuthRefreshResponse {
  @ApiProperty()
  accessToken: string;

  constructor(token: string) {
    this.accessToken = token;
  }
}
