import { NestFactory } from '@nestjs/core';
import { MeetupMicroserviceModule } from './modules/meetup/meetup.module';
import { instance, RmqService } from '@app/common';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    instance: instance,
  });

  const app = await NestFactory.create(MeetupMicroserviceModule);

  app.useLogger(logger);

  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions('MEETUP', true));

  await app.startAllMicroservices();
}

bootstrap();
