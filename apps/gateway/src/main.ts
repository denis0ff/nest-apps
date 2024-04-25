import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { GatewayModule } from './gateway.module';
import { setupSwagger } from '@app/common/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  setupSwagger(app);

  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  process.on('SIGINT', async () => {
    await app.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await app.close();
    process.exit(0);
  });

  await app.listen(3000);
}
bootstrap();
