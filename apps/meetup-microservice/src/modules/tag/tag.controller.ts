import { Controller } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { RMQ_MESSAGES } from '@app/common';

@Controller()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @MessagePattern(RMQ_MESSAGES.GET_ALL_TAGS)
  async readAll() {
    const tags = await this.tagService.readAll();

    return tags;
  }

  @MessagePattern(RMQ_MESSAGES.GET_TAG_BY_ID)
  async readById(@Payload('id') id: string) {
    const tag = await this.tagService.readById(id);

    return tag;
  }

  @MessagePattern(RMQ_MESSAGES.CREATE_TAG)
  async create(@Payload() createTagDto: CreateTagDto) {
    const createdTag = await this.tagService.create(createTagDto);

    return createdTag;
  }

  @MessagePattern(RMQ_MESSAGES.UPDATE_TAG_BY_ID)
  async update(
    @Payload('id') id: string,
    @Payload('updateTagDto') updateTagDto: UpdateTagDto,
  ) {
    const updatedTag = await this.tagService.update(id, updateTagDto);

    return updatedTag;
  }

  @EventPattern(RMQ_MESSAGES.DELETE_TAG_BY_ID)
  async deleteById(@Payload('id') id: string): Promise<void> {
    await this.tagService.deleteById(id);
  }
}
