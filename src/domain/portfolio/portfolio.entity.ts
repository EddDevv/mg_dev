import { Entity, Column, ManyToOne } from 'typeorm';
import { BasicEntity } from '../../config/basic.entity';
import { BusinessAccountEntity } from '../business-accounts/business-account.entity';

export interface IPortfolio {
  description: string;
  businessId: number;
}

@Entity('portfolio')
export class PortfolioEntity extends BasicEntity implements IPortfolio {
  @Column()
  description: string;

  @ManyToOne(() => BusinessAccountEntity, (business) => business.portfolios)
  business: BusinessAccountEntity;

  @Column()
  businessId: number;

  constructor(description: string, businessId: number) {
    super();
    this.description = description;
    this.businessId = businessId;
  }
}
