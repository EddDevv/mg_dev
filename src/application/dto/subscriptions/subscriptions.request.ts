import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Pagination } from '../../../config/pagination';

export class SubscriptionsSubscribeRequest {
  @ApiProperty({ example: 2, description: 'The user id that subscribes' })
  @IsNumber()
  userId: number;
}

export class SubscriptionsUnsubscribeRequest extends SubscriptionsSubscribeRequest {}

export class SubscriptionsGetRequest extends Pagination {
  @ApiProperty()
  userId: number;
}
