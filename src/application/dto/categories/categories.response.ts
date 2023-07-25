import { ApiProperty } from '@nestjs/swagger';
import {
  BasicResponse,
  BasicResponseArray,
} from '../../../config/basic.response';
import {
  CategoriesEntity,
  ICategory,
} from 'src/domain/categories/categories.entity';

export class Category implements ICategory {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  constructor(category: CategoriesEntity) {
    this.id = category.id;
    this.title = category.title;
  }
}

export class CategoryResponse extends BasicResponse<Category> {
  constructor(category: Category) {
    super(category);
  }

  @ApiProperty({ type: Category })
  item: Category;
}

export class CategoryListResponse extends BasicResponseArray<Category> {
  constructor(categories: Category[], count: number) {
    super(categories, count);
  }

  @ApiProperty({ type: Category, isArray: true })
  items: Category[];
}
