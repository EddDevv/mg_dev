import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IService } from 'src/domain/services/services.entity';
import { FindOptionsOrderValue } from 'typeorm';

export class ServicesCreateRequest
  implements Omit<IService, 'category' | 'portfolios' | 'business'>
{
  @ApiProperty({ example: '2', description: 'The category id' })
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({ example: '2', description: 'The business id' })
  @IsNotEmpty()
  businessId: number;

  @ApiProperty({
    example: 'Manicure',
    description: 'The service name',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: '2000',
    description: 'Price per service',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'Decorate your nails',
    description: 'The service description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'true',
    description: 'Availability of the opportunity to drive up to the client',
  })
  @IsNotEmpty()
  @IsBoolean()
  departureToClient: boolean;
}

export class ServicesGetRequest {
  @ApiProperty()
  id: number;
}

export class ServicesGetListRequest {
  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  createdAt: FindOptionsOrderValue;
}

export class ServicesUpdateRequest
  implements Omit<IService, 'category' | 'portfolios' | 'business'>
{
  @ApiProperty({ example: '2', description: 'The category id', nullable: true })
  categoryId?: number;

  @ApiProperty({ example: '2', description: 'The business id', nullable: true })
  businessId?: number;

  @ApiProperty({
    example: 'Manicure',
    description: 'The service name',
    nullable: true,
  })
  title?: string;

  @ApiProperty({
    example: 2000,
    description: 'Price per service',
    nullable: true,
  })
  price?: number;

  @ApiProperty({
    example: 'Decorate your nails',
    description: 'The service description',
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    example: true,
    description: 'Availability of the opportunity to drive up to the client',
    nullable: true,
  })
  departureToClient?: boolean;
}
