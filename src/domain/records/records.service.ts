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
import { EventsRepository } from 'src/infrastructure/repositories/events.repository';
import { RecordsRepository } from 'src/infrastructure/repositories/records.repository';
import { UsersRepository } from 'src/infrastructure/repositories/users.repository';
import { RecordsEntity } from './records.entity';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class RecordsService {
  constructor(
    private readonly recordsRepository: RecordsRepository,
    private readonly eventsRepository: EventsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly i18n: I18nService,
  ) {}

  async getRecord({ id }: RecordsGetRequest): Promise<RecordResponse> {
    const record = await this.recordsRepository.findOne({
      where: { id },
      relations: ['event', 'user'],
    });
    if (!record) {
      throw new NotFoundException(
        this.i18n.t('exceptions.record.NotFound', {
          lang: I18nContext.current().lang,
        }),
      );
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
      throw new BadRequestException(
        this.i18n.t('exceptions.record.AlreadyHave', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const event = await this.eventsRepository.findOne({
      where: { id: eventId },
    });
    if (!event) {
      throw new NotFoundException(
        this.i18n.t('exceptions.event.NotFound', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(
        this.i18n.t('exceptions.user.NotFound', {
          lang: I18nContext.current().lang,
        }),
      );
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
      throw new BadRequestException(
        this.i18n.t('exceptions.record.AlreadyHave', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    const record = await this.recordsRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException(
        this.i18n.t('exceptions.record.NotFound', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    if (userId) {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException(
          this.i18n.t('exceptions.user.NotFound', {
            lang: I18nContext.current().lang,
          }),
        );
      }
      record.user = user;
      record.userId = user.id;
    }

    if (eventId) {
      const event = await this.eventsRepository.findOne({
        where: { id: eventId },
      });
      if (!event) {
        throw new NotFoundException(
          this.i18n.t('exceptions.event.NotFound', {
            lang: I18nContext.current().lang,
          }),
        );
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
      throw new NotFoundException(
        this.i18n.t('exceptions.record.NotFound', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    await this.recordsRepository.softDelete({ id: record.id });
  }
}
