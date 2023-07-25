import { BasicEntity } from '../../config/basic.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ServicesEntity } from '../services/services.entity';

export interface ICategory {
  title: string;
  services: ServicesEntity[];
}

@Entity('categories')
export class CategoriesEntity extends BasicEntity implements ICategory {

  @Column()
  title: string;

  @OneToMany(() => ServicesEntity, (service) => service.category)
  services: ServicesEntity[];

  constructor(title: string) {
    super();
    this.title = title;
  }
}
