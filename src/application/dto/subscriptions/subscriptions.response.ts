import { ApiProperty } from '@nestjs/swagger';
import { User, UserResponse } from '../users/users.response';
import {
  ISubscriptions,
  SubscriptionsEntity,
} from '../../../domain/subscriptions/subscriptions.entity';
import {
  BasicResponse,
  BasicResponseArray,
} from '../../../config/basic.response';

export class Subscription
  implements
    Omit<ISubscriptions, 'user' | 'userId' | 'subscriber' | 'subscriberId'>
{
  @ApiProperty()
  id: number;

  @ApiProperty({ type: User })
  user: User;

  @ApiProperty({ type: User })
  subscriber: User;

  constructor(subscription: SubscriptionsEntity) {
    this.id = subscription.id;
    this.user = new User(subscription.user);
    this.subscriber = new User(subscription.subscriber);
  }
}

export class SubscriptionResponse extends BasicResponse<Subscription> {
  constructor(subscription: Subscription) {
    super(subscription);
  }

  @ApiProperty({ type: Subscription })
  item: Subscription;
}

export class SubscriptionsGetSubscribersResponse extends BasicResponseArray<User> {
  constructor(subscribers: User[], count: number) {
    super(subscribers, count);
  }

  @ApiProperty({ type: User, isArray: true })
  items: User[];
}

export class SubscriptionsGetResponse extends BasicResponseArray<User> {
  constructor(subscriptions: User[], count: number) {
    super(subscriptions, count);
  }

  @ApiProperty({ type: User, isArray: true })
  items: User[];
}
