import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class GetMeetupByGeoDto {
  @IsNumber()
  @IsNotEmpty()
  long?: number;

  @IsNumber()
  @IsNotEmpty()
  lat?: number;
}
