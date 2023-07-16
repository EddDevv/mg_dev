import { ApiProperty } from '@nestjs/swagger';

export class BasicResponse<T> {
  item: T;

  constructor(data: T) {
    this.item = data;
  }
}

export class BasicResponseArray<T> {
  items: T[];

  @ApiProperty()
  count: number;

  protected constructor(data: T[], count: number) {
    this.items = data;
    this.count = count;
  }
}
