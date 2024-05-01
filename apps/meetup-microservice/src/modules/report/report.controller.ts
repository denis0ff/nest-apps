import { RmqMessages } from '@app/common';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { GetMeetupDto } from './dto';
import { ReportService } from './report.service';

@Controller()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @EventPattern(RmqMessages.REPORT_CSV)
  public async reportCSV(@Payload('dto') dto: GetMeetupDto) {
    return this.reportService.reportCSV(dto);
  }

  @EventPattern(RmqMessages.REPORT_PDF)
  public async reportPDF(@Payload('dto') dto: GetMeetupDto) {
    return this.reportService.reportPDF(dto);
  }
}
