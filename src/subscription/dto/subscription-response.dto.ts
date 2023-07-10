import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class SubscriptionResponseDto {
  @ApiProperty({ example: '2', description: 'The user id' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Alex', description: 'The user firstName name' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'alex@gmail.com', description: 'The user email' })
  @IsEmail()
  email: string;
}
