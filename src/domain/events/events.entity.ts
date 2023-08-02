import { Column, Entity, ManyToMany, JoinTable, OneToMany, JoinColumn } from 'typeorm';
import { BasicEntity } from '../../config/basic.entity';
import { EventMeetType } from '../../config/enums/events.enum';
import { CategoriesEntity } from '../categories/categories.entity';
import { RecordsEntity } from '../records/records.entity';

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

  @Column()
  place: string;

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
}
