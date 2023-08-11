import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Pagination } from '../../../config/pagination';

export class SubscriptionsSubscribeRequest {
  @ApiProperty({ example: 2, description: 'The user id that subscribes' })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 1, description: 'The user id that is subscribed to' })
  @IsNumber()
  subscriberId: number;
}

export class SubscriptionsUnsubscribeRequest extends Pagination {
  @ApiProperty()
  @IsNumber()
  userId: number;
}

export class SubscriptionsGetRequest extends Pagination {
  @ApiProperty()
  userId: number;
}
