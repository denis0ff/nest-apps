import { Controller } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { RmqMessages } from '@app/common';

@Controller()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @MessagePattern(RmqMessages.GET_ALL_TAGS)
  async readAll() {
    const tags = await this.tagService.readAll();

    return tags;
  }

  @MessagePattern(RmqMessages.GET_TAG_BY_ID)
  async readById(@Payload('id') id: string) {
    const tag = await this.tagService.readById(id);

    return tag;
  }

  @MessagePattern(RmqMessages.CREATE_TAG)
  async create(@Payload() createTagDto: CreateTagDto) {
    const createdTag = await this.tagService.create(createTagDto);

    return createdTag;
  }

  @MessagePattern(RmqMessages.UPDATE_TAG_BY_ID)
  async update(
    @Payload('id') id: string,
    @Payload('updateTagDto') updateTagDto: UpdateTagDto,
  ) {
    const updatedTag = await this.tagService.update(id, updateTagDto);

    return updatedTag;
  }

  @EventPattern(RmqMessages.DELETE_TAG_BY_ID)
  async deleteById(@Payload('id') id: string) {
    await this.tagService.deleteById(id);
  }
}
