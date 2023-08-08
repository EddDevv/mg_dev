import { ApiProperty } from '@nestjs/swagger';
import { EventMeetType } from 'src/config/enums/events.enum';
import { EventsEntity, IEvent } from 'src/domain/events/events.entity';

export class Event implements Omit<IEvent, 'categories' | 'records'> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  place: string;

  @ApiProperty({ enum: EventMeetType })
  meetType: EventMeetType;

  @ApiProperty()
  seatsNumber: number;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  constructor(event: EventsEntity) {
    this.id = event.id;
    this.title = event.title;
    this.description = event.description;
    this.place = event.place;
    this.meetType = event.meetType;
    this.seatsNumber = event.seatsNumber;
    this.startDate = event.startDate;
    this.endDate = event.endDate;
  }
}
