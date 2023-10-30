import { NestFactory } from '@nestjs/core';
import { AuthorizationMicroserviceModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthorizationMicroserviceModule);
  await app.listen(3000);
}
bootstrap();
