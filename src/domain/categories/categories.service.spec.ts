import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesEntity } from './categories.entity';
import { CategoriesRepository } from 'src/infrastructure/repositories/categories.repository';
import {
  CategoriesCreateRequest,
  CategoriesGetRequest,
  CategoriesUpdateRequest,
} from 'src/application/dto/categories/categories.request';
import {
  CategoryListResponse,
  CategoryResponse,
} from 'src/application/dto/categories/categories.response';

describe('CategoriesService (unit)', () => {
  let categoriesService: CategoriesService;

  const mockCategoriesEntity: CategoriesEntity = new CategoriesEntity('Nails');
  mockCategoriesEntity.id = 1;

  const mockCategoriesDatabase: CategoriesEntity[] = [mockCategoriesEntity];

  const mockCategoriesRepository = {
    save: jest.fn((dto: CategoriesCreateRequest): CategoriesEntity => {
      return new CategoriesEntity(dto.title);
    }),
    findAndCount: jest.fn(async () => {
      return [mockCategoriesDatabase, mockCategoriesDatabase.length];
    }),

    findOne: jest.fn(async (data) => {
      for (let index = 0; index < mockCategoriesDatabase.length; index++) {
        const category = mockCategoriesDatabase[index];
        if (data.where.id == category.id) {
          return category;
        }
      }
      return undefined;
    }),
    softDelete: jest.fn(async () => null),
  };

  beforeEach(async () => {
    const refModule: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: CategoriesRepository,
          useValue: mockCategoriesRepository,
        },
      ],
    }).compile();

    categoriesService = refModule.get<CategoriesService>(CategoriesService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    const mockdRequest: CategoriesCreateRequest = {
      title: 'Eyebrows',
    };
    it('should be an instanceof CategoryResponse', async () => {
      const response = await categoriesService.create(mockdRequest);
      expect(response instanceof CategoryResponse).toBe(true);
    });
  });

  describe('getAllCategories', () => {
    it('should be an instanceof CategoryListResponse', async () => {
      const response = await categoriesService.getAllCategories();
      expect(response instanceof CategoryListResponse).toBe(true);
    });
  });

  describe('getCategory', () => {
    const mockValidRequest: CategoriesGetRequest = {
      id: 1,
    };

    const mockInvalidRequest: CategoriesGetRequest = {
      id: 2,
    };

    describe('Correct data', () => {
      it('should be an instanceof CategoryResponse', async () => {
        const response = await categoriesService.getCategory(mockValidRequest);
        expect(response instanceof CategoryResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(
          categoriesService.getCategory(mockInvalidRequest),
        ).rejects.toThrow(new NotFoundException('Category not found'));
      });
    });
  });

  describe('update', () => {
    const validCategoryId = 1;
    const invalidCategoryId = 2;

    const mockRequest: CategoriesUpdateRequest = {
      title: 'Eyebrows',
    };

    describe('Correct data', () => {
      it('should be an instanceof CategoryResponse', async () => {
        const response = await categoriesService.update(
          validCategoryId,
          mockRequest,
        );
        expect(response instanceof CategoryResponse).toBe(true);
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(
          categoriesService.update(invalidCategoryId, mockRequest),
        ).rejects.toThrow(new NotFoundException('Category not found'));
      });
    });
  });

  describe('delete', () => {
    const validCategoryId = 1;
    const invalidCategoryId = 2;

    describe('Correct data', () => {
      it('should delete the category successfully', async () => {
        const response = await categoriesService.delete(validCategoryId);
        expect(response).toBeUndefined();
      });
    });
    describe('Incorrect data data', () => {
      it('should throw a NotFoundException', async () => {
        await expect(
          categoriesService.delete(invalidCategoryId),
        ).rejects.toThrow(new NotFoundException('Category not found'));
      });
    });
  });
});
