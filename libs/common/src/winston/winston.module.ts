import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [WinstonModule.forRoot({})],
})
export class AppModule {}
