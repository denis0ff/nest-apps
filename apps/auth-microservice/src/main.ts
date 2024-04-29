import { NestFactory } from '@nestjs/core';
import { AuthMicroserviceModule } from './modules/auth/auth.module';
import { instance, RmqService } from '@app/common';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    instance: instance,
  });

  const app = await NestFactory.create(AuthMicroserviceModule);

  app.useLogger(logger);

  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions('AUTH', true));

  await app.startAllMicroservices();
}

bootstrap();
