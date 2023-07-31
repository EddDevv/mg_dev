import { AuthService } from './auth.service';
import {
  AuthLoginRequest,
  AuthRegisterRequest,
} from '../../application/dto/auth/auth.request';
import { UserEntity } from '../users/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import {
  AuthRefreshResponse,
  AuthRegisterResponse,
  AuthTokensResponse,
} from '../../application/dto/auth/auth.response';
import { User } from '../../application/dto/users/users.response';
import * as bcrypt from 'bcrypt';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService (unit)', () => {
  let authService: AuthService;

  const mockUserEntity: UserEntity = new UserEntity(
    'TestFirstName',
    'TestLastName',
    'test@test.ru',
    '$2a$10$PwBnARXX49Iqg9HZ.ldwpukZcdJGRRrVEjowgSp.iKUeH.aJh8rb6',
  );
  mockUserEntity.id = 1;

  const mockUserDatabase: UserEntity[] = [mockUserEntity];

  const mockUserRepository = {
    save: jest.fn((dto: AuthRegisterRequest): UserEntity => {
      return new UserEntity(dto.firstName, 's', dto.email, dto.password);
    }),

    findOne: jest.fn(async (data) => {
      const response = mockUserDatabase.map((user) => {
        if (data.where.id) {
          if (data.where.id == user.id) {
            return user;
          }
        }
        if (data.where.email) {
          if (user.email == data.where.email) {
            return user;
          }
        }
      });

      return response[0];
    }),
  };

  const mockJwtService = {
    signAsync: jest.fn((dto) => {
      return 'testSignInTokenString';
    }),
    verifyAsync: jest.fn((dto) => {
      if (dto == 'validRefreshToken') {
        return {
          id: 1,
          email: 'test@test.ru',
        };
      }
      if (dto == 'validRefreshTokenNotExisting') {
        return {
          id: 2,
          email: 'test2@test.ru',
        };
      }
      return undefined;
    }),
  };

  beforeEach(async () => {
    const refModule: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        ConfigService,
        {
          provide: UsersRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    authService = refModule.get<AuthService>(AuthService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('Registration', () => {
    const mockRegisterRequest: AuthRegisterRequest = {
      email: 'test@test.ss',
      firstName: 'Коля',
      password: '123',
      repeatPassword: '123',
    };

    it('should be an instanceof AuthRegisterResponse', async () => {
      const response = await authService.register(mockRegisterRequest);
      expect(response instanceof AuthRegisterResponse).toBe(true);
    });

    it('should have User property instance of User', async () => {
      const response = await authService.register(mockRegisterRequest);
      expect(response.user instanceof User).toBe(true);
    });

    it('should have Tokens property instance of AuthTokensResponse', async () => {
      const response = await authService.register(mockRegisterRequest);
      expect(response.tokens instanceof AuthTokensResponse).toBe(true);
    });
  });

  describe('Login', () => {
    const mockLoginRequest: AuthLoginRequest = {
      email: 'test@test.ru',
      password: 'Password123',
    };

    const mockLoginRequestFake: AuthLoginRequest = {
      email: 'fake@fake.ru',
      password: 'Password123',
    };

    describe('Correct data', () => {
      it('should have props of AuthRegisterResponse', async () => {
        const response = await authService.login(mockLoginRequest);
        expect(response instanceof AuthRegisterResponse).toBe(true);
        expect(response.user instanceof User).toBe(true);
        expect(response.tokens instanceof AuthTokensResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should have an error', async () => {
        await expect(authService.login(mockLoginRequestFake)).rejects.toThrow(
          new NotFoundException('User not found'),
        );
      });
    });
  });

  describe('refreshToken', () => {
    const valid = 'validRefreshToken';
    const notExisting = 'validRefreshTokenNotExisting'
    const invalid = 'invalidRefreshToken';

    describe('Correct data', () => {
      it('should return a new access token when a valid refresh token is provided', async () => {
        const response = await authService.refreshToken(valid);
        expect(response instanceof AuthRefreshResponse).toBe(true);
      });
    });

    describe('Incorrect data data', () => {
      it('should throw a BadRequestException when an token is provided that does not have a user', async () => {
        await expect(authService.refreshToken(notExisting)).rejects.toThrow(
          new BadRequestException('Invalid refresh token'),
        );
      });

      it('should throw a BadRequestException when an invalid refresh token is provided', async () => {
        await expect(authService.refreshToken(invalid)).rejects.toThrow(
          new BadRequestException('Invalid refresh token'),
        );
      });
    });
  });
});
