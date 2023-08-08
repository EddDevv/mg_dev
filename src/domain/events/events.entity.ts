import {
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BasicEntity } from '../../config/basic.entity';
import { EventMeetType } from '../../config/enums/events.enum';
import { CategoriesEntity } from '../categories/categories.entity';
import { RecordsEntity } from '../records/records.entity';
import { EventCreateRequest } from '../../application/dto/events/events.request';

export interface IEvent {
  id: number;
  title: string;
  description: string;
  place: string;
  meetType: EventMeetType;
  seatsNumber: number;
  startDate: Date;
  endDate: Date;
  categories: CategoriesEntity[];
  records: RecordsEntity[];
}

@Entity('events')
export class EventsEntity extends BasicEntity {
  @Column()
  title: string;

  @Column({ length: 5000 })
  description: string;

  @Column({ enum: EventMeetType })
  meetType: EventMeetType;

  @Column()
  seatsNumber: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToMany(() => CategoriesEntity, (category) => category.events)
  @JoinTable()
  categories: CategoriesEntity[];

  @OneToMany(() => RecordsEntity, (record) => record.event)
  @JoinColumn()
  records: RecordsEntity[];

  constructor(
    title: string,
    description: string,
    meetType: EventMeetType,
    seatsNumber: number,
    startDate: Date,
    endDate: Date,
  ) {
    super();
    this.title = title;
    this.description = description;
    this.meetType = meetType;
    this.seatsNumber = seatsNumber;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
