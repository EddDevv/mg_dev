import { BasicEntity } from '../../config/basic.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CategoriesEntity } from '../categories/categories.entity';
import { PortfolioEntity } from '../portfolio/portfolio.entity';

export interface IService {
  title?: string;
  categoryId?: number;
  category: CategoriesEntity;
  portfolios: PortfolioEntity[];
}

@Entity('services')
export class ServicesEntity extends BasicEntity implements IService {
  @Column()
  title: string;

  @ManyToOne(() => CategoriesEntity, (category) => category.services, {
    cascade: ['insert', 'update', 'remove', 'soft-remove'],
  })
  category: CategoriesEntity;

  @Column()
  categoryId: number;

  @OneToMany(() => PortfolioEntity, (portfolio) => portfolio.service)
  portfolios: PortfolioEntity[];

  constructor(category: CategoriesEntity, categoryId: number, title: string) {
    super();
    this.category = category;
    this.categoryId = categoryId;
    this.title = title;
  }
}
