import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MeetupService } from './meetup.service';
import { MeetupController } from './meetup.controller';
import { RMQ_MODULES, RMQ_CONFIG } from '@app/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RMQ_MODULES.MEETUP,
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
  providers: [MeetupService],
  controllers: [MeetupController],
})
export class MeetupModule {}
