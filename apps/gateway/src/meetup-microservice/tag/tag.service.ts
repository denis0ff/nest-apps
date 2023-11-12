import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { firstValueFrom } from 'rxjs';
import { RMQ_MESSAGES, RMQ_MODULES } from '@app/common';

@Injectable()
export class TagService {
  constructor(
    @Inject(RMQ_MODULES.TAG)
    private readonly client: ClientProxy,
  ) {}

  async readAll() {
    const tags = await firstValueFrom(
      this.client.send(RMQ_MESSAGES.GET_ALL_TAGS, {}),
    );

    return tags;
  }

  async readById(id: string) {
    const tag = await firstValueFrom(
      this.client.send(RMQ_MESSAGES.GET_TAG_BY_ID, { id }),
    );

    return tag;
  }

  async create(createTagDto: CreateTagDto) {
    const createdTag = await firstValueFrom(
      this.client.send(RMQ_MESSAGES.CREATE_TAG, createTagDto),
    );

    return createdTag;
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const updatedTag = await firstValueFrom(
      this.client.send(RMQ_MESSAGES.UPDATE_TAG_BY_ID, { id, updateTagDto }),
    );

    return updatedTag;
  }

  async deleteById(id: string) {
    await this.client.emit(RMQ_MESSAGES.DELETE_TAG_BY_ID, { id });
  }
}
