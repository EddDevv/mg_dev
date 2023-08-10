import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CategoriesCreateRequest,
  CategoriesGetListRequest,
  CategoriesGetRequest,
  CategoriesUpdateRequest,
} from 'src/application/dto/categories/categories.request';
import {
  Category,
  CategoryListResponse,
  CategoryResponse,
} from 'src/application/dto/categories/categories.response';
import { CategoriesRepository } from 'src/infrastructure/repositories/categories.repository';
import { CategoriesEntity } from './categories.entity';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly i18n: I18nService,
  ) {}

  async getCategory(
    { id }: CategoriesGetRequest,
    lang: string,
  ): Promise<CategoryResponse> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(
        this.i18n.t('exceptions.category.NotFound', {
          lang: lang,
        }),
      );
    }

    return new CategoryResponse(new Category(category));
  }

  async getAllCategories({
    createdAt,
  }: CategoriesGetListRequest): Promise<CategoryListResponse> {
    const [categories, count] = await this.categoriesRepository.findAndCount({
      order: { createdAt: createdAt },
    });

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
    lang: string,
  ): Promise<CategoryResponse> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(
        this.i18n.t('exceptions.category.NotFound', {
          lang: lang,
        }),
      );
    }

    category.title = title;
    await this.categoriesRepository.save(category);

    return new CategoryResponse(new Category(category));
  }

  async delete(id: number, lang: string,): Promise<void> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(
        this.i18n.t('exceptions.category.NotFound', {
          lang: lang,
        }),
      );
    }

    await this.categoriesRepository.softDelete({ id: category.id });
  }
}
