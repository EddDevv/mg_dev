import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { IService } from 'src/domain/services/services.entity';
import { FindOptionsOrderValue } from 'typeorm';

export class ServicesCreateRequest
  implements Omit<IService, 'category' | 'portfolios'>
{
  @ApiProperty({ example: '2', description: 'The category id' })
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({
    example: 'Manicure',
    description: 'The service name',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class ServicesGetRequest {
  @ApiProperty()
  id: number;
}

export class ServicesGetListRequest {
  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  @IsDateString()
  createdAt: string;
}

export class ServicesUpdateRequest
  implements Omit<IService, 'category' | 'portfolios'>
{
  @ApiProperty({ example: '2', description: 'The category id', nullable: true })
  categoryId?: number;

  @ApiProperty({
    example: 'Manicure',
    description: 'The service name',
    nullable: true,
  })
  title?: string;
}
