import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { EventsService } from '../../domain/events/events.service';
import {
  EventListResponse,
  EventResponse,
} from '../dto/events/events.response';
import {
  EventCreateRequest,
  EventDeleteRequest,
  EventListRequest,
  EventSignUpRequest,
  EventUpdateRequest,
  EventViewRequest,
} from '../dto/events/events.request';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { IRequestUser } from '../../config/user-request.interface';
import { RecordResponse } from '../dto/records/records.response';

@Controller('/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  @ApiOkResponse({ type: EventResponse })
  @UseGuards(AuthGuard)
  @Post('/create')
  createEvent(
    @Req() { user }: IRequestUser,
    @Body() body: EventCreateRequest,
  ): Promise<EventResponse> {
    return this.eventsService.createEvent(user, body);
  }

  @ApiOkResponse({ type: EventResponse })
  @Get()
  viewEvent(
    @Headers('accept-language') lang: string,
    @Query() query: EventViewRequest,
  ): Promise<EventResponse> {
    return this.eventsService.viewEvent(query, lang);
  }

  @ApiOkResponse({ type: EventListResponse })
  @Get('/list')
  viewEventList(@Query() query: EventListRequest): Promise<EventListResponse> {
    return this.eventsService.viewEventList(query);
  }

  @ApiOkResponse({ type: EventResponse })
  @Patch()
  updateEvent(
    @Headers('accept-language') lang: string,
    @Query() query: EventViewRequest,
    @Body() body: EventUpdateRequest,
  ): Promise<EventResponse> {
    return this.eventsService.updateEvent(query, body, lang);
  }

  @ApiOkResponse()
  @Delete('/:id')
  deleteEvent(@Query() query: EventDeleteRequest): Promise<void> {
    return this.eventsService.deleteEvent(query);
  }

  @ApiOkResponse({ type: RecordResponse })
  @ApiUnauthorizedResponse()
  @UseGuards(AuthGuard)
  @Post('/sign-up')
  signUp(
    @Req() { user }: IRequestUser,
    @Body() body: EventSignUpRequest,
  ): Promise<RecordResponse> {
    return this.eventsService.signUp(user, body);
  }
}
