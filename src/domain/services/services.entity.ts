import { BasicEntity } from '../../config/basic.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CategoriesEntity } from '../categories/categories.entity';
import { PortfolioEntity } from '../portfolio/portfolio.entity';
import { BusinessAccountEntity } from '../business-accounts/business-account.entity';

export interface IService {
  title?: string;
  description?: string;
  price?: number;
  departureToClient?: boolean;
  category: CategoriesEntity;
  categoryId?: number;
  business: BusinessAccountEntity;
  businessId?: number;
  portfolios: PortfolioEntity[];
}

@Entity('services')
export class ServicesEntity extends BasicEntity implements IService {
  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column({ default: false })
  departureToClient: boolean;

  @ManyToOne(() => BusinessAccountEntity, (business) => business.services, {
    cascade: ['insert', 'update', 'remove', 'soft-remove'],
  })
  business: BusinessAccountEntity;

  @Column()
  businessId: number;

  @ManyToOne(() => CategoriesEntity, (category) => category.services, {
    cascade: ['insert', 'update', 'remove', 'soft-remove'],
  })
  category: CategoriesEntity;

  @Column()
  categoryId: number;

  @OneToMany(() => PortfolioEntity, (portfolio) => portfolio.service)
  portfolios: PortfolioEntity[];

  constructor(
    category: CategoriesEntity,
    categoryId: number,
    business: BusinessAccountEntity,
    businessId: number,
    title: string,
    price: number,
    description: string,
    departureToClient: boolean,
  ) {
    super();
    this.category = category;
    this.categoryId = categoryId;
    this.business = business;
    this.businessId = businessId;
    this.title = title;
    this.price = price;
    this.description = description;
    this.departureToClient = departureToClient;
  }
}
