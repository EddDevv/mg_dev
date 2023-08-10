import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PortfolioCreateRequest,
  PortfolioUpdateRequest,
} from 'src/application/dto/portfolio/portfolio.request';
import { CustomExceptions } from 'src/config/messages/custom.exceptions';
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

@Injectable()
export class PortfolioService {
  constructor(
    private readonly portfolioRepository: PortfolioRepository,
    private readonly businessAccountsRepository: BusinessAccountsRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly servicesRepository: ServicesRepository,
  ) {}

  async getPortfolio({ id }: PostsGetRequest): Promise<PortfolioResponse> {
    const portfolio = await this.portfolioRepository.findOne({
      where: { id },
      relations: ['category', 'service'],
    });
    if (!portfolio) {
      throw new NotFoundException(CustomExceptions.portfolio.NotFound);
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

  async create({
    businessId,
    categoryId,
    serviceId,
    description,
  }: PortfolioCreateRequest): Promise<PortfolioResponse> {
    const businessAccount = await this.businessAccountsRepository.findOne({
      where: { id: businessId },
    });
    if (!businessAccount) {
      throw new NotFoundException(CustomExceptions.businessAccount.NotFound);
    }

    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException(CustomExceptions.category.NotFound);
    }

    const service = await this.servicesRepository.findOne({
      where: { id: serviceId },
    });
    if (!service) {
      throw new NotFoundException(CustomExceptions.service.NotFound);
    }

    if (service.categoryId != categoryId) {
      throw new BadRequestException(CustomExceptions.service.NotConform);
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
  ): Promise<PortfolioResponse> {
    const portfolio = await this.portfolioRepository.findOne({
      where: { id },
      relations: ['category', 'service'],
    });
    if (!portfolio) {
      throw new NotFoundException(CustomExceptions.portfolio.NotFound);
    }

    if (categoryId && serviceId) {
      const category = await this.categoriesRepository.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        throw new NotFoundException(CustomExceptions.category.NotFound);
      }

      const service = await this.servicesRepository.findOne({
        where: { id: serviceId },
      });

      if (!service) {
        throw new NotFoundException(CustomExceptions.service.NotFound);
      }

      if (category.id != service.categoryId) {
        throw new NotFoundException(CustomExceptions.service.NotConform);
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

  async delete(id: number): Promise<void> {
    const portfolio = await this.portfolioRepository.findOne({ where: { id } });
    if (!portfolio) {
      throw new NotFoundException(CustomExceptions.portfolio.NotFound);
    }

    await this.portfolioRepository.softDelete(id);
  }
}
