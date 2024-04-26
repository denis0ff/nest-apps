import { Controller, Get, Header, HttpStatus } from '@nestjs/common';
import { ReportService } from './report.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Report API')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get('csv')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename=meetups.csv')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get csv report' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  public async reportCSV() {
    return this.reportService.reportCSV();
  }

  @Get('pdf')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename=meetups.pdf')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get pdf report' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  public async reportPDF() {
    return this.reportService.reportPDF();
  }
}
