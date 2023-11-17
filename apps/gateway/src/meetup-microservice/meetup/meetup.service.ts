import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { RmqMessages, RMQ_CONFIG } from '@app/common';

@Injectable()
export class MeetupService {
  constructor(
    @Inject(RMQ_CONFIG.SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  async readAll() {
    const meetups = await firstValueFrom(
      this.client.send(RmqMessages.GET_ALL_MEETUPS, {}),
    );

    return meetups;
  }

  async readById(id: string) {
    const meetup = await firstValueFrom(
      this.client.send(RmqMessages.GET_MEETUP_BY_ID, { id }),
    );

    return meetup;
  }

  async create(createMeetupDto: CreateMeetupDto) {
    const createdMeetup = await firstValueFrom(
      this.client.send(RmqMessages.CREATE_MEETUP, createMeetupDto),
    );

    return createdMeetup;
  }

  async update(id: string, updateTagDto: UpdateMeetupDto) {
    const updatedTag = await firstValueFrom(
      this.client.send(RmqMessages.UPDATE_MEETUP_BY_ID, {
        id,
        updateTagDto,
      }),
    );

    return updatedTag;
  }

  deleteById(id: string) {
    this.client.emit(RmqMessages.DELETE_MEETUP_BY_ID, { id });
  }
}
