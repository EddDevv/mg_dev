import { ApiProperty } from '@nestjs/swagger';
import { EventMeetType } from '../../../config/enums/events.enum';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class EventCreateRequest {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @MaxLength(5000)
  description: string;

  @ApiProperty({ enum: EventMeetType })
  @IsEnum(EventMeetType)
  meetType: EventMeetType;

  @ApiProperty()
  @IsNumber()
  seatsNumber: number;

  @ApiProperty()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  endDate: string;
}

export class EventViewRequest {
  @ApiProperty()
  id: number;
}

export class EventListRequest {
  @ApiProperty()
  page: number;
}

export class EventUpdateRequest {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  endDate: string;
}

export class EventDeleteRequest {
  @ApiProperty()
  id: number;
}
