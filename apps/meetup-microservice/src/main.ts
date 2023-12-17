import { rmqOptionsMeetup } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { config } from 'dotenv';
import { MeetupMicroservice } from './meetup-microservice.module';

config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MeetupMicroservice,
    rmqOptionsMeetup,
  );

  await app.listen();
}
bootstrap();
