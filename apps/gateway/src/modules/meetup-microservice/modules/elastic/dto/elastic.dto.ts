import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class ElasticDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Meetup elastic search', nullable: false })
  searchString: string;
}
