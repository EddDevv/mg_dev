import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Query,
  Headers,
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
  CategoriesGetListRequest,
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
  getCategory(
    @Headers('accept-language') lang: string,
    @Query() query: CategoriesGetRequest,
  ): Promise<CategoryResponse> {
    return this.categoriesService.getCategory(query, lang);
  }

  @ApiOkResponse({
    type: CategoryListResponse,
    description: ResponseMessages.category.findAll,
  })
  @Get('/list')
  getAllCategories(
    @Query() query: CategoriesGetListRequest,
  ): Promise<CategoryListResponse> {
    return this.categoriesService.getAllCategories(query);
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
    @Headers('accept-language') lang: string,
    @Param('id') id: number,
    @Body() body: CategoriesUpdateRequest,
  ): Promise<CategoryResponse> {
    return this.categoriesService.update(id, body, lang);
  }

  @ApiOkResponse({ description: ResponseMessages.category.remove })
  @ApiNotFoundResponse({ description: CustomExceptions.category.NotFound })
  @Delete(':id')
  delete(
    @Headers('accept-language') lang: string,
    @Param('id') id: number,
  ): Promise<void> {
    return this.categoriesService.delete(id, lang);
  }
}
