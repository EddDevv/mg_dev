import { ApiProperty } from '@nestjs/swagger';
import {
  BasicResponse,
  BasicResponseArray,
} from '../../../config/basic.response';
import { IService, ServicesEntity } from 'src/domain/services/services.entity';
import { Category } from '../categories/categories.response';

export class Service implements IService {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ type: Category })
  category: Category;

  constructor(service: ServicesEntity) {
    this.id = service.id;
    this.title = service.title;
    this.category = new Category(service.category);
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
