import { Injectable } from '@nestjs/common';
import { CreateMeetupDto, GetMeetupDto, UpdateMeetupDto } from './dto';
import { Prisma } from '@prisma/client';
import { MeetupResponse } from './response';
import { PrismaService } from '@app/common';
import { GetMeetupByGeoDto } from './dto/get-meetup-by-geo.dto';
import { UserResponse } from 'apps/auth-microservice/src/modules/user/response';

@Injectable()
export class MeetupRepository {
  constructor(private readonly prisma: PrismaService) {}

  // TO DO исправить типизацию
  public async getMeetupById(id: any): Promise<MeetupResponse> {
    return this.prisma.meetup.findUnique({ where: { id: id } });
  }

  public async getAllMeetupsReport(): Promise<MeetupResponse[]> {
    return this.prisma.meetup.findMany();
  }

  public async getAllMeetups(dto: GetMeetupDto): Promise<MeetupResponse[]> {
    const where: Prisma.MeetupWhereInput = {
      title: { contains: dto?.title },
      date: {
        gte: dto.from ? new Date(dto.from) : undefined,
        lte: dto.to ? new Date(dto.to) : undefined,
      },
    };

    const query: Prisma.MeetupFindManyArgs = {
      where,
      orderBy: {
        date: dto.sort,
      },
      take: dto?.limit || 10,
      skip: (dto?.page - 1) * dto?.limit || undefined,
    };

    return this.prisma.meetup.findMany(query);
  }

  public async getMeetupByGeo(
    dto: GetMeetupByGeoDto,
  ): Promise<MeetupResponse[]> {
    const meetups = await this.prisma.meetup.findMany({
      where: {
        AND: {
          long: {
            gte: dto.long - 0.1,
            lte: dto.long + 0.1,
          },
          lat: {
            gte: dto.lat - 0.1,
            lte: dto.lat + 0.1,
          },
        },
      },
    });

    return meetups;
  }

  public async createMeetup(
    userId: number,
    dto: CreateMeetupDto,
  ): Promise<MeetupResponse> {
    return this.prisma.meetup.create({
      data: { ...dto, ownerId: userId },
    });
  }

  public async deleteMeetup(id: number): Promise<MeetupResponse> {
    return this.prisma.meetup.delete({ where: { id: id } });
  }

  public async updateMeetup(
    id: number,
    dto: UpdateMeetupDto,
  ): Promise<MeetupResponse> {
    return this.prisma.meetup.update({ where: { id: id }, data: dto });
  }

  public async getUserRole(userId: number): Promise<UserResponse> {
    return this.prisma.users.findUnique({
      where: { id: userId },
    });
  }

  public async getMeetupOwnerId(ownerId: number): Promise<MeetupResponse> {
    return this.prisma.meetup.findUnique({
      where: { id: ownerId },
    });
  }
}
