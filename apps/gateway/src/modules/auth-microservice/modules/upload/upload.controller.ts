import { Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RmqMessages } from '@app/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Upload API')
@Controller('upload')
export class UploadGatewayController {
  constructor() {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload user avatar' })
  public async uploadImage(
    @Payload('userId') userId: number,
    @Payload('file') file: Express.Multer.File,
  ) {
    console.log(file);
    return {
      message: 'Файл успешно загружен',
      filename: file.filename,
    };
  }
}
