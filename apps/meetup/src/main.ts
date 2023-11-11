import { NestFactory } from '@nestjs/core';
import { MeetupBootstrap } from './meetup-bootstrap.module';

async function bootstrap() {
  const app = await NestFactory.create(MeetupBootstrap);
  await app.listen(3000);
}
bootstrap();
