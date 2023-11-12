import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { JoiValidationPipe } from '@app/common';
import { CreateTagSchema } from './schemas/create-tag.schema';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { UpdateTagSchema } from './schemas/update-tag.schema';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async readAll() {
    const tags = await this.tagService.readAll();

    return tags;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async readById(@Param('id') id: string) {
    const tag = await this.tagService.readById(id);

    return tag;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new JoiValidationPipe(CreateTagSchema)) createTagDto: CreateTagDto,
  ) {
    const createdTag = await this.tagService.create(createTagDto);

    return createdTag;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body(new JoiValidationPipe(UpdateTagSchema)) updateTagDto: UpdateTagDto,
  ) {
    const updatedTag = await this.tagService.update(id, updateTagDto);

    return updatedTag;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id') id: string) {
    await this.tagService.deleteById(id);
  }
}
