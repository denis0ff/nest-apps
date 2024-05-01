import {
  Controller,
  Get,
  Header,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import { ReportService } from './report.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { writeFile } from 'fs/promises';
import { GetMeetupDto } from './dto';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
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
  public async reportCSV(@Query() dto: GetMeetupDto) {
    return this.reportService.reportCSV(dto);
  }

  @Get('pdf')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename=meetups.pdf')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get pdf report' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  public async reportPDF(@Query() dto: GetMeetupDto, @Res() res: Response) {
    const pdfBytes = await this.reportService.reportPDF(dto);

    await writeFile('./meetups.pdf', Buffer.from(pdfBytes));
    res.download('./meetups.pdf');
  }
}
