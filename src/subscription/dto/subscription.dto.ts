import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SubscriptionDto {

  @ApiProperty({ example: 2, description: 'The user id that subscribes' })
  @IsNotEmpty()
  @IsNumber()
  subscriberId: number;

  @ApiProperty({ example: 1, description: 'The user id that is subscribed to' })
  @IsNotEmpty()
  @IsNumber()
  subscribesToId: number;
}
