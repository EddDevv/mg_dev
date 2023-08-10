import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';
import { FindOptionsOrderValue } from 'typeorm';

export class SubscriptionsSubscribeRequest {
  @ApiProperty({ example: 2, description: 'The user id that subscribes' })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 1, description: 'The user id that is subscribed to' })
  @IsNumber()
  subscriberId: number;
}

export class SubscriptionsUnsubscribeRequest {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsDateString()
  createdAt: string;
}

export class SubscriptionsGetRequest {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  @IsDateString()
  createdAt: string;
}
