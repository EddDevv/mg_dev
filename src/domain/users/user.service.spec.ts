import { UserService } from '../users/user.service';
import { UserEntity } from '../users/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import {
  UserResponse,
  UsersListResponse,
} from '../../application/dto/users/users.response';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/infrastructure/repositories/users.repository';
import {
  UserGetRequest,
  UserUpdateRequest,
} from 'src/application/dto/users/users.request';
import { GenderEnum } from 'src/config/enums/gender.enum';
import { UserRoleEnum } from 'src/config/enums/user-role.enum';

describe('UserService (unit)', () => {
  let userService: UserService;

  const mockUserEntity: UserEntity = new UserEntity(
    'TestFirstName',
    'TestLastName',
    'test@test.ru',
    '$2a$10$PwBnARXX49Iqg9HZ.ldwpukZcdJGRRrVEjowgSp.iKUeH.aJh8rb6',
  );
  mockUserEntity.id = 1;

  const mockBusinessUserEntity: UserEntity = new UserEntity(
    'TestFirstName',
    'TestLastName',
    'test@test.ru',
    '$2a$10$PwBnARXX49Iqg9HZ.ldwpukZcdJGRRrVEjowgSp.iKUeH.aJh8rb6',
  );
  mockBusinessUserEntity.id = 3;
  mockBusinessUserEntity.role = UserRoleEnum.Business;

  const mockUserDatabase: UserEntity[] = [
    mockUserEntity,
    mockBusinessUserEntity,
  ];

  type WhereClause = {
    where: {
      id?: number;
    };
  };

  const mockUsersRepository = {
    find: jest.fn(async () => mockUserDatabase),
    save: jest.fn((dto: UserEntity): UserEntity => {
      return new UserEntity(dto.firstName, '', dto.email, dto.password);
    }),
    findAndCount: jest.fn(async () => {
      return [mockUserDatabase, mockUserDatabase.length];
    }),

    findOne: jest.fn(async ({ where }: WhereClause) => {
      for (let index = 0; index < mockUserDatabase.length; index++) {
        const user = mockUserDatabase[index];
        if (where.id == user.id) {
          return user;
        }
      }
      return undefined;
    }),

    softDelete: jest.fn(async () => null),
  };

  beforeEach(async () => {
    const refModule: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    userService = refModule.get<UserService>(UserService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('find', () => {
    it('should be an instanceof UsersListResponse', async () => {
      const response = await userService.findAll();
      expect(response instanceof UsersListResponse).toBe(true);
    });
  });

  describe('findOne', () => {
    const mockValidRequest: UserGetRequest = {
      id: 1,
    };

    const mockInvalidRequest: UserGetRequest = {
      id: 2,
    };

    describe('Correct data', () => {
      it('should be an instanceof UserResponse', async () => {
        const response = await userService.findOne(mockValidRequest);
        expect(response instanceof UserResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(userService.findOne(mockInvalidRequest)).rejects.toThrow(
          new NotFoundException('User not found'),
        );
      });
    });
  });
  describe('update', () => {
    const validId = 1;
    const invalidId = 2;

    const mockRequest: UserUpdateRequest = {
      dateOfBirth: new Date(),
      description: 'test text',
      email: 'test text',
      firstName: 'test text',
      gender: GenderEnum.Male,
      lastName: 'test text',
      phoneNumber: 'test text',
    };

    describe('Correct data', () => {
      it('should be an instanceof UserResponse', async () => {
        const response = await userService.update(
          validId,
          mockUserEntity,
          mockRequest,
        );
        expect(response instanceof UserResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(
          userService.update(invalidId, mockUserEntity, mockRequest),
        ).rejects.toThrow(new NotFoundException('User not found'));
      });
    });
  });

  describe('updateRole', () => {
    const validId = 1;
    const invalidId = 3;

    describe('Correct data', () => {
      it('should be an instanceof UserResponse', async () => {
        const response = await userService.updateRole(validId);
        expect(response instanceof UserResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should already have a business account', async () => {
        await expect(userService.updateRole(invalidId)).rejects.toThrow(
          new BadRequestException('You already have a business account'),
        );
      });
    });
  });

  describe('remove', () => {
    const validId = 1;
    const invalidId = 2;

    describe('Correct data', () => {
      it('should remove the user successfully', async () => {
        const response = await userService.remove(validId);
        expect(response).toBeUndefined();
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(userService.remove(invalidId)).rejects.toThrow(
          new NotFoundException('User not found'),
        );
      });
    });
  });
});
