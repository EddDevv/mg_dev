import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export abstract class Pagination {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  page?: number;
}
