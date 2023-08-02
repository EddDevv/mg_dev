import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/infrastructure/repositories/categories.repository';
import { ServicesEntity } from './services.entity';
import { CategoriesEntity } from '../categories/categories.entity';
import {
  ServicesCreateRequest,
  ServicesGetListRequest,
  ServicesGetRequest,
  ServicesUpdateRequest,
} from 'src/application/dto/services/services.request';
import { ServicesRepository } from 'src/infrastructure/repositories/services.repository';
import { ServicesService } from './services.service';
import {
  ServiceListResponse,
  ServiceResponse,
} from 'src/application/dto/services/services.response';

describe('ServicesService (unit)', () => {
  let servicesService: ServicesService;

  const mockCategoriesEntity: CategoriesEntity = new CategoriesEntity('Nails');
  mockCategoriesEntity.id = 1;

  const mockServicesEntity: ServicesEntity = new ServicesEntity(
    mockCategoriesEntity,
    1,
    'Build-up',
  );
  mockServicesEntity.id = 1;

  const mockCategoriesDatabase: CategoriesEntity[] = [mockCategoriesEntity];

  const mockServiceDatabase: ServicesEntity[] = [mockServicesEntity];

  const mockServicesRepository = {
    save: jest.fn((dto: ServicesEntity): ServicesEntity => {
      return new ServicesEntity(dto.category, dto.categoryId, dto.title);
    }),
    findOne: jest.fn(async (data) => {
      for (let index = 0; index < mockServiceDatabase.length; index++) {
        const service = mockServiceDatabase[index];
        if (data.where.id == service.id) {
          return service;
        }
      }
      return undefined;
    }),
    findAndCount: jest.fn(async () => {
      return [mockServiceDatabase, mockServiceDatabase.length];
    }),
    softDelete: jest.fn(async () => null),
  };

  const mockCategoriesRepository = {
    findOne: jest.fn(async (data) => {
      for (let index = 0; index < mockCategoriesDatabase.length; index++) {
        const category = mockCategoriesDatabase[index];
        if (data.where.id == category.id) {
          return category;
        }
      }
      return undefined;
    }),
  };

  beforeEach(async () => {
    const refModule: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        {
          provide: ServicesRepository,
          useValue: mockServicesRepository,
        },
        {
          provide: CategoriesRepository,
          useValue: mockCategoriesRepository,
        },
      ],
    }).compile();

    servicesService = refModule.get<ServicesService>(ServicesService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    const mockdValidRequest: ServicesCreateRequest = {
      categoryId: 1,
      title: 'test text',
    };
    const mockInvalidRequest: ServicesCreateRequest = {
      categoryId: 2,
      title: 'test text',
    };

    describe('Correct data', () => {
      it('should be an instanceof ServiceResponse', async () => {
        const response = await servicesService.create(mockdValidRequest);
        expect(response instanceof ServiceResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(
          servicesService.create(mockInvalidRequest),
        ).rejects.toThrow(new NotFoundException('Category not found'));
      });
    });
  });

  describe('getAllServices', () => {
    const mockdRequest: ServicesGetListRequest = {
      categoryId: 1,
    };

    it('should be an instanceof ServiceListResponse', async () => {
      const response = await servicesService.getAllServices(mockdRequest);
      expect(response instanceof ServiceListResponse).toBe(true);
    });
  });

  describe('getService', () => {
    const mockValidRequest: ServicesGetRequest = {
      id: 1,
    };

    const mockInvalidRequest: ServicesGetRequest = {
      id: 2,
    };

    describe('Correct data', () => {
      it('should be an instanceof ServiceResponse', async () => {
        const response = await servicesService.getService(mockValidRequest);
        expect(response instanceof ServiceResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(
          servicesService.getService(mockInvalidRequest),
        ).rejects.toThrow(new NotFoundException('Service not found'));
      });
    });
  });

  describe('update', () => {
    const validId = 1;
    const invalidId = 2;

    const mockValidRequest: ServicesUpdateRequest = {
      categoryId: 1,
      title: 'Eyebrows',
    };

    const mockInvalidRequest: ServicesUpdateRequest = {
      categoryId: 2,
      title: 'Eyebrows',
    };

    describe('Correct data', () => {
      it('should be an instanceof ServiceResponse', async () => {
        const response = await servicesService.update(
          validId,
          mockValidRequest,
        );
        expect(response instanceof ServiceResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException service', async () => {
        await expect(
          servicesService.update(invalidId, mockValidRequest),
        ).rejects.toThrow(new NotFoundException('Service not found'));
      });
      it('should throw a NotFoundException category', async () => {
        await expect(
          servicesService.update(validId, mockInvalidRequest),
        ).rejects.toThrow(new NotFoundException('Category not found'));
      });
    });
  });

  describe('delete', () => {
    const validId = 1;
    const invalidId = 2;

    describe('Correct data', () => {
      it('should delete the service successfully', async () => {
        const response = await servicesService.delete(validId);
        expect(response).toBeUndefined();
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(servicesService.delete(invalidId)).rejects.toThrow(
          new NotFoundException('Service not found'),
        );
      });
    });
  });
});
