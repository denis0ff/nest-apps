import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { MeetupRepository } from '../meetup/meetup.repository';
import { unparse } from 'papaparse';
import * as fs from 'fs';

@Injectable()
export class ReportService {
  constructor(private readonly meetupsRepository: MeetupRepository) {}

  public async reportCSV() {
    const data = await this.getMeetupList();

    return unparse({
      fields: ['Meetups'],
      data,
    });
  }

  public async reportPDF() {
    const data = await this.getMeetupList();

    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream('meetups.pdf'));
    doc.fontSize(13).text(data.toString(), 120, 120);
    doc.end();
  }

  private async getMeetupList() {
    const meetups = await this.meetupsRepository.getAllMeetupsReport();

    return meetups.map(({ name, description, lat, long, place, tags }) => [
      `${name}, ${name}, ${description}, ${place}, ${long}, ${lat}, ${tags.join(
        ', ',
      )}`,
    ]);
  }
}
