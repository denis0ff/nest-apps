import { NestFactory } from '@nestjs/core';
import { AuthMicroserviceModule } from './auth-microservice.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { rmqOptionsAuth } from '@app/common';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthMicroserviceModule,
    rmqOptionsAuth,
  );
  await app.listen();
}
bootstrap();
