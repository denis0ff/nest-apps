import { Injectable } from '@nestjs/common';
import { MeetupRepository } from '../meetup/meetup.repository';
import { unparse } from 'papaparse';
import { PDFDocument, StandardFonts } from 'pdf-lib';

@Injectable()
export class ReportService {
  constructor(private readonly meetupRepository: MeetupRepository) {}

  public async reportCSV() {
    const meetups = await this.meetupRepository.getAllMeetupsReport();

    const data = meetups.map(
      ({ title, description, lat, long, place, tags }) => [
        `${title}, ${title}, ${description}, ${place}, ${long}, ${lat}, ${tags.join(
          ', ',
        )}`,
      ],
    );

    return unparse({
      fields: ['Meetups'],
      data,
    });
  }

  public async reportPDF() {
    const meetups = await this.meetupRepository.getAllMeetupsReport();

    const pdfDoc = await PDFDocument.create();

    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const page = pdfDoc.addPage();

    const { width, height } = page.getSize();
    const fontSize = 12;
    const margin = 40;
    const lineHeight = fontSize * 1.5;
    let yPos = height - margin;

    const text = 'Meetup report';
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const xPos = (width - textWidth) / 2;

    page.setFontSize(fontSize * 1.5);
    page.drawText(text, { x: xPos, y: yPos, font });

    yPos -= lineHeight * 2;

    meetups.forEach(({ title, description, date, place, tags, lat, long }) => {
      page.drawText(`Title: ${title}`, {
        x: margin,
        y: yPos,
        size: fontSize,
        font,
      });
      yPos -= lineHeight;
      page.drawText(`Description: ${description}`, {
        x: margin,
        y: yPos,
        size: fontSize,
        font,
      });
      yPos -= lineHeight;
      page.drawText(`Date: ${date.toISOString()}`, {
        x: margin,
        y: yPos,
        size: fontSize,
        font,
      });
      yPos -= lineHeight;
      page.drawText(`Place: ${place}`, {
        x: margin,
        y: yPos,
        size: fontSize,
        font,
      });
      yPos -= lineHeight;
      page.drawText(`Longtitude: ${long}`, {
        x: margin,
        y: yPos,
        size: fontSize,
        font,
      });
      yPos -= lineHeight;
      page.drawText(`Latitude: ${lat}`, {
        x: margin,
        y: yPos,
        size: fontSize,
        font,
      });
      yPos -= lineHeight;
      page.drawText(`Tags: ${tags.join(', ')}`, {
        x: margin,
        y: yPos,
        size: fontSize,
        font,
      });
      yPos -= lineHeight * 2;
    });

    const pdfBytes = await pdfDoc.save();
    const buffer = Buffer.from(pdfBytes);

    return buffer;
  }
}
