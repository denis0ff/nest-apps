import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RmqMessages } from '@app/common';

@Injectable()
export class UploadService {
  constructor(@Inject('AUTH') private authClient: ClientProxy) {}

  public async uploadImage(payload: {
    userId: number;
    file: Express.Multer.File;
  }): Promise<void> {
    return await lastValueFrom(
      this.authClient.send(RmqMessages.UPLOAD_USER_IMAGE, { ...payload }),
    );
  }
}
