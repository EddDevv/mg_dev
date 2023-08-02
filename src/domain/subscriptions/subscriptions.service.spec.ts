import { UserEntity } from '../users/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../application/dto/users/users.response';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsEntity } from './subscriptions.entity';
import { SubscriptionsRepository } from 'src/infrastructure/repositories/subscriptions.repository';
import {
  SubscriptionsGetRequest,
  SubscriptionsSubscribeRequest,
  SubscriptionsUnsubscribeRequest,
} from 'src/application/dto/subscriptions/subscriptions.request';
import { UsersRepository } from 'src/infrastructure/repositories/users.repository';
import {
  Subscription,
  SubscriptionsGetResponse,
  SubscriptionsGetSubscribersResponse,
} from 'src/application/dto/subscriptions/subscriptions.response';

describe('SubscriptionsService (unit)', () => {
  let subscriptionsService: SubscriptionsService;

  const mockUserEntity: UserEntity = new UserEntity(
    'TestFirstName',
    'TestLastName',
    'test@test.ru',
    '$2a$10$PwBnARXX49Iqg9HZ.ldwpukZcdJGRRrVEjowgSp.iKUeH.aJh8rb6',
  );
  mockUserEntity.id = 1;

  const mockUserSubscriberEntity: UserEntity = new UserEntity(
    'TestFirstName',
    'TestLastName',
    'test2@test.ru',
    '$2a$10$PwBnARXX49Iqg9HZ.ldwpukZcdJGRRrVEjowgSp.iKUeH.aJh8rb6',
  );
  mockUserSubscriberEntity.id = 2;

  const mockSubscriptionsEntity: SubscriptionsEntity = new SubscriptionsEntity(
    mockUserEntity,
    mockUserEntity.id,
    mockUserSubscriberEntity,
    mockUserSubscriberEntity.id,
  );
  mockSubscriptionsEntity.id = 1;

  const mockSubscriptionDatabase: SubscriptionsEntity[] = [
    mockSubscriptionsEntity,
  ];

  const mockUserDatabase: UserEntity[] = [
    mockUserEntity,
    mockUserSubscriberEntity,
  ];

  type WhereClause = {
    where: {
      userId: number;
      subscriberId: number;
    };
  };

  type SubscriptionsSubscribe = {
    user: UserEntity;
    userId: number;
    subscriber: UserEntity;
    subscriberId: number;
  };

  const mockSubscriptionsRepository = {
    save: jest.fn((dto: SubscriptionsSubscribe): SubscriptionsEntity => {
      return new SubscriptionsEntity(
        dto.user,
        dto.userId,
        dto.subscriber,
        dto.subscriberId,
      );
    }),
    findAndCount: jest.fn(async () => {
      return [mockSubscriptionDatabase, mockSubscriptionDatabase.length];
    }),

    findOne: jest.fn(async ({ where }: WhereClause) => {
      for (let index = 0; index < mockSubscriptionDatabase.length; index++) {
        const subscription = mockSubscriptionDatabase[index];
        if (
          where.userId == mockUserEntity.id &&
          where.subscriberId == mockUserSubscriberEntity.id
        ) {
          return subscription;
        }
      }
      return undefined;
    }),

    softDelete: jest.fn(async () => null),
  };

  const mockUsersRepository = {
    findOne: jest.fn(async (data) => {
      for (let index = 0; index < mockUserDatabase.length; index++) {
        const user = mockUserDatabase[index];
        if (data.where.id == user.id) {
          return user;
        }
      }
      return undefined;
    }),
  };

  beforeEach(async () => {
    const refModule: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionsService,
        {
          provide: SubscriptionsRepository,
          useValue: mockSubscriptionsRepository,
        },
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    subscriptionsService =
      refModule.get<SubscriptionsService>(SubscriptionsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('subscribe', () => {
    const mockValidRequest: SubscriptionsSubscribeRequest = {
      userId: 2,
      subscriberId: 1,
    };

    const mockInvalidRequest: SubscriptionsSubscribeRequest = {
      userId: 1,
      subscriberId: 1,
    };

    const mockNotUserRequest: SubscriptionsSubscribeRequest = {
      userId: 3,
      subscriberId: 1,
    };

    const mockNotSubscriberRequest: SubscriptionsSubscribeRequest = {
      userId: 1,
      subscriberId: 3,
    };

    const mockExistingRequest: SubscriptionsSubscribeRequest = {
      userId: 1,
      subscriberId: 2,
    };

    describe('Correct data', () => {
      it('should be an instanceof Subscription', async () => {
        const response = await subscriptionsService.subscribe(mockValidRequest);
        expect(response instanceof Subscription).toBe(true);
      });
      it('should have User property instance of User', async () => {
        const response = await subscriptionsService.subscribe(mockValidRequest);
        expect(response.user instanceof User).toBe(true);
      });
      it('should have Subscriber property instance of User', async () => {
        const response = await subscriptionsService.subscribe(mockValidRequest);
        expect(response.subscriber instanceof User).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should have an subscribe from yourself', async () => {
        await expect(
          subscriptionsService.subscribe(mockInvalidRequest),
        ).rejects.toThrow(
          new BadRequestException('Cannot subscribe from yourself'),
        );
      });
      it('should have an NotFoundException user', async () => {
        await expect(
          subscriptionsService.subscribe(mockNotUserRequest),
        ).rejects.toThrow(new NotFoundException('User not found'));
      });
      it('should have an NotFoundException subscriber', async () => {
        await expect(
          subscriptionsService.subscribe(mockNotSubscriberRequest),
        ).rejects.toThrow(new NotFoundException('User not found'));
      });
      it('should already have a subscription', async () => {
        await expect(
          subscriptionsService.subscribe(mockExistingRequest),
        ).rejects.toThrow(
          new ForbiddenException('You already have a subscription'),
        );
      });
    });
  });

  describe('getSubscribers', () => {
    it('should be an instanceof SubscriptionsGetSubscribersResponse', async () => {
      const mockSubscriptionsGetRequest: SubscriptionsGetRequest = {
        userId: 1,
      };

      const response = await subscriptionsService.getSubscribers(
        mockSubscriptionsGetRequest,
      );
      expect(response instanceof SubscriptionsGetSubscribersResponse).toBe(
        true,
      );
    });
  });

  describe('getSubscriptions', () => {
    it('should be an instanceof SubscriptionsGetResponse', async () => {
      const mockSubscriptionsGetRequest: SubscriptionsGetRequest = {
        userId: 1,
      };

      const response = await subscriptionsService.getSubscriptions(
        mockSubscriptionsGetRequest,
      );
      expect(response instanceof SubscriptionsGetResponse).toBe(true);
    });
  });

  describe('unsubscribe', () => {
    const mockValidRequest: SubscriptionsUnsubscribeRequest = {
      userId: 1,
    };

    const mockNotSubRequest: SubscriptionsUnsubscribeRequest = {
      userId: 2,
    };

    const mockInvalidRequest: SubscriptionsUnsubscribeRequest = {
      userId: 1,
    };

    describe('Correct data', () => {
      it('should unsubscribe successfully', async () => {
        const response = await subscriptionsService.unsubscribe(
          mockUserSubscriberEntity,
          mockValidRequest,
        );
        expect(response).toBeUndefined();
      });
    });
    describe('Incorrect data data', () => {
      it('should have an NotFoundException', async () => {
        await expect(
          subscriptionsService.unsubscribe(mockUserEntity, mockNotSubRequest),
        ).rejects.toThrow(new NotFoundException('Subscription not found'));
      });
      it('should unsubscribe from yourself', async () => {
        await expect(
          subscriptionsService.unsubscribe(mockUserEntity, mockInvalidRequest),
        ).rejects.toThrow(
          new BadRequestException('Cannot unsubscribe from yourself'),
        );
      });
    });
  });
});
