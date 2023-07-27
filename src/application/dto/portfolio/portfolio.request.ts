import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IPortfolio } from 'src/domain/portfolio/portfolio.entity';

export class PortfolioCreateRequest implements IPortfolio
{
  @ApiProperty({ example: '2', description: 'The Business id' })
  @IsNotEmpty()
  businessId: number;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.',
    description: 'The portfolio description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class PortfolioUpdateRequest implements Omit<IPortfolio, 'businessId'>
{
  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.',
    description: 'The portfolio description',
  })
  @IsString()
  description: string;
}

export class PortfolioGetRequest
{
  @ApiProperty({ example: '2', description: 'The Portfolio id' })
  id: number;
}

export class PortfolioGetListRequest
{
  @ApiProperty({ example: '2', description: 'The Business id' })
  businessId: number;
}
