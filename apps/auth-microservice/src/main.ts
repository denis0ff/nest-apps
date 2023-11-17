import { NestFactory } from '@nestjs/core';
import { AuthMicroserviceModule } from './auth-microservice.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { rmqOptions } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthMicroserviceModule,
    rmqOptions,
  );
  await app.listen();
}
bootstrap();
