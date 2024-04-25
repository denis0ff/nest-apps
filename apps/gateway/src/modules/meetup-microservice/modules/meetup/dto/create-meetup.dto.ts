import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMeetupDto {
  @ApiProperty({ description: 'Meetup title', nullable: false })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Meetup description', nullable: false })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Meetup tags', nullable: false })
  @IsNotEmpty()
  @IsArray()
  tags: string[];

  @ApiProperty({ description: 'Meetup place', nullable: false })
  @IsNotEmpty()
  @IsString()
  place: string;

  @ApiProperty({ description: 'Meetup place longitude', nullable: false })
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  long: number;

  @ApiProperty({ description: 'Meetup place latitude', nullable: false })
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @ApiProperty({ description: 'Meetup date', nullable: false })
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  date: Date;
}
