import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/entities/user.entity';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionDto } from './dto/subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    @InjectModel(Subscription)
    private subscriptionRepository: typeof Subscription,
  ) {}

  async subscribe(subscriptionDto: SubscriptionDto): Promise<Subscription> {
    const { subscriberId, subscribesToId } = subscriptionDto;
    if (subscriberId === subscribesToId) {
      throw new BadRequestException('Cannot subscribe from yourself');
    }

    const existingSubscription = await this.subscriptionRepository.findOne({
      where: { subscriberId, subscribesToId },
    });
    if (existingSubscription) {
      throw new BadRequestException('You already have a subscription');
    }

    const subscription = await this.subscriptionRepository.create(
      subscriptionDto,
    );
    return subscription;
  }

  async findSubscribersOf(userId: number): Promise<User[]> {
    const subscriptions = await this.subscriptionRepository.findAll({
      where: {
        subscribesToId: userId,
      },
    });
    if (!subscriptions) {
      throw new NotFoundException('Subscription not found');
    }

    const subscriberIds = subscriptions.map((sub) => sub.subscriberId);

    const users = this.userRepository.findAll({
      attributes: ['id', 'firstName', 'email'],
      where: {
        id: subscriberIds,
      },
    });
    if (!users) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }

  async findSubscriptionsFrom(userId: number): Promise<User[]> {
    const subscriptions = await this.subscriptionRepository.findAll({
      where: {
        subscriberId: userId,
      },
    });
    if (!subscriptions) {
      throw new NotFoundException('Subscription not found');
    }

    const subscribesToIds = subscriptions.map((sub) => sub.subscribesToId);

    const users = this.userRepository.findAll({
      attributes: ['id', 'firstName', 'email'],
      where: {
        id: subscribesToIds,
      },
    });
    if (!users) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }

  async unsubscribe(
    subscriberId: number,
    subscribesToId: number,
  ): Promise<void> {
    if (subscriberId === subscribesToId) {
      throw new BadRequestException('Cannot unsubscribe from yourself');
    }
    await this.subscriptionRepository.destroy({
      where: {
        subscriberId,
        subscribesToId,
      },
    });
  }
}
