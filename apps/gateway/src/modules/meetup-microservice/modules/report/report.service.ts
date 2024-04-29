import { RmqMessages } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ReportService {
  constructor(@Inject('MEETUP') private meetupClient: ClientProxy) {}

  public async reportCSV(): Promise<string> {
    return await lastValueFrom(this.meetupClient.send(RmqMessages.REPORT_CSV, {}));
  }

  public async reportPDF(): Promise<Buffer> {
    return await lastValueFrom(this.meetupClient.send(RmqMessages.REPORT_PDF, {}));
  }

}
