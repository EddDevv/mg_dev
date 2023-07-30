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
  getService(@Param() param: ServicesGetRequest): Promise<ServiceResponse> {
    return this.servicesService.getService(param);
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
  create(@Body() body: ServicesCreateRequest): Promise<ServiceResponse> {
    return this.servicesService.create(body);
  }

  @ApiOkResponse({
    type: ServiceResponse,
    description: ResponseMessages.service.update,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.service.NotFound })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() body: ServicesUpdateRequest,
  ): Promise<ServiceResponse> {
    return this.servicesService.update(id, body);
  }

  @ApiOkResponse({ description: ResponseMessages.service.remove })
  @ApiNotFoundResponse({ description: CustomExceptions.service.NotFound })
  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.servicesService.delete(id);
  }
}
