import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { config } from 'dotenv';
import * as cookieParser from 'cookie-parser';

config();

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.use(cookieParser());

  await app.listen(3000);
}

bootstrap();
