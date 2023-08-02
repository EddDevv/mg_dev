import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { BasicEntity } from '../../config/basic.entity';
import { EventMeetType } from '../../config/enums/events.enum';
import { CategoriesEntity } from '../categories/categories.entity';

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
}
