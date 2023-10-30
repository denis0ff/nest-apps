import { NestFactory } from '@nestjs/core';
import { MeetupMicroserviceModule } from './meetup.module';

async function bootstrap() {
  const app = await NestFactory.create(MeetupMicroserviceModule);
  await app.listen(3000);
}
bootstrap();
