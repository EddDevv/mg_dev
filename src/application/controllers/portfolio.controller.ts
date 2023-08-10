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
    @Query() query: PortfolioGetRequest,
  ): Promise<PortfolioResponse> {
    return this.portfolioService.getPortfolio(query);
  }

  @ApiOkResponse({
    type: PortfolioListResponse,
    description: ResponseMessages.portfolio.findAll,
  })
  @Get('/list')
  getAllPortfolio(@Query() query): Promise<PortfolioListResponse> {
    return this.portfolioService.getAllPortfolio();
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
  create(@Body() body: PortfolioCreateRequest): Promise<PortfolioResponse> {
    return this.portfolioService.create(body);
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
    @Param('id') id: number,
    @Body() body: PortfolioUpdateRequest,
  ): Promise<PortfolioResponse> {
    return this.portfolioService.update(id, body);
  }

  @ApiOkResponse({ description: ResponseMessages.portfolio.remove })
  @ApiNotFoundResponse({ description: CustomExceptions.portfolio.NotFound })
  @ApiUnauthorizedResponse({ description: CustomExceptions.auth.Unauthorized })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.portfolioService.delete(id);
  }
}
