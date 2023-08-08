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
import { CustomExceptions } from 'src/config/messages/custom.exceptions';
import { CategoriesRepository } from 'src/infrastructure/repositories/categories.repository';
import { ServicesRepository } from 'src/infrastructure/repositories/services.repository';
import { ServicesEntity } from './services.entity';

@Injectable()
export class ServicesService {
  constructor(
    private readonly servicesRepository: ServicesRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async getService({ id }: ServicesGetRequest): Promise<ServiceResponse> {
    const service = await this.servicesRepository.findOne({
      where: { id },
    });
    if (!service) {
      throw new NotFoundException(CustomExceptions.service.NotFound);
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

  async create({
    categoryId,
    title,
  }: ServicesCreateRequest): Promise<ServiceResponse> {
    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException(CustomExceptions.category.NotFound);
    }

    const service = new ServicesEntity(category, categoryId, title);
    await this.servicesRepository.save(service);
    return new ServiceResponse(new Service(service));
  }

  async update(
    id: number,
    { categoryId, title }: ServicesUpdateRequest,
  ): Promise<ServiceResponse> {
    const service = await this.servicesRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!service) {
      throw new NotFoundException(CustomExceptions.service.NotFound);
    }

    if (categoryId) {
      const category = await this.categoriesRepository.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        throw new NotFoundException(CustomExceptions.category.NotFound);
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

  async delete(id: number): Promise<void> {
    const service = await this.servicesRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException(CustomExceptions.service.NotFound);
    }

    await this.servicesRepository.softDelete({ id: service.id });
  }
}
