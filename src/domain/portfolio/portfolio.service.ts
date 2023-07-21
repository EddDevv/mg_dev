import { Injectable, NotFoundException } from '@nestjs/common';
import { PortfolioCreateRequest, PortfolioUpdateRequest } from 'src/application/dto/portfolio/portfolio.request';
import { CustomExceptions } from 'src/config/messages/custom.exceptions';
import { BusinessAccountsRepository } from 'src/infrastructure/repositories/business-accounts.repository';
import { PortfolioRepository } from 'src/infrastructure/repositories/portfolio.repository';
import { PortfolioEntity } from './portfolio.entity';
import { Portfolio, PortfolioListResponse, PortfolioResponse } from 'src/application/dto/portfolio/portfolio.response';

@Injectable()
export class PortfolioService {
  constructor(
    private readonly portfolioRepository: PortfolioRepository,
    private readonly businessAccountsRepository: BusinessAccountsRepository,
  ) {}

  async getPortfolio(id: number): Promise<PortfolioResponse> {
    const portfolio = await this.portfolioRepository.findOne({
      where: { id },
    });
    if (!portfolio) {
      throw new NotFoundException(CustomExceptions.portfolio.NotFound);
    }

    return new PortfolioResponse(new Portfolio(portfolio));
  }

  async getAllPortfolioByBusinessId(
    businessId: number,
  ): Promise<PortfolioListResponse> {
    const [portfolios, count] = await this.portfolioRepository.findAndCount({
      where: {
        businessId,
      },
    });

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
    description,
  }: PortfolioCreateRequest): Promise<PortfolioResponse> {
    const businessAccount = await this.businessAccountsRepository.findOne({
      where: { id: businessId },
    });
    if (!businessAccount) {
      throw new NotFoundException(CustomExceptions.businessAccount.NotFound);
    }

    const portfolio = new PortfolioEntity(description, businessId);
    await this.portfolioRepository.save(portfolio);
    return new PortfolioResponse(new Portfolio(portfolio));
  }

  async update(
    id: number,
    { description }: PortfolioUpdateRequest,
  ): Promise<PortfolioResponse> {
    const portfolio = await this.portfolioRepository.findOne({ where: { id } });
    if (!portfolio) {
      throw new NotFoundException(CustomExceptions.portfolio.NotFound);
    }

    portfolio.description = description;
    await this.portfolioRepository.save(portfolio);

    return new PortfolioResponse(new Portfolio(portfolio));
  }

  async deletePortfolio(id: number): Promise<void> {
    const portfolio = await this.portfolioRepository.findOne({ where: { id } });
    if (!portfolio) {
      throw new NotFoundException(CustomExceptions.portfolio.NotFound);
    }

    await this.portfolioRepository.softDelete(id);
  }
}
