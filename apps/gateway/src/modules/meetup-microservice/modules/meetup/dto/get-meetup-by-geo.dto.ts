import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetMeetupByGeoDto {
  @IsNumber()
  @IsNotEmpty()
  long: number;

  @IsNumber()
  @IsNotEmpty()
  lat: number;
}
