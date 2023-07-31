import { UserService } from '../users/user.service';
import { UserEntity } from '../users/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserResponse } from '../../application/dto/users/users.response';
import { BusinessAccountService } from './business-accounts.service';
import { BusinessAccountsRepository } from 'src/infrastructure/repositories/business-accounts.repository';
import {
  BusinessAccountsCreateRequest,
  BusinessAccountsGetRequest,
} from 'src/application/dto/business-accounts/business-accounts.request';
import {
  BusinessAccountResponse,
  BusinessAccountsListResponse,
} from 'src/application/dto/business-accounts/business-accounts.response';
import { BusinessAccountEntity } from './business-account.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('BusinessAccountService (unit)', () => {
  let businessAccountService: BusinessAccountService;

  const mockBusinessAccountEntity: BusinessAccountEntity =
    new BusinessAccountEntity(1, 'Nails-corporation');
  mockBusinessAccountEntity.id = 1;

  const mockBusinessDatabase: BusinessAccountEntity[] = [
    mockBusinessAccountEntity,
  ];

  const mockUserEntity: UserEntity = new UserEntity(
    'TestFirstName',
    'TestLastName',
    'test@test.ru',
    '$2a$10$PwBnARXX49Iqg9HZ.ldwpukZcdJGRRrVEjowgSp.iKUeH.aJh8rb6',
  );
  mockUserEntity.id = 1;

  const mockUserDatabase: UserEntity[] = [mockUserEntity];

  const mockBusinessRepository = {
    save: jest.fn(
      (dto: BusinessAccountsCreateRequest): BusinessAccountEntity => {
        return new BusinessAccountEntity(dto.userId, dto.businessName);
      },
    ),
    findAndCount: jest.fn(async () => {
      const response = [mockBusinessDatabase, mockBusinessDatabase.length];
      return response;
    }),

    findOne: jest.fn(async (data) => {
      const response = mockBusinessDatabase.map((business) => {
        if (data.where.id) {
          if (data.where.id == business.id) {
            return business;
          }
        }
        if (data.where.userId) {
          if (business.userId == data.where.userId) {
            return business;
          }
        }
      });
      return response[0];
    }),
  };

  const mockUserService = {
    updateRole: jest.fn((id: number) => {
      const response = mockUserDatabase.map((user) => {
        if (id == 2) {
          return new UserResponse(new User(user));
        }
      });
      return response[0];
    }),
  };

  beforeEach(async () => {
    const refModule: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessAccountService,
        {
          provide: BusinessAccountsRepository,
          useValue: mockBusinessRepository,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    businessAccountService = refModule.get<BusinessAccountService>(
      BusinessAccountService,
    );
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    const mockValidRequest: BusinessAccountsCreateRequest = {
      userId: 2,
      businessName: 'Nails-corporation_Two',
    };

    const mockInvalidRequest: BusinessAccountsCreateRequest = {
      userId: 1,
      businessName: 'Nails-corporation',
    };

    describe('Correct data', () => {
      it('should be an instanceof UserResponse', async () => {
        const response = await businessAccountService.create(mockValidRequest);
        console.log(response);
        expect(response instanceof UserResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should have an error', async () => {
        await expect(
          businessAccountService.create(mockInvalidRequest),
        ).rejects.toThrow(
          new BadRequestException('You already have a business account'),
        );
      });
    });
  });

  describe('findAll', () => {
    it('should be an instanceof BusinessAccountsListResponse', async () => {
      const response = await businessAccountService.findAll();
      expect(response instanceof BusinessAccountsListResponse).toBe(true);
    });
  });

  describe('findOne', () => {
    const mockValidRequest: BusinessAccountsGetRequest = {
      id: 1,
    };

    const mockInvalidRequest: BusinessAccountsGetRequest = {
      id: 2,
    };

    describe('Correct data', () => {
      it('should be an instanceof BusinessAccountResponse', async () => {
        const response = await businessAccountService.findOne(mockValidRequest);
        expect(response instanceof BusinessAccountResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should have an error', async () => {
        await expect(
          businessAccountService.findOne(mockInvalidRequest),
        ).rejects.toThrow(new NotFoundException('User not found'));
      });
    });
  });
});
