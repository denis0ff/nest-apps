import { RmqMessages } from '@app/common';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ReportService } from './report.service';

@Controller()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @EventPattern(RmqMessages.REPORT_CSV)
  public async reportCSV() {
    return this.reportService.reportCSV();
  }

  @EventPattern(RmqMessages.REPORT_PDF)
  public async reportPDF() {
    return this.reportService.reportPDF();
  }
}
