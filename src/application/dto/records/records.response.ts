import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../users/users.response';
import { BasicResponse, BasicResponseArray } from '../../../config/basic.response';
import { Event } from '../events/events.response';
import { IRecord, RecordsEntity } from 'src/domain/records/records.entity';

export class Record
  implements Omit<IRecord, 'user' | 'event' | 'userId' | 'eventId'>
{
  @ApiProperty()
  id: number;

  @ApiProperty({ type: User })
  user: User;

  @ApiProperty({ type: Event })
  event: Event;

  constructor(record: RecordsEntity) {
    this.id = record.id;
    this.user = new User(record.user);
    this.event = new Event(record.event);
  }
}

export class RecordResponse extends BasicResponse<Record> {
  constructor(record: Record) {
    super(record);
  }
}

export class RecordListEventResponse extends BasicResponseArray<Record> {
  constructor(records: Record[], count: number) {
    super(records, count);
  }

  @ApiProperty({ type: Record, isArray: true })
  items: Record[];
}
