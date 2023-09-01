import { ApiProperty } from '@nestjs/swagger';

export class ImagesUploadResponse {
  @ApiProperty()
  filename: string;
}
