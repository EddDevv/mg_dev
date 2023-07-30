import { BasicEntity } from '../../config/basic.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ServicesEntity } from '../services/services.entity';
import { PortfolioEntity } from '../portfolio/portfolio.entity';

export interface ICategory {
  title: string;
  services: ServicesEntity[];
  portfolios: PortfolioEntity[];
}

@Entity('categories')
export class CategoriesEntity extends BasicEntity implements ICategory {
  @Column()
  title: string;

  @OneToMany(() => ServicesEntity, (service) => service.category)
  services: ServicesEntity[];

  @OneToMany(() => PortfolioEntity, (portfolio) => portfolio.category)
  portfolios: PortfolioEntity[];

  constructor(title: string) {
    super();
    this.title = title;
  }
}
