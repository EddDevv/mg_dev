import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  SubscriptionsSubscribeRequest,
  SubscriptionsUnsubscribeRequest,
} from '../../application/dto/subscriptions/subscriptions.request';
import {
  SubscriptionsGetResponse,
  SubscriptionsGetSubscribersResponse,
  SubscriptionsResponse,
} from '../../application/dto/subscriptions/subscriptions.response';
import { SubscriptionsRepository } from '../../infrastructure/repositories/subscriptions.repository';
import { SubscriptionsEntity } from './subscriptions.entity';
import { CustomExceptions } from '../../config/messages/custom.exceptions';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { UsersResponse } from '../../application/dto/users/users.response';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly subscriptionsRepository: SubscriptionsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async subscribe({
    userId,
    subscriberId,
  }: SubscriptionsSubscribeRequest): Promise<SubscriptionsResponse> {
    if (userId === subscriberId) {
      throw new BadRequestException('Cannot subscribe from yourself');
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(CustomExceptions.user.NotFound);
    }

    const subscriber = await this.usersRepository.findOne({
      where: { id: subscriberId },
    });
    if (!subscriber) {
      throw new NotFoundException(CustomExceptions.user.NotFound);
    }

    const existingSubscription = await this.subscriptionsRepository.findOne({
      where: { userId, subscriberId },
    });
    if (existingSubscription) {
      throw new ForbiddenException('You already have a subscription');
    }

    const subscription = new SubscriptionsEntity(
      user,
      user.id,
      subscriber,
      subscriberId,
    );
    await this.subscriptionsRepository.save(subscription);

    return new SubscriptionsResponse(subscription);
  }

  async unsubscribe(
    user: UsersResponse,
    { userId }: SubscriptionsUnsubscribeRequest,
  ): Promise<void> {
    if (user.id === userId) {
      throw new BadRequestException('Cannot unsubscribe from yourself');
    }

    const subscription = await this.subscriptionsRepository.findOne({
      where: {
        subscriberId: user.id,
        userId,
      },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found.');
    }

    await this.subscriptionsRepository.softRemove(subscription);
  }

  async getSubscribers(
    userId: number,
  ): Promise<SubscriptionsGetSubscribersResponse> {
    const [subs, count]: [SubscriptionsEntity[], number] =
      await this.subscriptionsRepository.findAndCount({
        where: {
          userId,
        },
        relations: ['user'],
      });

    console.log(subs, count);

    if (count == 0) {
      return new SubscriptionsGetSubscribersResponse([], 0);
    }

    const subscribers = subs.map((sub) => {
      return new UsersResponse(sub.user);
    });

    return new SubscriptionsGetSubscribersResponse(subscribers, count);
  }

  async getSubscriptions(userId: number): Promise<SubscriptionsGetResponse> {
    const [subs, count] = await this.subscriptionsRepository.findAndCount({
      where: {
        subscriberId: userId,
      },
      relations: ['user'],
    });
    if (count == 0) {
      return new SubscriptionsGetResponse([], 0);
    }

    const subscriptions = subs.map((sub) => {
      return new UsersResponse(sub.user);
    });

    return new SubscriptionsGetResponse(subscriptions, count);
  }
}
