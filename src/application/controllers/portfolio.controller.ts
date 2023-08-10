import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Patch,
  UseGuards,
  Query,
  Headers,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CustomExceptions } from 'src/config/messages/custom.exceptions';
import { PortfolioService } from 'src/domain/portfolio/portfolio.service';
import { AuthGuard } from '../guards/auth.guard';
import {
  PortfolioCreateRequest,
  PortfolioGetListRequest,
  PortfolioGetRequest,
  PortfolioUpdateRequest,
} from '../dto/portfolio/portfolio.request';
import { ResponseMessages } from 'src/config/messages/response.messages';
import {
  PortfolioListResponse,
  PortfolioResponse,
} from '../dto/portfolio/portfolio.response';

@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @ApiOkResponse({
    type: PortfolioResponse,
    description: ResponseMessages.portfolio.findOne,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.portfolio.NotFound })
  @Get()
  getPortfolio(
    @Headers('accept-language') lang: string,
    @Query() query: PortfolioGetRequest,
  ): Promise<PortfolioResponse> {
    return this.portfolioService.getPortfolio(query, lang);
  }

  @ApiOkResponse({
    type: PortfolioListResponse,
    description: ResponseMessages.portfolio.findAll,
  })
  @Get('/list')
  getAllPortfolio(
    @Query() query: PortfolioGetListRequest,
  ): Promise<PortfolioListResponse> {
    return this.portfolioService.getAllPortfolio(query);
  }

  @ApiCreatedResponse({
    type: PortfolioResponse,
    description: ResponseMessages.portfolio.create,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.portfolio.NotFound })
  @ApiUnauthorizedResponse({ description: CustomExceptions.auth.Unauthorized })
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  create(
    @Headers('accept-language') lang: string,
    @Body() body: PortfolioCreateRequest,
  ): Promise<PortfolioResponse> {
    return this.portfolioService.create(body, lang);
  }

  @ApiOkResponse({
    type: PortfolioResponse,
    description: ResponseMessages.portfolio.update,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.portfolio.NotFound })
  @ApiUnauthorizedResponse({ description: CustomExceptions.auth.Unauthorized })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Headers('accept-language') lang: string,
    @Param('id') id: number,
    @Body() body: PortfolioUpdateRequest,
  ): Promise<PortfolioResponse> {
    return this.portfolioService.update(id, body, lang);
  }

  @ApiOkResponse({ description: ResponseMessages.portfolio.remove })
  @ApiNotFoundResponse({ description: CustomExceptions.portfolio.NotFound })
  @ApiUnauthorizedResponse({ description: CustomExceptions.auth.Unauthorized })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(
    @Headers('accept-language') lang: string,
    @Param('id') id: number,
  ): Promise<void> {
    return this.portfolioService.delete(id, lang);
  }
}
