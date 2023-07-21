import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CustomExceptions } from 'src/config/messages/custom.exceptions';
import { PortfolioService } from 'src/domain/portfolio/portfolio.service';
import { AuthGuard } from '../guards/auth.guard';
import {
  PortfolioCreateRequest,
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
  @Get(':id')
  getPortfolio(@Param('id') id: number): Promise<PortfolioResponse> {
    return this.portfolioService.getPortfolio(id);
  }

  @ApiOkResponse({
    type: PortfolioListResponse,
    description: ResponseMessages.portfolio.findAll,
  })
  @Get('/business/:businessId')
  getAllPortfolioByBusinessId(
    @Param('businessId') businessId: number,
  ): Promise<PortfolioListResponse> {
    return this.portfolioService.getAllPortfolioByBusinessId(businessId);
  }

  @ApiCreatedResponse({
    type: PortfolioResponse,
    description: ResponseMessages.portfolio.create,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.portfolio.NotFound })
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  deletePortfolio(@Param('id') id: number): Promise<void> {
    return this.portfolioService.deletePortfolio(id);
  }
}
