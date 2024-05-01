import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [RmqModule.register({ serviceName: 'AUTH' })],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadGatewayModule {}
