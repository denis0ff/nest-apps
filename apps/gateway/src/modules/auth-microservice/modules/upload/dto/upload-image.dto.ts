import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadImageDto {
  @ApiProperty({
    description: 'Image file',
    nullable: false,
    type: 'file',
  })
  file: Express.Multer.File;
}
