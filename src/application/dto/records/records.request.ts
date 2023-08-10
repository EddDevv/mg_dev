import { IRecord } from 'src/domain/records/records.entity';
import { ApiProperty } from '@nestjs/swagger';
import { FindOptionsOrderValue } from 'typeorm';
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

export class RecordsGetListRequest {
  @ApiProperty()
  eventId: number;

  @ApiProperty()
  @IsDateString()
  createdAt: string;
}

export class RecordUpdateRequest implements Omit<IRecord, 'user' | 'event'> {
  @ApiProperty()
  userId?: number;

  @ApiProperty()
  eventId?: number;
}
