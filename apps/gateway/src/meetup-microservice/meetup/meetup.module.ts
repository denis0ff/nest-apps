import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MeetupService } from './meetup.service';
import { MeetupController } from './meetup.controller';
import { clientRmqOptionsMeetup } from '@app/common';

@Module({
  imports: [ClientsModule.register([clientRmqOptionsMeetup])],
  providers: [MeetupService],
  controllers: [MeetupController],
})
export class MeetupModule {}
