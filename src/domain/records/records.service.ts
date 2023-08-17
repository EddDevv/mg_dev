import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  RecordCreateRequest,
  RecordUpdateRequest,
  RecordsGetRequest,
} from 'src/application/dto/records/records.request';
import {
  Record,
  RecordResponse,
} from 'src/application/dto/records/records.response';
import { EventsRepository } from 'src/infrastructure/repositories/events.repository';
import { RecordsRepository } from 'src/infrastructure/repositories/records.repository';
import { UsersRepository } from 'src/infrastructure/repositories/users.repository';
import { RecordsEntity } from './records.entity';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class RecordsService {
  constructor(
    private readonly recordsRepository: RecordsRepository,
    private readonly eventsRepository: EventsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly i18n: I18nService,
  ) {}

  async getRecord(
    { id }: RecordsGetRequest,
    lang: string,
  ): Promise<RecordResponse> {
    const record = await this.recordsRepository.findOne({
      where: { id },
      relations: ['event', 'user'],
    });
    if (!record) {
      throw new NotFoundException(
        this.i18n.t('exceptions.record.NotFound', {
          lang: lang,
        }),
      );
    }

    return new RecordResponse(new Record(record));
  }

  async create(
    { userId, eventId }: RecordCreateRequest,
    lang: string,
  ): Promise<RecordResponse> {
    const recordExists = await this.recordsRepository.findOne({
      where: { userId, eventId },
    });

    if (recordExists) {
      throw new BadRequestException(
        this.i18n.t('exceptions.record.AlreadyHave', {
          lang: lang,
        }),
      );
    }

    const event = await this.eventsRepository.findOne({
      where: { id: eventId },
    });
    if (!event) {
      throw new NotFoundException(
        this.i18n.t('exceptions.event.NotFound', {
          lang: lang,
        }),
      );
    }

    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(
        this.i18n.t('exceptions.user.NotFound', {
          lang: lang,
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
    lang: string,
  ): Promise<RecordResponse> {
    const recordExists = await this.recordsRepository.findOne({
      where: { userId, eventId },
    });

    if (recordExists) {
      throw new BadRequestException(
        this.i18n.t('exceptions.record.AlreadyHave', {
          lang: lang,
        }),
      );
    }

    const record = await this.recordsRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException(
        this.i18n.t('exceptions.record.NotFound', {
          lang: lang,
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
            lang: lang,
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
            lang: lang,
          }),
        );
      }
      record.event = event;
      record.eventId = event.id;
    }

    await this.recordsRepository.save(record);

    return new RecordResponse(new Record(record));
  }

  async delete(id: number, lang: string): Promise<void> {
    const record = await this.recordsRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException(
        this.i18n.t('exceptions.record.NotFound', {
          lang: lang,
        }),
      );
    }

    await this.recordsRepository.softDelete({ id: record.id });
  }
}
