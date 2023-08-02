import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BasicEntity } from '../../config/basic.entity';
import { UserEntity } from '../users/user.entity';
import { EventsEntity } from '../events/events.entity';

export interface IRecord {
  user: UserEntity;
  userId?: number;
  event: EventsEntity;
  eventId?: number;
}

@Entity('records')
export class RecordsEntity extends BasicEntity implements IRecord {
  @ManyToOne(() => UserEntity, (user) => user.records, {
    cascade: ['insert', 'update', 'soft-remove', 'remove'],
  })
  user: UserEntity;

  @Column()
  userId: number;

  @ManyToOne(() => EventsEntity, (event) => event.records, {
    cascade: ['insert', 'update', 'soft-remove', 'remove'],
  })
  event: EventsEntity;

  @Column()
  eventId: number;

  constructor(
    user: UserEntity,
    userId: number,
    event: EventsEntity,
    eventId: number,
  ) {
    super();
    this.user = user;
    this.userId = userId;
    this.event = event;
    this.eventId = eventId;
  }
}
