import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  RecordCreateRequest,
  RecordUpdateRequest,
  RecordsGetListRequest,
  RecordsGetRequest,
} from 'src/application/dto/records/records.request';
import {
  Record,
  RecordListEventResponse,
  RecordResponse,
} from 'src/application/dto/records/records.response';
import { CustomExceptions } from 'src/config/messages/custom.exceptions';
import { EventsRepository } from 'src/infrastructure/repositories/events.repository';
import { RecordsRepository } from 'src/infrastructure/repositories/records.repository';
import { UsersRepository } from 'src/infrastructure/repositories/users.repository';
import { RecordsEntity } from './records.entity';

@Injectable()
export class RecordsService {
  constructor(
    private readonly recordsRepository: RecordsRepository,
    private readonly eventsRepository: EventsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getRecord({ id }: RecordsGetRequest): Promise<RecordResponse> {
    const record = await this.recordsRepository.findOne({
      where: { id },
      relations: ['event', 'user'],
    });
    if (!record) {
      throw new NotFoundException(CustomExceptions.record.NotFound);
    }

    return new RecordResponse(new Record(record));
  }

  async getAllRecords({
    eventId,
    createdAt,
  }: RecordsGetListRequest): Promise<RecordListEventResponse> {
    const [records, count] = await this.recordsRepository.findAndCount({
      relations: ['event', 'user'],
      where: {
        eventId,
      },
      order: { createdAt: createdAt },
    });

    if (count == 0) {
      return new RecordListEventResponse([], 0);
    }

    const resRecords = records.map((record) => {
      return new Record(record);
    });

    return new RecordListEventResponse(resRecords, count);
  }

  async create({
    userId,
    eventId,
  }: RecordCreateRequest): Promise<RecordResponse> {
    const recordExists = await this.recordsRepository.findOne({
      where: { userId, eventId },
    });

    if (recordExists) {
      throw new BadRequestException(CustomExceptions.record.AlreadyHave);
    }

    const event = await this.eventsRepository.findOne({
      where: { id: eventId },
    });
    if (!event) {
      throw new NotFoundException(CustomExceptions.event.NotFound);
    }

    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(CustomExceptions.user.NotFound);
    }

    const record = new RecordsEntity( user, user.id, event, event.id);
    await this.recordsRepository.save(record);

    return new RecordResponse(new Record(record));
  }

  async update(
    id: number,
    { userId, eventId }: RecordUpdateRequest,
  ): Promise<RecordResponse> {
    const recordExists = await this.recordsRepository.findOne({
      where: { userId, eventId },
    });

    if (recordExists) {
      throw new BadRequestException(CustomExceptions.record.AlreadyHave);
    }

    const record = await this.recordsRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException(CustomExceptions.record.NotFound);
    }

    if (userId) {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException(CustomExceptions.user.NotFound);
      }
      record.user = user;
      record.userId = user.id;
    }

    if (eventId) {
      const event = await this.eventsRepository.findOne({
        where: { id: eventId },
      });
      if (!event) {
        throw new NotFoundException(CustomExceptions.event.NotFound);
      }
      record.event = event;
      record.eventId = event.id;
    }

    await this.recordsRepository.save(record);

    return new RecordResponse(new Record(record));
  }

  async delete(id: number): Promise<void> {
    const record = await this.recordsRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException(CustomExceptions.record.NotFound);
    }

    await this.recordsRepository.softDelete({ id: record.id });
  }
}
