import { IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class GetMeetupDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sort?: 'asc' | 'desc';

  @IsOptional()
  limit?: number = 10;

  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  long?: number;

  @IsNumber()
  @IsOptional()
  lat?: number;
}
