import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DevService } from '../../domain/dev/dev.service';

@ApiTags('DEV_ONLY')
@Controller('dev')
export class DevController {
  constructor(private readonly devService: DevService) {}

  @Post('delete-all-images')
  delete() {
    return this.devService.deleteAllImages();
  }
}
