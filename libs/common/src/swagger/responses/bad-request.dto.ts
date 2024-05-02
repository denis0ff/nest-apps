import { BadRequestError } from './bad-request.swagger';
import { ApiProperty } from '@nestjs/swagger';

export class BadRequestDto extends BadRequestError {
  @ApiProperty()
  error: string;
}
