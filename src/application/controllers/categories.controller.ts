import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoriesService } from 'src/domain/categories/categories.service';
import {
  CategoryListResponse,
  CategoryResponse,
} from '../dto/categories/categories.response';
import { ResponseMessages } from 'src/config/messages/response.messages';
import { CustomExceptions } from 'src/config/messages/custom.exceptions';
import {
  CategoriesCreateRequest,
  CategoriesGetRequest,
  CategoriesUpdateRequest,
} from '../dto/categories/categories.request';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOkResponse({
    type: CategoryResponse,
    description: ResponseMessages.category.findOne,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.category.NotFound })
  @Get()
  getCategory(@Query() query: CategoriesGetRequest): Promise<CategoryResponse> {
    return this.categoriesService.getCategory(query);
  }

  @ApiOkResponse({
    type: CategoryListResponse,
    description: ResponseMessages.category.findAll,
  })
  @Get('/list')
  getAllCategories(@Query() query): Promise<CategoryListResponse> {
    return this.categoriesService.getAllCategories();
  }

  @ApiCreatedResponse({
    type: CategoryResponse,
    description: ResponseMessages.category.create,
  })
  @Post()
  create(@Body() body: CategoriesCreateRequest): Promise<CategoryResponse> {
    return this.categoriesService.create(body);
  }

  @ApiOkResponse({
    type: CategoryResponse,
    description: ResponseMessages.category.update,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.category.NotFound })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() body: CategoriesUpdateRequest,
  ): Promise<CategoryResponse> {
    return this.categoriesService.update(id, body);
  }

  @ApiOkResponse({ description: ResponseMessages.category.remove })
  @ApiNotFoundResponse({ description: CustomExceptions.category.NotFound })
  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.categoriesService.delete(id);
  }
}
