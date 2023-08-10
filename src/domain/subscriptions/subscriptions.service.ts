import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  SubscriptionsGetRequest,
  SubscriptionsSubscribeRequest,
  SubscriptionsUnsubscribeRequest,
} from '../../application/dto/subscriptions/subscriptions.request';
import {
  SubscriptionsGetResponse,
  SubscriptionsGetSubscribersResponse,
  Subscription,
} from '../../application/dto/subscriptions/subscriptions.response';
import { SubscriptionsRepository } from '../../infrastructure/repositories/subscriptions.repository';
import { SubscriptionsEntity } from './subscriptions.entity';
import { CustomExceptions } from '../../config/messages/custom.exceptions';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { User } from '../../application/dto/users/users.response';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly subscriptionsRepository: SubscriptionsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly i18n: I18nService,
  ) {}

  async subscribe(
    { userId, subscriberId }: SubscriptionsSubscribeRequest,
    lang: string,
  ): Promise<Subscription> {
    if (userId === subscriberId) {
      throw new BadRequestException(
        this.i18n.t('exceptions.subscription.SubYourself', {
          lang: lang,
        }),
      );
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
      throw new ForbiddenException(
        this.i18n.t('exceptions.subscription.AlreadyHave', {
          lang: lang,
        }),
      );
    }

    const subscription = new SubscriptionsEntity(
      user,
      user.id,
      subscriber,
      subscriberId,
    );
    await this.subscriptionsRepository.save(subscription);

    return new Subscription(subscription);
  }

  async unsubscribe(
    user: User,
    { userId }: SubscriptionsUnsubscribeRequest,
    lang: string,
  ): Promise<void> {
    if (user.id === userId) {
      throw new BadRequestException(
        this.i18n.t('exceptions.subscription.UnSubYourself', {
          lang: lang,
        }),
      );
    }

    const subscription = await this.subscriptionsRepository.findOne({
      where: {
        userId,
        subscriberId: user.id,
      },
    });

    if (!subscription) {
      throw new NotFoundException(
        this.i18n.t('exceptions.subscription.NotFound', {
          lang: lang,
        }),
      );
    }

    await this.subscriptionsRepository.softDelete({ id: subscription.id });
  }

  async getSubscribers({
    userId,
    createdAt,
  }: SubscriptionsGetRequest): Promise<SubscriptionsGetSubscribersResponse> {
    const [subs, count]: [SubscriptionsEntity[], number] =
      await this.subscriptionsRepository.findAndCount({
        where: {
          userId,
        },
        relations: ['user'],
        order: { createdAt: createdAt },
      });

    if (count == 0) {
      return new SubscriptionsGetSubscribersResponse([], 0);
    }

    const subscribers = subs.map((sub) => {
      return new User(sub.user);
    });

    return new SubscriptionsGetSubscribersResponse(subscribers, count);
  }

  async getSubscriptions({
    userId,
    createdAt,
  }: SubscriptionsGetRequest): Promise<SubscriptionsGetResponse> {
    const [subs, count] = await this.subscriptionsRepository.findAndCount({
      where: {
        subscriberId: userId,
      },
      relations: ['user'],
      order: { createdAt: createdAt },
    });
    if (count == 0) {
      return new SubscriptionsGetResponse([], 0);
    }

    const subscriptions = subs.map((sub) => {
      return new User(sub.user);
    });

    return new SubscriptionsGetResponse(subscriptions, count);
  }
}
