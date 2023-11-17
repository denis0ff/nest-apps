import { Module } from '@nestjs/common';
import { AuthMicroserviceModule } from './auth-microservice/auth-microservice.module';
import { MeetupMicroserviceModule } from './meetup-microservice/meetup-microservice.module';

@Module({
  imports: [AuthMicroserviceModule, MeetupMicroserviceModule],
})
export class GatewayModule {}
