import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CategoriesCreateRequest,
  CategoriesGetRequest,
  CategoriesUpdateRequest,
} from 'src/application/dto/categories/categories.request';
import {
  Category,
  CategoryListResponse,
  CategoryResponse,
} from 'src/application/dto/categories/categories.response';
import { CustomExceptions } from 'src/config/messages/custom.exceptions';
import { CategoriesRepository } from 'src/infrastructure/repositories/categories.repository';
import { CategoriesEntity } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async getCategory({ id }: CategoriesGetRequest): Promise<CategoryResponse> {
    const category = await this.categoriesRepository.findOne({
      where: { id }
    });
    if (!category) {
      throw new NotFoundException(CustomExceptions.category.NotFound);
    }

    return new CategoryResponse(new Category(category));
  }

  async getAllCategories(): Promise<CategoryListResponse> {
    const [categories, count] = await this.categoriesRepository.findAndCount({});

    if (count == 0) {
      return new CategoryListResponse([], 0);
    }

    const resCategories = categories.map((category) => {
      return new Category(category);
    });

    return new CategoryListResponse(resCategories, count);
  }

  async create({ title }: CategoriesCreateRequest): Promise<CategoryResponse> {
    const category = new CategoriesEntity(title);
    await this.categoriesRepository.save(category);
    return new CategoryResponse(new Category(category));
  }

  async update(
    id: number,
    { title }: CategoriesUpdateRequest,
  ): Promise<CategoryResponse> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(CustomExceptions.category.NotFound);
    }

    category.title = title;
    await this.categoriesRepository.save(category);

    return new CategoryResponse(new Category(category));
  }

  async delete(id: number): Promise<void> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(CustomExceptions.category.NotFound);
    }

    await this.categoriesRepository.softDelete({ id: category.id });
  }
}
