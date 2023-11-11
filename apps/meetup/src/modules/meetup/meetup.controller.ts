import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { JoiValidationPipe } from '@app/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupSchema } from './schemas/create-meetup.schema';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupSchema } from './schemas/update-meetup.schema';
import { UpdateMeetupDto } from './dto/update-meetup.dto';

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
    const meetup = await this.meetupService.readById(id);

    return meetup;
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
  async deleteById(@Param('id') id: string): Promise<void> {
    await this.meetupService.deleteById(id);
  }
}
