import { ApiProperty } from '@nestjs/swagger';
import {
  BasicResponse,
  BasicResponseArray,
} from '../../../config/basic.response';
import {
  IPortfolio,
  PortfolioEntity,
} from 'src/domain/portfolio/portfolio.entity';
import { Category } from '../categories/categories.response';
import { Service } from '../services/services.response';

export class Portfolio
  implements
    Omit<
      IPortfolio,
      'business' | 'category' | 'service' | 'categoryId' | 'serviceId'
    >
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  businessId: number;

  @ApiProperty({ type: Category })
  category: Category;

  @ApiProperty({ type: Service })
  service: Service;

  constructor(portfolio: PortfolioEntity) {
    this.id = portfolio.id;
    this.description = portfolio.description;
    this.businessId = portfolio.businessId;
    this.category = new Category(portfolio.category);
    this.service = new Service(portfolio.service);
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
