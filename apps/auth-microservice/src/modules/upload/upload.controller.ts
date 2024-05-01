import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RmqMessages } from '@app/common';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @MessagePattern(RmqMessages.UPLOAD_USER_IMAGE)
  public async uploadImage(
    @Payload('userId') userId: number,
    @Payload('file') file: Express.Multer.File,
  ) {
    return this.uploadService.uploadImage(userId, file);
  }
}
