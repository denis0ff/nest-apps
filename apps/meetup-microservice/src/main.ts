import { RMQ_CONFIG } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { MeetupMicroservice } from './meetup-microservice.module';

config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MeetupMicroservice,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RMQ_CONFIG.SERVER_URL],
        queue: RMQ_CONFIG.MEETUP_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
