import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {
  AuthLoginRequest,
  AuthRegisterRequest,
} from '../../application/dto/auth/auth.request';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { User, UserEntity } from '../users/user.entity';
import {
  AuthLoginResponse,
  AuthRegisterResponse,
  AuthTokensResponse,
} from '../../application/dto/auth/auth.response';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersRepository) {}

  async register({
    firstName,
    lastName,
    email,
    password,
    repeatPassword,
  }: AuthRegisterRequest): Promise<AuthRegisterResponse> {
    const existingUser = await this.userService.findOne({ where: { email } });

    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    if (this.checkPasswordRepeat(password, repeatPassword)) {
      throw new BadRequestException('Not the same passwords');
    }

    const hashedPassword = await this.hashPassword(password);
    const user = new UserEntity(firstName, lastName, email, hashedPassword);
    const tokens = this.generateTokens(user);

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
      throw new NotFoundException('User is not found');
    }

    if (!(await this.comparePassword(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokens = this.generateTokens(user);

    return new AuthLoginResponse(user, tokens);
  }

  async refreshToken(refreshToken: string): Promise<string> {
    try {
      const decodedToken = jwt.verify(
        refreshToken,
        process.env.PRIVATE_REFRESH_KEY,
      ) as { id: number; email: string };

      const user = await this.userService.findOne({
        where: { id: decodedToken.id },
      });
      if (!user) {
        throw new BadRequestException('Invalid refresh token');
      }

      return this.generateAccessToken(user);
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }

  private generateTokens(user: UserEntity): AuthTokensResponse {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  //Generate access token
  private generateAccessToken(user: User): string {
    const payload = { id: user.id, email: user.email };
    return jwt.sign(payload, process.env.PRIVATE_ACCESS_KEY, {
      expiresIn: '15m',
    });
  }

  private generateRefreshToken(user: User): string {
    const payload = { id: user.id, email: user.email };
    return jwt.sign(payload, process.env.PRIVATE_REFRESH_KEY, {
      expiresIn: '7d',
    });
  }
}
