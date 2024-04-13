import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { MeetupRepository } from '../meetup/meetup.repository';

@Module({
  imports: [],
  controllers: [ReportController],
  providers: [ReportService, MeetupRepository],
})

export class ReportMicroserviceModule {}
