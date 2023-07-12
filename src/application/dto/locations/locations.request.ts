import { PartialType } from '@nestjs/swagger';

export class LocationsCreateRequest {}

export class LocationsUpdateRequest extends PartialType(
  LocationsCreateRequest,
) {}
