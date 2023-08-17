import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { User, UserResponse } from '../dto/users/users.response';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    const user = await this.usersRepository.findOne({
      where: { id: payload.id },
    });

    return new User(user);
  }
}
