import { NestFactory } from '@nestjs/core';
import { AuthMicroserviceModule } from './auth/auth.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthMicroserviceModule);

  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions('AUTH', true));

  await app.startAllMicroservices();
}

bootstrap();
