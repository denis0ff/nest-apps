import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async readAll() {
    const tags = await this.prisma.tags.findMany();

    return tags;
  }

  async readById(id: string) {
    const tag = await this.prisma.tags.findUnique({
      where: { id: Number(id) },
    });

    return tag;
  }

  async create(createTagDto: CreateTagDto) {
    const createdTag = await this.prisma.tags.create({
      data: createTagDto,
    });

    return createdTag;
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const updatedTag = await this.prisma.tags.update({
      where: { id: Number(id) },
      data: updateTagDto,
    });

    return updatedTag;
  }

  async deleteById(id: string) {
    await this.prisma.tags.delete({
      where: { id: Number(id) },
    });
  }
}
