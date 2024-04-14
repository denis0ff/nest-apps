import { NestFactory } from '@nestjs/core';
import { MeetupModule } from './modules/meetup/meetup.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(MeetupModule);

  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions('MEETUP', true));

  await app.startAllMicroservices();
}

bootstrap();
