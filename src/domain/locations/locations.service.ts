import { Injectable } from '@nestjs/common';
import {
  LocationsCreateRequest,
  LocationsUpdateRequest,
} from '../../application/dto/locations/locations.request';

@Injectable()
export class LocationsService {
  create(data: LocationsCreateRequest) {
    return 'This action adds a new location';
  }

  findAll() {
    return `This action returns all locations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: LocationsUpdateRequest) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
