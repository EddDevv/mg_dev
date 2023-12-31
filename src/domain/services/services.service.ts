import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ServiceListRequest,
  ServicesCreateRequest,
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
import { BusinessAccountsRepository } from 'src/infrastructure/repositories/business-accounts.repository';
import { User } from 'src/application/dto/users/users.response';

@Injectable()
export class ServicesService {
  constructor(
    private readonly servicesRepository: ServicesRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly businessAccountsRepository: BusinessAccountsRepository,
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
    page,
    take,
    orderBy,
  }: ServiceListRequest): Promise<ServiceListResponse> {
    const [services, count] = await this.servicesRepository.findAndCount({
      skip: page ? page * 10 : 0,
      take: take || 10,
      order: {
        createdAt: orderBy || 'ASC',
      },
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
    {
      categoryId,
      businessId,
      title,
      price,
      description,
      departureToClient,
    }: ServicesCreateRequest,
    lang: string,
    user: User,
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

    const business = await this.businessAccountsRepository.findOne({
      where: { id: businessId },
    });
    if (!business) {
      throw new NotFoundException(
        this.i18n.t('exceptions.businessAccount.NotFound', {
          lang: lang,
        }),
      );
    }

    if (business.userId !== user.id) {
      throw new ForbiddenException(
        this.i18n.t('exceptions.service.NotSelfCreate', {
          lang: lang,
        }),
      );
    }

    const service = new ServicesEntity(
      category,
      categoryId,
      business,
      businessId,
      title,
      price,
      description,
      departureToClient,
    );
    await this.servicesRepository.save(service);
    return new ServiceResponse(new Service(service));
  }

  async update(
    id: number,
    {
      categoryId,
      title,
      price,
      description,
      departureToClient,
      image,
    }: ServicesUpdateRequest,
    lang: string,
    user: User,
  ): Promise<ServiceResponse> {
    const service = await this.servicesRepository.findOne({
      where: { id },
      relations: ['category', 'business'],
    });
    if (!service) {
      throw new NotFoundException(
        this.i18n.t('exceptions.service.NotFound', {
          lang: lang,
        }),
      );
    }

    if (service.business.userId !== user.id) {
      throw new ForbiddenException(
        this.i18n.t('exceptions.service.NotSelfUpdate', {
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

    service.title = title ?? service.title;
    service.price = price ?? service.price;
    service.description = description ?? service.description;
    service.departureToClient = departureToClient ?? service.departureToClient;
    service.image = image;

    await this.servicesRepository.save(service);

    return new ServiceResponse(new Service(service));
  }

  async delete(id: number, lang: string, user: User): Promise<void> {
    const service = await this.servicesRepository.findOne({
      where: { id },
      relations: ['business'],
    });
    if (!service) {
      throw new NotFoundException(
        this.i18n.t('exceptions.service.NotFound', {
          lang: lang,
        }),
      );
    }

    if (service.business.userId !== user.id) {
      throw new ForbiddenException(
        this.i18n.t('exceptions.service.NotSelfUpdate', {
          lang: lang,
        }),
      );
    }

    await this.servicesRepository.softDelete({ id: service.id });
  }
}
