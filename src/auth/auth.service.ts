import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { User } from 'src/users/entities/user.entity'
import { AuthUserDto } from './dto/auth-user.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}


  //Registration user
  async create(dto: CreateUserDto) {
    const { firstName, email, password } = dto;
    const existingUser = await this.userModel.findOne({ where: { email } });
    
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      firstName,
      email,
      password: hashedPassword,
    });

    const tokens = this.generateTokens(user);

    return { user, tokens };
  }


  //Login user
  async login(dto: AuthUserDto): Promise<{
    user: User;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  }> 
  {
    const { email, password } = dto;

    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('User is not registered');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokens = this.generateTokens(user)

    return { user, tokens};
  }

  //Generate New Access Token
  async refreshToken(refreshToken: string): Promise<string> {
    try {
      const decodedToken = jwt.verify(
        refreshToken,
        process.env.PRIVATE_REFRESH_KEY,
      ) as { id: number; email: string };

      const user = await this.userModel.findByPk(decodedToken.id);
      if (!user) {
        throw new BadRequestException('Invalid refresh token');
      }

      const accessToken = this.generateAccessToken(user);

      return accessToken;
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }


  //Generate access and refresh tokens
  private generateTokens(user: User): { accessToken: string; refreshToken: string } {
    const payload = { id: user.id, email: user.email };
    const accessToken = jwt.sign(payload, process.env.PRIVATE_ACCESS_KEY, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, process.env.PRIVATE_REFRESH_KEY, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }


  //Generate access token
  private generateAccessToken(user: User): string {
    const payload = { id: user.id, email: user.email };
    const accessToken = jwt.sign(payload, process.env.PRIVATE_ACCESS_KEY, { expiresIn: '15m' });
    return accessToken;
  }
}
