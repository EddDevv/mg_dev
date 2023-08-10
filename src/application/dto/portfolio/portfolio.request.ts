import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IPortfolio } from 'src/domain/portfolio/portfolio.entity';

export class PortfolioCreateRequest
  implements Omit<IPortfolio, 'business' | 'category' | 'service'>
{
  @ApiProperty({ example: '2', description: 'The Business id' })
  @IsNotEmpty()
  businessId: number;

  @ApiProperty({ example: '2', description: 'The Category id' })
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({ example: '2', description: 'The Service id' })
  @IsNotEmpty()
  serviceId: number;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.',
    description: 'The portfolio description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class PortfolioUpdateRequest
  implements
    Omit<IPortfolio, 'businessId' | 'business' | 'category' | 'service'>
{
  @ApiProperty({ example: '2', description: 'The Category id', nullable: true })
  categoryId?: number;

  @ApiProperty({ example: '2', description: 'The Service id', nullable: true })
  serviceId?: number;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.',
    description: 'The portfolio description',
    nullable: true,
  })
  description?: string;
}

export class PortfolioGetRequest {
  @ApiProperty({ example: '2', description: 'The Portfolio id' })
  id: number;
}
