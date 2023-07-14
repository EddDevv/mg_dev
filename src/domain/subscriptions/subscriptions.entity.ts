import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BasicEntity } from '../../config/basic.entity';
import { UserEntity } from '../users/user.entity';

export interface Subscriptions {
  user: UserEntity;
  userId: number;
  subscriber: UserEntity;
  subscriberId: number;
}

@Entity('subscriptions')
export class SubscriptionsEntity extends BasicEntity implements Subscriptions {
  @ManyToOne(() => UserEntity, (user) => user.subscribers)
  user: UserEntity;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.subscriptions)
  subscriber: UserEntity;

  @Column()
  subscriberId: number;

  constructor(
    user: UserEntity,
    userId: number,
    subscriber: UserEntity,
    subscriberId: number,
  ) {
    super();
    this.user = user;
    this.userId = userId;
    this.subscriber = subscriber;
    this.subscriberId = subscriberId;
  }
}
