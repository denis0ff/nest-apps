import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule, RmqModule } from '@app/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UploadRepository } from './upload.repository';

@Module({
  imports: [
    PrismaModule,
    RmqModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
  ],
  providers: [UploadService, UploadRepository, Logger],
  controllers: [UploadController],
  exports: [UploadMicroserviceModule, Logger],
})
export class UploadMicroserviceModule {}
