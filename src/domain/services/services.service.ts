import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ServicesCreateRequest,
  ServicesGetListRequest,
  ServicesGetRequest,
  ServicesUpdateRequest,
} from 'src/application/dto/services/services.request';
import {
  Service,
  ServiceListResponse,
  ServiceResponse,
} from 'src/application/dto/services/services.response';
import { CategoriesRepository } from 'src/infrastructure/repositories/categories.repository';
import { ServicesRepository } from 'src/infrastructure/repositories/services.repository';
import { ServicesEntity } from './services.entity';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ServicesService {
  constructor(
    private readonly servicesRepository: ServicesRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly i18n: I18nService,
  ) {}

  async getService(
    { id }: ServicesGetRequest,
    lang: string,
  ): Promise<ServiceResponse> {
    const service = await this.servicesRepository.findOne({
      where: { id },
    });
    if (!service) {
      throw new NotFoundException(
        this.i18n.t('exceptions.service.NotFound', {
          lang: lang,
        }),
      );
    }

    return new ServiceResponse(new Service(service));
  }

  async getAllServices({
    categoryId,
    createdAt,
  }: ServicesGetListRequest): Promise<ServiceListResponse> {
    const [services, count] = await this.servicesRepository.findAndCount({
      where: {
        categoryId,
      },
      order: { createdAt: createdAt },
    });

    if (count == 0) {
      return new ServiceListResponse([], 0);
    }

    const resServices = services.map((service) => {
      return new Service(service);
    });

    return new ServiceListResponse(resServices, count);
  }

  async create(
    { categoryId, title }: ServicesCreateRequest,
    lang: string,
  ): Promise<ServiceResponse> {
    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        this.i18n.t('exceptions.category.NotFound', {
          lang: lang,
        }),
      );
    }

    const service = new ServicesEntity(category, categoryId, title);
    await this.servicesRepository.save(service);
    return new ServiceResponse(new Service(service));
  }

  async update(
    id: number,
    { categoryId, title }: ServicesUpdateRequest,
    lang: string,
  ): Promise<ServiceResponse> {
    const service = await this.servicesRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!service) {
      throw new NotFoundException(
        this.i18n.t('exceptions.service.NotFound', {
          lang: lang,
        }),
      );
    }

    if (categoryId) {
      const category = await this.categoriesRepository.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        throw new NotFoundException(
          this.i18n.t('exceptions.category.NotFound', {
            lang: lang,
          }),
        );
      }
      service.category = category;
      service.categoryId = categoryId;
    }

    if (title) {
      service.title = title;
    }

    await this.servicesRepository.save(service);

    return new ServiceResponse(new Service(service));
  }

  async delete(id: number, lang: string): Promise<void> {
    const service = await this.servicesRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException(
        this.i18n.t('exceptions.service.NotFound', {
          lang: lang,
        }),
      );
    }

    await this.servicesRepository.softDelete({ id: service.id });
  }
}
