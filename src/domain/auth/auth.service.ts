import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  AuthLoginRequest,
  AuthRegisterRequest,
} from '../../application/dto/auth/auth.request';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { IUser, UserEntity } from '../users/user.entity';
import {
  AuthLoginResponse,
  AuthRefreshResponse,
  AuthRegisterResponse,
  AuthTokensResponse,
} from '../../application/dto/auth/auth.response';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersRepository,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {}

  async register({
    firstName,
    email,
    password,
    repeatPassword,
  }: AuthRegisterRequest): Promise<AuthRegisterResponse> {
    const existingUser = await this.userService.findOne({ where: { email } });

    if (existingUser) {
      throw new BadRequestException(
        this.i18n.t('exceptions.auth.AlreadyRegistered', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    if (!this.checkPasswordRepeat(password, repeatPassword)) {
      throw new BadRequestException(
        this.i18n.t('exceptions.auth.NotTheSamePasswords', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const hashedPassword = await this.hashPassword(password);

    const user = new UserEntity(firstName, '', email, hashedPassword);
    await this.userService.save(user);
    const tokens = await this.generateTokens(user);

    return new AuthRegisterResponse(user, tokens);
  }

  private checkPasswordRepeat(
    password: string,
    repeatPassword: string,
  ): boolean {
    return password === repeatPassword;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async login({
    email,
    password,
  }: AuthLoginRequest): Promise<AuthLoginResponse> {
    const user = await this.userService.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(
        this.i18n.t('exceptions.user.NotFound', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    if (!(await this.comparePassword(password, user.password))) {
      throw new BadRequestException(
        this.i18n.t('exceptions.auth.InvalidCred', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const tokens = await this.generateTokens(user);

    return new AuthLoginResponse(user, tokens);
  }

  async refreshToken(refreshToken: string): Promise<AuthRefreshResponse> {
    try {
      const decodedToken = (await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      })) as { id: number; email: string };

      const user = await this.userService.findOne({
        where: { id: decodedToken.id },
      });
      if (!user) {
        throw new BadRequestException(
          this.i18n.t('exceptions.auth.InvalidRefresh', {
            lang: I18nContext.current().lang,
          }),
        );
      }

      const accessToken = await this.generateAccessToken(user);

      return new AuthRefreshResponse(accessToken);
    } catch (error) {
      throw new BadRequestException(
        this.i18n.t('exceptions.auth.InvalidRefresh', {
          lang: I18nContext.current().lang,
        }),
      );
    }
  }

  private async generateTokens(user: UserEntity): Promise<AuthTokensResponse> {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return new AuthTokensResponse(accessToken, refreshToken);
  }

  //Generate access token
  private async generateAccessToken(user: IUser): Promise<string> {
    const payload = { id: user.id, email: user.email };
    return await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
  }

  private async generateRefreshToken(user: IUser): Promise<string> {
    const payload = { id: user.id, email: user.email };
    return await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
  }
}
