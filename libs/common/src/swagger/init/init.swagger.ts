import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const documentBuilder = new DocumentBuilder()
    .setTitle('Meetup API')
    .setDescription('Meetup API')
    .setVersion('1.0');

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('swagger', app, document);
};
