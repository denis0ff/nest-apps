import { IsNotEmpty, IsString } from 'class-validator';

export class ElasticDto {
  @IsNotEmpty()
  @IsString()
  searchString: string;
}
