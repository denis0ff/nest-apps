import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { RMQ_MODULES, RMQ_MESSAGES } from '@app/common';

@Injectable()
export class MeetupService {
  constructor(
    @Inject(RMQ_MODULES.MEETUP)
    private readonly client: ClientProxy,
  ) {}

  async readAll() {
    const meetups = await firstValueFrom(
      this.client.send(RMQ_MESSAGES.GET_ALL_MEETUPS, {}),
    );

    return meetups;
  }

  async readById(id: string) {
    const meetup = await firstValueFrom(
      this.client.send(RMQ_MESSAGES.GET_MEETUP_BY_ID, { id }),
    );

    return meetup;
  }

  async create(createMeetupDto: CreateMeetupDto) {
    const createdMeetup = await firstValueFrom(
      this.client.send(RMQ_MESSAGES.CREATE_MEETUP, createMeetupDto),
    );

    return createdMeetup;
  }

  async update(id: string, updateTagDto: UpdateMeetupDto) {
    const updatedTag = await firstValueFrom(
      this.client.send(RMQ_MESSAGES.UPDATE_MEETUP_BY_ID, {
        id,
        updateTagDto,
      }),
    );

    return updatedTag;
  }

  deleteById(id: string) {
    this.client.emit(RMQ_MESSAGES.DELETE_MEETUP_BY_ID, { id });
  }
}
