import { IRecord } from 'src/domain/records/records.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class RecordCreateRequest implements Omit<IRecord, 'user' | 'event'> {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  eventId: number;
}

export class RecordsGetRequest {
  @ApiProperty()
  id: number;
}

export class RecordUpdateRequest implements Omit<IRecord, 'user' | 'event'> {
  @ApiProperty()
  userId?: number;

  @ApiProperty()
  eventId?: number;
}
