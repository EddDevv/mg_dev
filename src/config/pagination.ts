import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export enum PaginationOrderType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export abstract class Pagination {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  take?: number;

  @ApiProperty({ enum: PaginationOrderType })
  @IsEnum(PaginationOrderType)
  @IsOptional()
  orderBy?: PaginationOrderType;
}
