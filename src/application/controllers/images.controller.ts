import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from '../../domain/images/images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse } from '@nestjs/swagger';
import { ImagesUploadRequest } from '../dto/images/images.request';
import { ImagesUploadResponse } from '../dto/images/images.response';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiOkResponse({
    type: String,
    description: 'Will return image string for updating',
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @Body() { type }: ImagesUploadRequest,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImagesUploadResponse> {
    return await this.imagesService.uploadImage(file, type);
  }
}
