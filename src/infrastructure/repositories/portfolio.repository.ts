import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PortfolioEntity } from 'src/domain/portfolio/portfolio.entity';

@Injectable()
export class PortfolioRepository {
  constructor(
    @InjectRepository(PortfolioEntity)
    private readonly repo: Repository<PortfolioEntity>,
  ) {}

  find(
    options: FindManyOptions<PortfolioEntity>,
  ): Promise<PortfolioEntity[] | undefined> {
    return this.repo.find(options);
  }

  findOne(
    options: FindOneOptions<PortfolioEntity>,
  ): Promise<PortfolioEntity | undefined> {
    return this.repo.findOne(options);
  }

  findAndCount(
    options: FindManyOptions<PortfolioEntity>,
  ): Promise<[PortfolioEntity[], number]> {
    return this.repo.findAndCount(options);
  }

  async save(data: PortfolioEntity): Promise<PortfolioEntity> {
    return this.repo.save(data);
  }

  async softDelete(id: number): Promise<void> {
    await this.repo.softDelete(id);
  }
}
