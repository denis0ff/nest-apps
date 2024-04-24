import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { MeetupRepository } from '../meetup/meetup.repository';
import { unparse } from 'papaparse';
import * as fs from 'fs';

@Injectable()
export class ReportService {
  constructor(private readonly meetupRepository: MeetupRepository) {}

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

  /*   public async reportPDF() {
    const doc = new PDFDocument();
    const outputPath = 'meetups.pdf';
    const stream = createWriteStream(outputPath);
    doc.pipe(stream);

    const data = await this.prisma.meetup.findMany();

    data.forEach((meetup) => {
      doc.fontSize(14).text(`Title: ${meetup.title}`);
      doc.fontSize(12).text(`Description: ${meetup.description}`);
      doc.fontSize(12).text(`Date: ${meetup.date.toISOString()}`);
      doc.fontSize(12).text(`Place: ${meetup.place}`);
      doc.fontSize(12).text(`Longitude: ${meetup.long}`);
      doc.fontSize(12).text(`Latitude: ${meetup.lat}`);
      doc.fontSize(12).text(`Tags: ${meetup.tags.join()}`);

      doc.moveDown();
    });

    doc.end();
  } */

  private async getMeetupList() {
    const meetups = await this.meetupRepository.getAllMeetupsReport();

    return meetups.map(({ title, description, lat, long, place, tags }) => [
      `${title}, ${title}, ${description}, ${place}, ${long}, ${lat}, ${tags.join(
        ', ',
      )}`,
    ]);
  }
}
