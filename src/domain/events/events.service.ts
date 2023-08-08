import { Injectable, NotFoundException } from '@nestjs/common';
import { EventsRepository } from '../../infrastructure/repositories/events.repository';
import {
  Event,
  EventListResponse,
  EventResponse,
} from '../../application/dto/events/events.response';
import {
  EventCreateRequest,
  EventDeleteRequest,
  EventListRequest,
  EventUpdateRequest,
  EventViewRequest,
} from '../../application/dto/events/events.request';
import { EventsEntity } from './events.entity';
import { CustomExceptions } from '../../config/messages/custom.exceptions';
import { count } from 'rxjs';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async createEvent(body: EventCreateRequest): Promise<EventResponse> {
    const event = new EventsEntity(body);
    await this.eventsRepository.save(event);

    return new EventResponse(new Event(event));
  }

  async viewEvent({ id }: EventViewRequest): Promise<EventResponse> {
    const event = await this.eventsRepository.findOne({
      where: {
        id,
      },
    });

    if (!event) {
      throw new NotFoundException(CustomExceptions.event.NotFound);
    }

    return new EventResponse(new Event(event));
  }

  async viewEventList({ page }: EventListRequest): Promise<EventListResponse> {
    const [events, count] = await this.eventsRepository.findAndCount({
      skip: page * 10,
      take: 10,
    });

    if (events.length == 0) {
      return new EventListResponse([], 0);
    }

    const responseEvents = events.map((event) => {
      return new Event(event);
    });

    return new EventListResponse(responseEvents, count);
  }

  async updateEvent(
    { id }: EventViewRequest,
    body: EventUpdateRequest,
  ): Promise<EventResponse> {
    const event = await this.eventsRepository.findOne({
      where: {
        id,
      },
    });
    if (!event) {
      throw new NotFoundException(CustomExceptions.event.NotFound);
    }

    Object.assign(event, body);
    await this.eventsRepository.save(event);

    return new EventResponse(new Event(event));
  }

  async deleteEvent({ id }: EventDeleteRequest): Promise<void> {
    await this.eventsRepository.softDelete({ id });
  }
}
