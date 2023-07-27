import { ApiProperty } from '@nestjs/swagger';
import {
  BasicResponse,
  BasicResponseArray,
} from '../../../config/basic.response';
import { IService, ServicesEntity } from 'src/domain/services/services.entity';

export class Service implements Omit<IService, 'category' | 'portfolios'> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  categoryId: number;

  constructor(service: ServicesEntity) {
    this.id = service.id;
    this.title = service.title;
    this.categoryId = service.categoryId;
  }
}

export class ServiceResponse extends BasicResponse<Service> {
  constructor(service: Service) {
    super(service);
  }

  @ApiProperty({ type: Service })
  item: Service;
}

export class ServiceListResponse extends BasicResponseArray<Service> {
  constructor(categories: Service[], count: number) {
    super(categories, count);
  }

  @ApiProperty({ type: Service, isArray: true })
  items: Service[];
}
