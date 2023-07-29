import { Entity, Column, ManyToOne } from 'typeorm';
import { BasicEntity } from '../../config/basic.entity';
import { BusinessAccountEntity } from '../business-accounts/business-account.entity';
import { CategoriesEntity } from '../categories/categories.entity';
import { ServicesEntity } from '../services/services.entity';

export interface IPortfolio {
  description?: string;
  business: BusinessAccountEntity;
  businessId: number;
  category: CategoriesEntity;
  categoryId?: number;
  service: ServicesEntity;
  serviceId?: number;
}

@Entity('portfolio')
export class PortfolioEntity extends BasicEntity implements IPortfolio {
  @Column()
  description: string;

  @ManyToOne(() => BusinessAccountEntity, (business) => business.portfolios, {
    cascade: ['insert', 'update', 'remove', 'soft-remove'],
  })
  business: BusinessAccountEntity;

  @Column()
  businessId: number;

  @ManyToOne(() => CategoriesEntity, (category) => category.portfolios, {
    cascade: ['insert', 'update', 'remove', 'soft-remove'],
  })
  category: CategoriesEntity;

  @Column()
  categoryId: number;

  @ManyToOne(() => ServicesEntity, (service) => service.portfolios, {
    cascade: ['insert', 'update', 'remove', 'soft-remove'],
  })
  service: ServicesEntity;

  @Column()
  serviceId: number;

  constructor(
    business: BusinessAccountEntity,
    businessId: number,
    category: CategoriesEntity,
    categoryId: number,
    service: ServicesEntity,
    serviceId: number,
    description: string,
  ) {
    super();
    this.business = business;
    this.businessId = businessId;
    this.category = category;
    this.categoryId = categoryId;
    this.service = service;
    this.serviceId = serviceId;
    this.description = description;
  }
}
