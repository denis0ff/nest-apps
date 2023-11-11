import { BadRequestException, Injectable } from '@nestjs/common';
import { MeetupRepository } from './meetup.repository';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { TagService } from '../tag/tag.service';
import { UpdateMeetupDto } from './dto/update-meetup.dto';

@Injectable()
export class MeetupService {
  constructor(
    private readonly meetupRepository: MeetupRepository,
    private readonly tagService: TagService,
  ) {}

  async readAll() {
    const meetups = await this.meetupRepository.readAll();

    return meetups;
  }

  async readById(id: string) {
    const meetup = await this.meetupRepository.readById(id);

    return meetup;
  }

  async create(newMeetup: CreateMeetupDto) {
    const resolvedMeetupData = await this._checkExistingTags(newMeetup);

    const createdMeetup =
      await this.meetupRepository.create(resolvedMeetupData);

    return createdMeetup;
  }

  async update(id: string, newMeetup: UpdateMeetupDto) {
    const existingMeetup = await this.meetupRepository.readById(id);

    if (!existingMeetup) {
      throw new BadRequestException(`The specified meetup does not exist`);
    }

    const resolvedMeetupData = await this._checkExistingTags(newMeetup);

    const updatedMeetup = await this.meetupRepository.update(
      id,
      resolvedMeetupData,
    );

    return updatedMeetup;
  }

  async deleteById(id: string) {
    const existingMeetup = await this.meetupRepository.readById(id);
    if (!existingMeetup) {
      throw new BadRequestException(`The specified meetup does not exist`);
    }

    await this.meetupRepository.deleteById(id);
  }

  private async _checkExistingTags<
    T extends CreateMeetupDto | UpdateMeetupDto,
  >({ tags: newTags, ...meetupData }: T) {
    const tags = await Promise.all(
      newTags.map(async (title) => {
        let tag = await this.tagService.readByTitle(title);
        if (!tag) {
          tag = await this.tagService.create({ title });
        }
        return tag;
      }),
    );

    return { tags, ...meetupData };
  }
}
