import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './images', // Путь к папке для сохранения файлов
    }),
  ],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
