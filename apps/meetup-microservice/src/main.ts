import { rmqOptions } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { config } from 'dotenv';
import { MeetupMicroservice } from './meetup-microservice.module';

config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MeetupMicroservice,
    rmqOptions,
  );

  await app.listen();
}
bootstrap();
