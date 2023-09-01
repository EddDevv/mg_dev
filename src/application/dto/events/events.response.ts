import { ApiProperty } from '@nestjs/swagger';
import { EventMeetType } from 'src/config/enums/events.enum';
import { EventsEntity, IEvent } from 'src/domain/events/events.entity';
import {
  BasicResponse,
  BasicResponseArray,
} from '../../../config/basic.response';
import * as moment from 'moment';

export class Event
  implements Omit<IEvent, 'categories' | 'records' | 'startDate' | 'endDate'>
{
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
  startDate: string;

  @ApiProperty()
  endDate: string;

  @ApiProperty({ nullable: true })
  image: string;

  constructor(event: EventsEntity) {
    this.id = event.id;
    this.title = event.title;
    this.description = event.description;
    this.meetType = event.meetType;
    this.seatsNumber = event.seatsNumber;
    this.startDate = moment(event.startDate).format('YYYY-MM-DD');
    this.endDate = moment(event.endDate).format('YYYY-MM-DD');
    this.image = event.image;
  }
}

export class EventResponse extends BasicResponse<Event> {
  constructor(event: Event) {
    super(event);
  }
}

export class EventListResponse extends BasicResponseArray<Event> {
  constructor(events: Event[], count: number) {
    super(events, count);
  }
}
