import { BasicEntity } from '../../config/basic.entity';
import { Column, Entity } from 'typeorm';

export interface ICategory {
  categoryName: string;
}

@Entity('categories')
export class CategoriesEntity extends BasicEntity implements ICategory {

  @Column()
  categoryName: string;

  constructor(categoryName: string) {
    super();
    this.categoryName = categoryName;
  }
}
