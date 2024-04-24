import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { RmqModule } from '@app/common';

@Module({
  imports: [RmqModule.register({ serviceName: 'MEETUP' })],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportGatewayModule {}
