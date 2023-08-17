import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PortfolioCreateRequest,
  PortfolioUpdateRequest,
} from 'src/application/dto/portfolio/portfolio.request';
import { BusinessAccountsRepository } from 'src/infrastructure/repositories/business-accounts.repository';
import { PortfolioRepository } from 'src/infrastructure/repositories/portfolio.repository';
import { PortfolioEntity } from './portfolio.entity';
import {
  Portfolio,
  PortfolioListResponse,
  PortfolioResponse,
} from 'src/application/dto/portfolio/portfolio.response';
import { PostsGetRequest } from 'src/application/dto/posts/posts.request';
import { CategoriesRepository } from 'src/infrastructure/repositories/categories.repository';
import { ServicesRepository } from 'src/infrastructure/repositories/services.repository';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class PortfolioService {
  constructor(
    private readonly portfolioRepository: PortfolioRepository,
    private readonly businessAccountsRepository: BusinessAccountsRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly servicesRepository: ServicesRepository,
    private readonly i18n: I18nService,
  ) {}

  async getPortfolio(
    { id }: PostsGetRequest,
    lang: string,
  ): Promise<PortfolioResponse> {
    const portfolio = await this.portfolioRepository.findOne({
      where: { id },
      relations: ['category', 'service'],
    });
    if (!portfolio) {
      throw new NotFoundException(
        this.i18n.t('exceptions.portfolio.NotFound', {
          lang: lang,
        }),
      );
    }

    return new PortfolioResponse(new Portfolio(portfolio));
  }

  async getAllPortfolio(): Promise<PortfolioListResponse> {
    const [portfolios, count] = await this.portfolioRepository.findAndCount({});

    if (count == 0) {
      return new PortfolioListResponse([], 0);
    }

    const resPortfolios = portfolios.map((portfolio) => {
      return new Portfolio(portfolio);
    });

    return new PortfolioListResponse(resPortfolios, count);
  }

  async create(
    { businessId, categoryId, serviceId, description }: PortfolioCreateRequest,
    lang: string,
  ): Promise<PortfolioResponse> {
    const businessAccount = await this.businessAccountsRepository.findOne({
      where: { id: businessId },
    });
    if (!businessAccount) {
      throw new NotFoundException(
        this.i18n.t('exceptions.businessAccount.NotFound', {
          lang: lang,
        }),
      );
    }

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

    const service = await this.servicesRepository.findOne({
      where: { id: serviceId },
    });
    if (!service) {
      throw new NotFoundException(
        this.i18n.t('exceptions.service.NotFound', {
          lang: lang,
        }),
      );
    }

    if (service.categoryId != categoryId) {
      throw new BadRequestException(
        this.i18n.t('exceptions.service.NotConform', {
          lang: lang,
        }),
      );
    }

    const portfolio = new PortfolioEntity(
      businessAccount,
      businessId,
      category,
      categoryId,
      service,
      serviceId,
      description,
    );
    await this.portfolioRepository.save(portfolio);
    return new PortfolioResponse(new Portfolio(portfolio));
  }

  async update(
    id: number,
    { categoryId, serviceId, description }: PortfolioUpdateRequest,
    lang: string,
  ): Promise<PortfolioResponse> {
    const portfolio = await this.portfolioRepository.findOne({
      where: { id },
      relations: ['category', 'service'],
    });
    if (!portfolio) {
      throw new NotFoundException(
        this.i18n.t('exceptions.portfolio.NotFound', {
          lang: lang,
        }),
      );
    }

    if (categoryId && serviceId) {
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

      const service = await this.servicesRepository.findOne({
        where: { id: serviceId },
      });

      if (!service) {
        throw new NotFoundException(
          this.i18n.t('exceptions.service.NotFound', {
            lang: lang,
          }),
        );
      }

      if (category.id != service.categoryId) {
        throw new NotFoundException(
          this.i18n.t('exceptions.service.NotConform', {
            lang: lang,
          }),
        );
      }

      portfolio.category = category;
      portfolio.categoryId = categoryId;

      portfolio.service = service;
      portfolio.serviceId = serviceId;
    }

    if (description) {
      portfolio.description = description;
    }

    await this.portfolioRepository.save(portfolio);

    return new PortfolioResponse(new Portfolio(portfolio));
  }

  async delete(id: number, lang: string): Promise<void> {
    const portfolio = await this.portfolioRepository.findOne({ where: { id } });
    if (!portfolio) {
      throw new NotFoundException(
        this.i18n.t('exceptions.portfolio.NotFound', {
          lang: lang,
        }),
      );
    }

    await this.portfolioRepository.softDelete(id);
  }
}
