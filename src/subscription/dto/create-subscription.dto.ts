import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({ example: 2, description: 'The user id that subscribes' })
  @IsNotEmpty()
  @IsNumber()
  subscriberId: number;

  @ApiProperty({ example: 1, description: 'The user id that is subscribed to' })
  @IsNotEmpty()
  @IsNumber()
  subscribesToId: number;
}
