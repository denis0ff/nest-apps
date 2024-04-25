import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetMeetupByGeoDto {
  @ApiProperty({ description: 'Meetup place longitude', required: true })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  long: number;

  @ApiProperty({ description: 'Meetup place latitude', required: true })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  lat: number;
}
