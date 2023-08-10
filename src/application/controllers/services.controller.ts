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
import { ResponseMessages } from 'src/config/messages/response.messages';
import { CustomExceptions } from 'src/config/messages/custom.exceptions';
import { ServicesService } from 'src/domain/services/services.service';
import {
  ServiceListResponse,
  ServiceResponse,
} from '../dto/services/services.response';
import {
  ServicesCreateRequest,
  ServicesGetListRequest,
  ServicesGetRequest,
  ServicesUpdateRequest,
} from '../dto/services/services.request';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiOkResponse({
    type: ServiceResponse,
    description: ResponseMessages.service.findOne,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.service.NotFound })
  @Get()
  getService(
    @Headers('accept-language') lang: string,
    @Query() query: ServicesGetRequest,
  ): Promise<ServiceResponse> {
    return this.servicesService.getService(query, lang);
  }

  @ApiOkResponse({
    type: ServiceListResponse,
    description: ResponseMessages.service.findAll,
  })
  @Get('/list')
  getAllServices(
    @Query() query: ServicesGetListRequest,
  ): Promise<ServiceListResponse> {
    return this.servicesService.getAllServices(query);
  }

  @ApiCreatedResponse({
    type: ServiceListResponse,
    description: ResponseMessages.service.create,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.service.NotFound })
  @Post()
  create(
    @Headers('accept-language') lang: string,
    @Body() body: ServicesCreateRequest,
  ): Promise<ServiceResponse> {
    return this.servicesService.create(body, lang);
  }

  @ApiOkResponse({
    type: ServiceResponse,
    description: ResponseMessages.service.update,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.service.NotFound })
  @Patch(':id')
  update(
    @Headers('accept-language') lang: string,
    @Param('id') id: number,
    @Body() body: ServicesUpdateRequest,
  ): Promise<ServiceResponse> {
    return this.servicesService.update(id, body, lang);
  }

  @ApiOkResponse({ description: ResponseMessages.service.remove })
  @ApiNotFoundResponse({ description: CustomExceptions.service.NotFound })
  @Delete(':id')
  delete(
    @Headers('accept-language') lang: string,
    @Param('id') id: number,
  ): Promise<void> {
    return this.servicesService.delete(id, lang);
  }
}
