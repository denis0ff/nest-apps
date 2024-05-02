import { IsDateString, IsEnum, IsOptional } from 'class-validator';

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
}
