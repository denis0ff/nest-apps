import { Controller, Get, Header, Res } from '@nestjs/common';
import { ReportService } from './report.service';
import { Response } from 'express';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get('csv')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename=meetups.csv')
  public async reportCSV() {
    return this.reportService.reportCSV();
  }

  @Get('pdf')
  @Header('Content-Type', 'text/pdf')
  @Header('Content-Disposition', 'attachment; filename=meetups.pdf')
  public async reportPDF() {
    return this.reportService.reportPDF();
  }
}
