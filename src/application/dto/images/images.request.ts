import { ApiProperty } from '@nestjs/swagger';
import { ImageType } from '../../../config/enums/image.enum';

export class ImagesUploadRequest {
  @ApiProperty({ enum: ImageType })
  type: ImageType;
}
