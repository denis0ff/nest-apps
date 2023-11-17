import { Controller } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { RmqMessages } from '@app/common';

@Controller()
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @MessagePattern(RmqMessages.GET_ALL_MEETUPS)
  async readAll() {
    const meetups = await this.meetupService.readAll();

    return meetups;
  }

  @MessagePattern(RmqMessages.GET_MEETUP_BY_ID)
  async readById(@Payload('id') id: string) {
    const meetup = await this.meetupService.readById(id);

    return meetup;
  }

  @MessagePattern(RmqMessages.CREATE_MEETUP)
  async create(@Payload() createMeetupDto: CreateMeetupDto) {
    const createdMeetup = await this.meetupService.create(createMeetupDto);

    return createdMeetup;
  }

  @MessagePattern(RmqMessages.UPDATE_MEETUP_BY_ID)
  async update(
    @Payload('id') id: string,
    @Payload('updateMeetupDto') updateMeetupDto: UpdateMeetupDto,
  ) {
    const updatedMeetup = await this.meetupService.update(id, updateMeetupDto);

    return updatedMeetup;
  }

  @EventPattern(RmqMessages.DELETE_MEETUP_BY_ID)
  async deleteById(@Payload('id') id: string) {
    await this.meetupService.deleteById(id);
  }
}
