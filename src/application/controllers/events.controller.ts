import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
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
  EventUpdateRequest,
  EventViewRequest,
} from '../dto/events/events.request';

@Controller('/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  @Post('/create')
  createEvent(@Body() body: EventCreateRequest): Promise<EventResponse> {
    return this.eventsService.createEvent(body);
  }

  @Get()
  viewEvent(@Query() query: EventViewRequest): Promise<EventResponse> {
    return this.eventsService.viewEvent(query);
  }

  @Get('/list')
  viewEventList(@Query() query: EventListRequest): Promise<EventListResponse> {
    return this.eventsService.viewEventList(query);
  }

  @Patch()
  updateEvent(
    @Query() query: EventViewRequest,
    @Body() body: EventUpdateRequest,
  ): Promise<EventResponse> {
    return this.eventsService.updateEvent(query, body);
  }

  @Delete('/:id')
  deleteEvent(@Query() query: EventDeleteRequest): Promise<void> {
    return this.eventsService.deleteEvent(query);
  }
}
