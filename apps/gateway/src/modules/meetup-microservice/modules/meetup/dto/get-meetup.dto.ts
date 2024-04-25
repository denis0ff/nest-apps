import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetMeetupDto {
  @ApiProperty({ description: 'Meetup title', required: false })
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Filtering meetup date from', required: false })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiProperty({ description: 'Filtering meetup date to', required: false })
  @IsOptional()
  @IsDateString()
  to?: string;

  @ApiProperty({
    description: 'Sorting direction',
    enum: ['asc', 'desc'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sort?: 'asc' | 'desc';

  @ApiProperty({
    description: 'Count of results',
    required: false,
    minimum: 1,
    default: 10,
  })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  limit?: number = 10;

  @ApiProperty({ description: 'Page number', required: false })
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  page?: number;
}
