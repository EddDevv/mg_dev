import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImageType } from '../../config/enums/image.enum';
import { ImagesUploadResponse } from '../../application/dto/images/images.response';

@Injectable()
export class ImagesService {
  async uploadImage(
    file: Express.Multer.File,
    type: ImageType,
  ): Promise<ImagesUploadResponse> {
    // this is a fast solution for name by GPT (will be another in v2)
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    const filename = `${randomName}${extname(file.originalname)}`;
    const uploadPath = `./images/${type}/${filename}`;

    try {
      diskStorage({ destination: uploadPath })._handleFile(
        null,
        file,
        (err: any) => {
          if (err) {
            throw new Error(`Failed to save the image: ${err.message}`);
          }
        },
      );

      return { filename };
    } catch (error) {
      throw new Error(`Failed to save the image: ${error.message}`);
    }
  }
}
