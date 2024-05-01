import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UploadRepository } from './upload.repository';

@Injectable()
export class UploadService {
  constructor(
    private readonly repository: UploadRepository,
    private readonly logger: Logger,
  ) {}
  SERVICE: string = UploadService.name;

  public async uploadImage(userId: number, file: Express.Multer.File) {
    try {
      const buffer = Buffer.from(file.buffer);

      await this.repository.addImageToUser(userId, buffer);

      return true;
    } catch (e: any) {
      this.logger.error('Unable to login user', e, this.SERVICE);

      return new HttpException(
        `${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
