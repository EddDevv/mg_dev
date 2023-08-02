import { ApiProperty } from '@nestjs/swagger';
import { EventsEntity } from 'src/domain/events/events.entity';

export class Event {
  @ApiProperty()
  id: number;

  constructor(event: EventsEntity) {
    this.id = event.id;
  }
}
