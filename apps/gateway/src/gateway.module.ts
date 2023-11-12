import { Module } from '@nestjs/common';
import { MeetupMicroserviceModule } from './meetup-microservice/meetup-microservice.module';

@Module({
  imports: [MeetupMicroserviceModule],
})
export class GatewayModule {}
