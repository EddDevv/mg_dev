import { ApiProperty } from '@nestjs/swagger';
import {
  BasicResponse,
  BasicResponseArray,
} from '../../../config/basic.response';
import { IService, ServicesEntity } from 'src/domain/services/services.entity';

export class Service
  implements Omit<IService, 'category' | 'portfolios' | 'business'>
{
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  departureToClient: boolean;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  businessId: number;

  @ApiProperty({ nullable: true })
  image: string;

  constructor(service: ServicesEntity) {
    this.id = service.id;
    this.title = service.title;
    this.price = service.price;
    this.description = service.description;
    this.departureToClient = service.departureToClient;
    this.categoryId = service.categoryId;
    this.businessId = service.businessId;
    this.image = service.image;
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
