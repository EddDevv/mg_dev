import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Patch,
  UseGuards,
  Req,
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
import { JwtGuard } from '../guards/jwt.guard';
import { CustomExceptions } from 'src/config/messages/custom.exceptions';
import { AuthGuard } from '../guards/auth.guard';
import {
  RecordCreateRequest,
  RecordUpdateRequest,
  RecordsGetListRequest,
  RecordsGetRequest,
} from '../dto/records/records.request';
import { RecordsService } from 'src/domain/records/records.service';
import {
  RecordListEventResponse,
  RecordResponse,
} from '../dto/records/records.response';
import { ResponseMessages } from 'src/config/messages/response.messages';

@ApiTags('Records')
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @ApiOkResponse({
    type: RecordResponse,
    description: ResponseMessages.record.findOne,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.record.NotFound })
  @Get()
  getPost(@Query() query: RecordsGetRequest): Promise<RecordResponse> {
    return this.recordsService.getRecord(query);
  }

  @ApiOkResponse({
    type: RecordListEventResponse,
    description: ResponseMessages.record.findAll,
  })
  @Get('/list')
  getAllPosts(
    @Query() query: RecordsGetListRequest,
  ): Promise<RecordListEventResponse> {
    return this.recordsService.getAllRecords(query);
  }

  @ApiOkResponse({
    type: RecordResponse,
    description: ResponseMessages.record.create,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.record.NotFound })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: RecordCreateRequest): Promise<RecordResponse> {
    return this.recordsService.create(body);
  }

  @ApiOkResponse({
    type: RecordResponse,
    description: ResponseMessages.record.update,
  })
  @ApiNotFoundResponse({ description: CustomExceptions.posts.NotFound })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() body: RecordUpdateRequest,
  ): Promise<RecordResponse> {
    return this.recordsService.update(id, body);
  }

  @ApiOkResponse({ description: ResponseMessages.record.remove })
  @ApiNotFoundResponse({ description: CustomExceptions.posts.NotFound })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  deletePost(@Param('id') id: number): Promise<void> {
    return this.recordsService.delete(id);
  }
}
