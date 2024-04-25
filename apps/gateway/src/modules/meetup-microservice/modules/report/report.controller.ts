import { Controller, Get, Header } from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get('csv')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename=meetups.csv')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get csv report' })
  public async reportCSV() {
    return this.reportService.reportCSV();
  }

  @Get('pdf')
  @Header('Content-Type', 'text/pdf')
  @Header('Content-Disposition', 'attachment; filename=meetups.pdf')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get pdf report' })
  public async reportPDF() {
    return this.reportService.reportPDF();
  }
}
