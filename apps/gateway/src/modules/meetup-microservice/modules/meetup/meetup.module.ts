import { Module } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { MeetupController } from './meetup.controller';
import { PrismaModule, RmqModule } from '@app/common';
import { ReportGatewayModule } from '../report/report.module';

@Module({
  imports: [
    PrismaModule,
    RmqModule.register({ serviceName: 'MEETUP' }),
    ReportGatewayModule,
  ],
  controllers: [MeetupController],
  providers: [MeetupService],
  exports: [RmqModule],
})
export class MeetupGatewayModule {}
