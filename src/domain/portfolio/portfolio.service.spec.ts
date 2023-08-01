import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PortfolioRepository } from 'src/infrastructure/repositories/portfolio.repository';
import { PortfolioService } from './portfolio.service';
import { BusinessAccountsRepository } from 'src/infrastructure/repositories/business-accounts.repository';
import { CategoriesRepository } from 'src/infrastructure/repositories/categories.repository';
import { ServicesRepository } from 'src/infrastructure/repositories/services.repository';
import { CategoriesEntity } from '../categories/categories.entity';
import { ServicesEntity } from '../services/services.entity';
import { BusinessAccountEntity } from '../business-accounts/business-account.entity';
import { PortfolioEntity } from './portfolio.entity';
import {
  PortfolioCreateRequest,
  PortfolioGetListRequest,
  PortfolioGetRequest,
  PortfolioUpdateRequest,
} from 'src/application/dto/portfolio/portfolio.request';
import {
  PortfolioListResponse,
  PortfolioResponse,
} from 'src/application/dto/portfolio/portfolio.response';

describe('CommentsService (unit)', () => {
  let portfolioService: PortfolioService;

  const mockCategoriesEntity: CategoriesEntity = new CategoriesEntity('Nails');
  mockCategoriesEntity.id = 1;

  const mockServicesEntity: ServicesEntity = new ServicesEntity(
    mockCategoriesEntity,
    1,
    'Build-up',
  );
  mockServicesEntity.id = 1;

  const mockTwoServicesEntity: ServicesEntity = new ServicesEntity(
    mockCategoriesEntity,
    2,
    'Build-up',
  );
  mockTwoServicesEntity.id = 2;

  const mockBusinessAccountEntity: BusinessAccountEntity =
    new BusinessAccountEntity(1, 'test name');
  mockBusinessAccountEntity.id = 1;

  const mockPortfolioEntity: PortfolioEntity = new PortfolioEntity(
    mockBusinessAccountEntity,
    mockBusinessAccountEntity.id,
    mockCategoriesEntity,
    mockCategoriesEntity.id,
    mockServicesEntity,
    mockServicesEntity.id,
    'test next',
  );
  mockPortfolioEntity.id = 1;

  const mockPortfolioDatabase: PortfolioEntity[] = [mockPortfolioEntity];

  const mockBusinessDatabase: BusinessAccountEntity[] = [
    mockBusinessAccountEntity,
  ];

  const mockServiceDatabase: ServicesEntity[] = [
    mockServicesEntity,
    mockTwoServicesEntity,
  ];

  const mockCategoryDatabase: CategoriesEntity[] = [mockCategoriesEntity];

  const mockPortfolioRepository = {
    save: jest.fn((dto: PortfolioEntity): PortfolioEntity => {
      const response = new PortfolioEntity(
        dto.business,
        dto.businessId,
        dto.category,
        dto.categoryId,
        dto.service,
        dto.serviceId,
        dto.description,
      );
      return response;
    }),

    findAndCount: jest.fn(async () => {
      const response = [mockPortfolioDatabase, mockPortfolioDatabase.length];
      return response;
    }),
    findOne: jest.fn(async (data) => {
      let foundPortfolio = undefined;
      mockPortfolioDatabase.map((portfolio) => {
        if (data.where.id == portfolio.id) {
          foundPortfolio = portfolio;
        }
      });
      return foundPortfolio;
    }),
    softDelete: jest.fn(async () => null),
  };

  const mockBusinessAccountsRepository = {
    findOne: jest.fn(async (data) => {
      let foundBusiness = undefined;
      mockBusinessDatabase.map((business) => {
        if (data.where.id == business.id) {
          foundBusiness = business;
        }
      });
      return foundBusiness;
    }),
  };

  const mockCategoriesRepository = {
    findOne: jest.fn(async (data) => {
      let foundCategory = undefined;
      mockCategoryDatabase.map((category) => {
        if (data.where.id == category.id) {
          foundCategory = category;
        }
      });
      return foundCategory;
    }),
  };

  const mockServicesRepository = {
    findOne: jest.fn(async (data) => {
      let foundService = undefined;
      mockServiceDatabase.map((service) => {
        if (data.where.id == service.id) {
          foundService = service;
        }
      });
      return foundService;
    }),
  };

  beforeEach(async () => {
    const refModule: TestingModule = await Test.createTestingModule({
      providers: [
        PortfolioService,
        {
          provide: PortfolioRepository,
          useValue: mockPortfolioRepository,
        },
        {
          provide: BusinessAccountsRepository,
          useValue: mockBusinessAccountsRepository,
        },
        {
          provide: CategoriesRepository,
          useValue: mockCategoriesRepository,
        },
        {
          provide: ServicesRepository,
          useValue: mockServicesRepository,
        },
      ],
    }).compile();

    portfolioService = refModule.get<PortfolioService>(PortfolioService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    const mockdValidRequest: PortfolioCreateRequest = {
      businessId: 1,
      categoryId: 1,
      serviceId: 1,
      description: 'test text',
    };

    const mockdInvalidBusinessIdRequest: PortfolioCreateRequest = {
      businessId: undefined,
      categoryId: 1,
      serviceId: 1,
      description: 'test text',
    };

    const mockdInvalidCategoryIdRequest: PortfolioCreateRequest = {
      businessId: 1,
      categoryId: undefined,
      serviceId: 1,
      description: 'test text',
    };

    const mockdInvalidServiceIdRequest: PortfolioCreateRequest = {
      businessId: 1,
      categoryId: 1,
      serviceId: undefined,
      description: 'test text',
    };

    const mockdNotConformRequest: PortfolioCreateRequest = {
      businessId: 1,
      categoryId: 1,
      serviceId: 2,
      description: 'test text',
    };

    describe('Correct data', () => {
      it('should be an instanceof PortfolioResponse', async () => {
        const response = await portfolioService.create(mockdValidRequest);
        expect(response instanceof PortfolioResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException business', async () => {
        await expect(
          portfolioService.create(mockdInvalidBusinessIdRequest),
        ).rejects.toThrow(new NotFoundException('Business Account not found'));
      });

      it('should throw a NotFoundException category', async () => {
        await expect(
          portfolioService.create(mockdInvalidCategoryIdRequest),
        ).rejects.toThrow(new NotFoundException('Category not found'));
      });

      it('should throw a NotFoundException Service', async () => {
        await expect(
          portfolioService.create(mockdInvalidServiceIdRequest),
        ).rejects.toThrow(new NotFoundException('Service not found'));
      });

      it('should throw a BadRequestException', async () => {
        await expect(
          portfolioService.create(mockdNotConformRequest),
        ).rejects.toThrow(
          new BadRequestException('Service not conform category'),
        );
      });
    });
  });

  describe('getAllPortfolio', () => {
    const mockRequest: PortfolioGetListRequest = {
      businessId: 1,
    };

    it('should be an instanceof PortfolioListResponse', async () => {
      const response = await portfolioService.getAllPortfolio(mockRequest);
      expect(response instanceof PortfolioListResponse).toBe(true);
    });
  });

  describe('findOne', () => {
    const mockValidRequest: PortfolioGetRequest = {
      id: 1,
    };

    const mockInvalidRequest: PortfolioGetRequest = {
      id: 2,
    };

    describe('Correct data', () => {
      it('should be an instanceof CommentResponse', async () => {
        const response = await portfolioService.getPortfolio(mockValidRequest);
        expect(response instanceof PortfolioResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(
          portfolioService.getPortfolio(mockInvalidRequest),
        ).rejects.toThrow(new NotFoundException('Portfolio not found'));
      });
    });
  });

  describe('update', () => {
    const validId = 1;
    const invalidId = 2;

    const mockdValidRequest: PortfolioUpdateRequest = {
      categoryId: 1,
      serviceId: 1,
      description: 'test text',
    };

    const mockdInvalidCategoryIdRequest: PortfolioUpdateRequest = {
      categoryId: 2,
      serviceId: 1,
      description: 'test text',
    };

    const mockdInvalidServiceIdRequest: PortfolioUpdateRequest = {
      categoryId: 1,
      serviceId: 3,
      description: 'test text',
    };

    const mockdNotConformRequest: PortfolioUpdateRequest = {
      categoryId: 1,
      serviceId: 2,
      description: 'test text',
    };

    describe('Correct data', () => {
      it('should be an instanceof PortfolioResponse', async () => {
        const response = await portfolioService.update(
          validId,
          mockdValidRequest,
        );
        expect(response instanceof PortfolioResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException portfolio', async () => {
        await expect(
          portfolioService.update(invalidId, mockdValidRequest),
        ).rejects.toThrow(new NotFoundException('Portfolio not found'));
      });

      it('should throw a NotFoundException category', async () => {
        await expect(
          portfolioService.update(validId, mockdInvalidCategoryIdRequest),
        ).rejects.toThrow(new NotFoundException('Category not found'));
      });

      it('should throw a NotFoundException Service', async () => {
        await expect(
          portfolioService.update(validId, mockdInvalidServiceIdRequest),
        ).rejects.toThrow(new NotFoundException('Service not found'));
      });

      it('should throw a BadRequestException', async () => {
        await expect(
          portfolioService.update(validId, mockdNotConformRequest),
        ).rejects.toThrow(
          new BadRequestException('Service not conform category'),
        );
      });
    });
  });

  describe('delete', () => {
    const validId = 1;
    const invalidId = 2;

    describe('Correct data', () => {
      it('should delete the portfolio successfully', async () => {
        const response = await portfolioService.delete(validId);
        expect(response).toBeUndefined();
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(portfolioService.delete(invalidId)).rejects.toThrow(
          new NotFoundException('Portfolio not found'),
        );
      });
    });
  });
});
