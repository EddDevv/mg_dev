import { ApiProperty } from '@nestjs/swagger';
import { UsersResponse } from '../users/users.response';
import { SubscriptionsEntity } from '../../../domain/subscriptions/subscriptions.entity';

export class SubscriptionsResponse {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: UsersResponse })
  user: UsersResponse;

  @ApiProperty({ type: UsersResponse })
  subscriber: UsersResponse;

  constructor(subscription: SubscriptionsEntity) {
    this.id = subscription.id;
    this.user = new UsersResponse(subscription.user);
    this.subscriber = new UsersResponse(subscription.subscriber);
  }
}

export class SubscriptionsGetSubscribersResponse {
  @ApiProperty({ type: UsersResponse, isArray: true })
  subscribers: UsersResponse[];

  @ApiProperty()
  count: number;

  constructor(subscribers: UsersResponse[], count: number) {
    this.subscribers = subscribers;
    this.count = count;
  }
}

export class SubscriptionsGetResponse {
  @ApiProperty({ type: UsersResponse, isArray: true })
  subscriptions: UsersResponse[];

  @ApiProperty()
  count: number;

  constructor(subscriptions: UsersResponse[], count: number) {
    this.subscriptions = subscriptions;
    this.count = count;
  }
}
