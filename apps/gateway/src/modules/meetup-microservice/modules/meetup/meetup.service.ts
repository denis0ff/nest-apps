import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMeetupDto, GetMeetupDto, UpdateMeetupDto } from './dto';
import { lastValueFrom } from 'rxjs';
import { MeetupResponse } from './response';
import { RmqMessages } from '@app/common';
import { GetMeetupByGeoDto } from './dto/get-meetup-by-geo.dto';

@Injectable()
export class MeetupService {
  constructor(@Inject('MEETUP') private meetupClient: ClientProxy) {}

  public async getAllMeetups(
    dto: GetMeetupDto,
  ): Promise<MeetupResponse | string> {
    return await lastValueFrom(
      this.meetupClient.send(RmqMessages.GET_ALL_MEETUPS, { dto }),
    );
  }

  public async getMeetupByGeo(dto: GetMeetupByGeoDto) {
    return await lastValueFrom(
      this.meetupClient.send(RmqMessages.GET_MEETUP_BY_GEO, { dto }),
    );
  }

  public async getMeetupById(id: number): Promise<MeetupResponse | string> {
    return await lastValueFrom(
      this.meetupClient.send(RmqMessages.GET_MEETUP_BY_ID, { id }),
    );
  }

  public async createMeetup(
    userId: number,
    dto: CreateMeetupDto,
  ): Promise<MeetupResponse | string> {
    return await lastValueFrom(
      this.meetupClient.send(RmqMessages.CREATE_MEETUP, {
        userId,
        dto,
      }),
    );
  }

  public async updateMeetup(
    userId: number,
    id: number,
    dto: UpdateMeetupDto,
  ): Promise<MeetupResponse | string> {
    return await lastValueFrom(
      this.meetupClient.send(RmqMessages.UPDATE_MEETUP_BY_ID, {
        userId: userId,
        id: id,
        dto: dto,
      }),
    );
  }

  public async deleteMeetup(
    userId: number,
    id: number,
  ): Promise<MeetupResponse | string> {
    return await lastValueFrom(
      this.meetupClient.send(RmqMessages.DELETE_MEETUP_BY_ID, {
        userId: userId,
        id: id,
      }),
    );
  }

  public async reportCSV() {
    return await lastValueFrom(
      this.meetupClient.send(RmqMessages.REPORT_CSV, {}),
    );
  }

  public async reportPDF() {
    return await lastValueFrom(
      this.meetupClient.send(RmqMessages.REPORT_PDF, {}),
    );
  }
}
