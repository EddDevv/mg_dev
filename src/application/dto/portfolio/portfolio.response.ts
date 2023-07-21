import { ApiProperty } from '@nestjs/swagger';
import {
  BasicResponse,
  BasicResponseArray,
} from '../../../config/basic.response';
import {
  IPortfolio,
  PortfolioEntity,
} from 'src/domain/portfolio/portfolio.entity';

export class Portfolio implements IPortfolio {
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  businessId: number;

  constructor(portfolio: PortfolioEntity) {
    this.id = portfolio.id;
    this.description = portfolio.description;
    this.businessId = portfolio.businessId;
  }
}

export class PortfolioResponse extends BasicResponse<Portfolio> {
  constructor(portfolio: Portfolio) {
    super(portfolio);
  }

  @ApiProperty({ type: Portfolio })
  item: Portfolio;
}

export class PortfolioListResponse extends BasicResponseArray<Portfolio> {
  constructor(portfolios: Portfolio[], count: number) {
    super(portfolios, count);
  }

  @ApiProperty({ type: Portfolio, isArray: true })
  items: Portfolio[];
}
