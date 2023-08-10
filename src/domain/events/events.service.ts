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
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class EventsService {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly i18n: I18nService,
  ) {}

  async createEvent({
    title,
    description,
    meetType,
    seatsNumber,
    startDate,
    endDate,
  }: EventCreateRequest): Promise<EventResponse> {
    const event = new EventsEntity(
      title,
      description,
      meetType,
      seatsNumber,
      startDate,
      endDate,
    );
    await this.eventsRepository.save(event);

    return new EventResponse(new Event(event));
  }

  async viewEvent(
    { id }: EventViewRequest,
    lang: string,
  ): Promise<EventResponse> {
    const event = await this.eventsRepository.findOne({
      where: {
        id,
      },
    });

    if (!event) {
      throw new NotFoundException(
        this.i18n.t('exceptions.event.NotFound', {
          lang: lang,
        }),
      );
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
    lang: string,
  ): Promise<EventResponse> {
    const event = await this.eventsRepository.findOne({
      where: {
        id,
      },
    });
    if (!event) {
      throw new NotFoundException(
        this.i18n.t('exceptions.event.NotFound', {
          lang: lang,
        }),
      );
    }

    Object.assign(event, body);
    await this.eventsRepository.save(event);

    return new EventResponse(new Event(event));
  }

  async deleteEvent({ id }: EventDeleteRequest): Promise<void> {
    await this.eventsRepository.softDelete({ id });
  }
}
