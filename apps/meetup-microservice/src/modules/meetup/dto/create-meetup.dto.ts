import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMeetupDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  tags: string[];

  @IsNotEmpty()
  @IsString()
  place: string;

  @IsNotEmpty()
  @IsNumber()
  long: number;

  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  date: Date;
}
