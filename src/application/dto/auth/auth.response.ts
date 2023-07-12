import { ApiProperty } from '@nestjs/swagger';
import { UsersResponse } from '../users/users.response';
import { UserEntity } from '../../../domain/users/user.entity';

export class AuthTokensResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class AuthRegisterResponse {
  @ApiProperty()
  user: UsersResponse;

  @ApiProperty()
  tokens: AuthTokensResponse;

  constructor(user: UserEntity, tokens: AuthTokensResponse) {
    this.user = new UsersResponse(user);
    this.tokens = tokens;
  }
}

export class AuthLoginResponse extends AuthRegisterResponse {}
