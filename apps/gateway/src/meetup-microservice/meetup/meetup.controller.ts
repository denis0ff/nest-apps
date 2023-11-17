import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { JoiValidationPipe, JwtAuthGuard } from '@app/common';
import { CreateMeetupSchema } from './schemas/create-meetup.schema';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupSchema } from './schemas/update-meetup.schema';
import { UpdateMeetupDto } from './dto/update-meetup.dto';

@UseGuards(JwtAuthGuard)
@Controller('meetup')
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async readAll() {
    const meetups = await this.meetupService.readAll();

    return meetups;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async readById(@Param('id') id: string) {
    const tag = await this.meetupService.readById(id);

    return tag;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new JoiValidationPipe(CreateMeetupSchema))
    createMeetupDto: CreateMeetupDto,
  ) {
    const createdMeetup = await this.meetupService.create(createMeetupDto);

    return createdMeetup;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(UpdateMeetupSchema))
    updateMeetupDto: UpdateMeetupDto,
  ) {
    const updatedMeetup = await this.meetupService.update(id, updateMeetupDto);

    return updatedMeetup;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id') id: string) {
    await this.meetupService.deleteById(id);
  }
}
