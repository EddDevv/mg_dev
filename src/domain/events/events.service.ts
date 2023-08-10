import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  EventSignUpRequest,
  EventUpdateRequest,
  EventViewRequest,
} from '../../application/dto/events/events.request';
import { EventsEntity } from './events.entity';
import { CustomExceptions } from '../../config/messages/custom.exceptions';
import { count } from 'rxjs';
import { User } from '../../application/dto/users/users.response';
import { RecordsEntity } from '../records/records.entity';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { RecordsRepository } from '../../infrastructure/repositories/records.repository';
import {
  Record,
  RecordResponse,
} from '../../application/dto/records/records.response';

@Injectable()
export class EventsService {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly recordsRepository: RecordsRepository,
  ) {}

  async createEvent(
    user: User,
    {
      title,
      description,
      meetType,
      seatsNumber,
      startDate,
      endDate,
    }: EventCreateRequest,
  ): Promise<EventResponse> {
    const userEntity = await this.usersRepository.findOne({
      where: {
        id: user.id,
      },
    });

    const event = new EventsEntity(
      title,
      description,
      meetType,
      seatsNumber,
      userEntity,
      user.id,
      new Date(startDate),
      new Date(endDate),
    );
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

  async signUp(
    user: User,
    { eventId }: EventSignUpRequest,
  ): Promise<RecordResponse> {
    const event = await this.eventsRepository.findOne({
      where: {
        id: eventId,
      },
      relations: ['records'],
    });
    if (!event) {
      throw new NotFoundException(CustomExceptions.event.NotFound);
    }

    if (event.authorId == user.id) {
      throw new BadRequestException(CustomExceptions.event.AuthorSignUp);
    }

    const userEntity = await this.usersRepository.findOne({
      where: {
        id: user.id,
      },
    });

    const record = new RecordsEntity(userEntity, userEntity.id, event, eventId);
    await this.recordsRepository.save(record);

    return new RecordResponse(new Record(record));
  }
}
