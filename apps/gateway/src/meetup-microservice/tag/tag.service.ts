import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { firstValueFrom } from 'rxjs';
import { RmqMessages, RMQ_CONFIG } from '@app/common';

@Injectable()
export class TagService {
  constructor(
    @Inject(RMQ_CONFIG.SERVICE_MEETUP)
    private readonly client: ClientProxy,
  ) {}

  async readAll() {
    const tags = await firstValueFrom(
      this.client.send(RmqMessages.GET_ALL_TAGS, {}),
    );

    return tags;
  }

  async readById(id: string) {
    const tag = await firstValueFrom(
      this.client.send(RmqMessages.GET_TAG_BY_ID, { id }),
    );

    return tag;
  }

  async create(createTagDto: CreateTagDto) {
    const createdTag = await firstValueFrom(
      this.client.send(RmqMessages.CREATE_TAG, createTagDto),
    );

    return createdTag;
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const updatedTag = await firstValueFrom(
      this.client.send(RmqMessages.UPDATE_TAG_BY_ID, { id, updateTagDto }),
    );

    return updatedTag;
  }

  async deleteById(id: string) {
    await this.client.emit(RmqMessages.DELETE_TAG_BY_ID, { id });
  }
}
