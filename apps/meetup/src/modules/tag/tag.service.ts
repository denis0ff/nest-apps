import { BadRequestException, Injectable } from '@nestjs/common';
import { TagRepository } from './tag.repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async readAll() {
    const tags = await this.tagRepository.readAll();

    return tags;
  }

  async readById(id: string) {
    const tag = await this.tagRepository.readById(id);

    return tag;
  }

  async readByTitle(title: string) {
    const tag = await this.tagRepository.readByTitle(title);
    return tag;
  }

  async create(createTagDto: CreateTagDto) {
    const createdTag = await this.tagRepository.create(createTagDto);

    return createdTag;
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const existingTag = await this.tagRepository.readById(id);

    if (!existingTag) {
      throw new BadRequestException(`Such tag does not exist`);
    }

    const updatedTag = await this.tagRepository.update(id, updateTagDto);

    return updatedTag;
  }

  async deleteById(id: string) {
    const existingTag = await this.tagRepository.readById(id);

    if (!existingTag) {
      throw new BadRequestException(`Such tag does not exist`);
    }

    await this.tagRepository.deleteById(id);
  }
}
