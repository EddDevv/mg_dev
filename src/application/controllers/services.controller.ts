import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Query,
  UseGuards,
  Headers,
  Req,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
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
import { JwtGuard } from '../guards/jwt.guard';
import { IRequestUser } from 'src/config/user-request.interface';

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
  @ApiUnauthorizedResponse({ description: CustomExceptions.auth.Unauthorized })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  create(
    @Headers('accept-language') lang: string,
    @Req() { user }: IRequestUser,
    @Body() body: ServicesCreateRequest,
  ): Promise<ServiceResponse> {
    return this.servicesService.create(body, lang, user);
  }

  @ApiOkResponse({
    type: ServiceResponse,
    description: ResponseMessages.service.update,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.service.NotFound })
  @ApiUnauthorizedResponse({ description: CustomExceptions.auth.Unauthorized })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Headers('accept-language') lang: string,
    @Req() { user }: IRequestUser,
    @Param('id') id: number,
    @Body() body: ServicesUpdateRequest,
  ): Promise<ServiceResponse> {
    return this.servicesService.update(id, body, lang, user);
  }

  @ApiOkResponse({ description: ResponseMessages.service.remove })
  @ApiNotFoundResponse({ description: CustomExceptions.service.NotFound })
  @ApiUnauthorizedResponse({ description: CustomExceptions.auth.Unauthorized })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  delete(
    @Headers('accept-language') lang: string,
    @Req() { user }: IRequestUser,
    @Param('id') id: number,
  ): Promise<void> {
    return this.servicesService.delete(id, lang, user);
  }
}
