import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IService } from 'src/domain/services/services.entity';

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
