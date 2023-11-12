import { Controller } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@app/common';

@Controller()
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @MessagePattern(RMQ_MESSAGES.GET_ALL_MEETUPS)
  async readAll() {
    const meetups = await this.meetupService.readAll();

    return meetups;
  }

  @MessagePattern(RMQ_MESSAGES.GET_MEETUP_BY_ID)
  async readById(@Payload('id') id: string) {
    const meetup = await this.meetupService.readById(id);

    return meetup;
  }

  @MessagePattern(RMQ_MESSAGES.CREATE_MEETUP)
  async create(@Payload() createMeetupDto: CreateMeetupDto) {
    const createdMeetup = await this.meetupService.create(createMeetupDto);

    return createdMeetup;
  }

  @MessagePattern(RMQ_MESSAGES.UPDATE_MEETUP_BY_ID)
  async update(
    @Payload('id') id: string,
    @Payload('updateMeetupDto') updateMeetupDto: UpdateMeetupDto,
  ) {
    const updatedMeetup = await this.meetupService.update(id, updateMeetupDto);

    return updatedMeetup;
  }

  @EventPattern(RMQ_MESSAGES.DELETE_MEETUP_BY_ID)
  async deleteById(@Payload('id') id: string) {
    await this.meetupService.deleteById(id);
  }
}
