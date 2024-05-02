import { Controller } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupDto, GetMeetupDto, UpdateMeetupDto } from './dto';
import { MeetupResponse } from './response';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { RmqMessages } from '@app/common';
import { GetMeetupByGeoDto } from './dto/get-meetup-by-geo.dto';

@Controller()
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) {}

  @MessagePattern(RmqMessages.GET_ALL_MEETUPS)
  public async getAllMeetups(
    @Payload('dto') dto: GetMeetupDto,
  ): Promise<MeetupResponse[] | string> {
    return this.meetupService.getAllMeetups(dto);
  }

  @MessagePattern(RmqMessages.GET_MEETUP_BY_GEO)
  public async getMeetupByGeo(
    @Payload('dto') dto: GetMeetupByGeoDto,
  ): Promise<MeetupResponse[] | string> {
    return this.meetupService.getMeetupByGeo(dto);
  }

  @MessagePattern(RmqMessages.GET_MEETUP_BY_ID)
  public async getMeetupById(@Payload('id') id: number) {
    return this.meetupService.getMeetupById(id);
  }

  @MessagePattern(RmqMessages.CREATE_MEETUP)
  public async createMeetup(
    @Payload('userId') userId: number,
    @Payload('dto') dto: CreateMeetupDto,
  ) {
    return this.meetupService.createMeetup(userId, dto);
  }

  @EventPattern(RmqMessages.UPDATE_MEETUP_BY_ID)
  public async updateMeetup(
    @Payload('userId') userId: number,
    @Payload('id') id: number,
    @Payload('dto') dto: UpdateMeetupDto,
  ) {
    return this.meetupService.updateMeetup(userId, id, dto);
  }

  @EventPattern(RmqMessages.DELETE_MEETUP_BY_ID)
  public async deleteMeetup(
    @Payload('userId') userId: number,
    @Payload('id') id: number,
  ) {
    return this.meetupService.deleteMeetup(userId, id);
  }
}
