import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { MeetupData } from './types';

@Injectable()
export class MeetupRepository {
  constructor(private readonly prisma: PrismaService) {}

  async readAll() {
    const meetups = await this.prisma.meetups.findMany({
      include: { tags: { select: { tag: true } } },
    });

    return meetups;
  }

  async readById(id: string) {
    const meetup = await this.prisma.meetups.findUnique({
      where: { id: Number(id) },
      include: { tags: { select: { tag: true } } },
    });

    return meetup;
  }

  async create({ tags, ...meetupData }: MeetupData<CreateMeetupDto>) {
    const createdMeetup = await this.prisma.meetups.create({
      data: {
        ...meetupData,
        ownerId: 1, // TODO заменить
        tags: {
          create: tags.map(({ id }) => ({
            tag: { connect: { id: Number(id) } },
          })),
        },
      },

      include: { tags: { select: { tag: true } } },
    });

    return createdMeetup;
  }

  async update(
    id: string,
    { tags, ...meetupData }: MeetupData<UpdateMeetupDto>,
  ) {
    const updatedMeetup = await this.prisma.meetups.update({
      where: { id: Number(id) },
      data: {
        ...meetupData,
        ownerId: 1, // TODO заменить
        tags: {
          deleteMany: { meetupId: Number(id) },
          create: tags.map(({ id }) => ({
            tag: { connect: { id: Number(id) } },
          })),
        },
      },
      include: { tags: { select: { tag: true } } },
    });

    return updatedMeetup;
  }

  async deleteById(id: string) {
    await this.prisma.meetups.update({
      where: { id: Number(id) },
      data: {
        tags: {
          deleteMany: { meetupId: Number(id) },
        },
      },
    });

    await this.prisma.meetups.delete({
      where: { id: Number(id) },
    });
  }
}
