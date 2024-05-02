import { RmqMessages } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { GetMeetupDto } from './dto';

@Injectable()
export class ReportService {
  constructor(@Inject('MEETUP') private meetupClient: ClientProxy) {}

  public async reportCSV(dto: GetMeetupDto): Promise<string> {
    return await lastValueFrom(
      this.meetupClient.send(RmqMessages.REPORT_CSV, { dto }),
    );
  }

  public async reportPDF(dto: GetMeetupDto): Promise<Buffer> {
    return await lastValueFrom(
      this.meetupClient.send(RmqMessages.REPORT_PDF, { dto }),
    );
  }
}
