import { RMQ_MODULES, RMQ_CONFIG } from '@app/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RMQ_MODULES.TAG,
        transport: Transport.RMQ,
        options: {
          urls: [RMQ_CONFIG.SERVER_URL],
          queue: RMQ_CONFIG.MEETUP_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
