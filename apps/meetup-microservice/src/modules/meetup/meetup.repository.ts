import { Injectable, Logger } from '@nestjs/common';
import { CreateMeetupDto, GetMeetupDto, UpdateMeetupDto } from './dto';
import { Prisma } from '@prisma/client';
import { MeetupResponse } from './response';
import { PrismaService } from '@app/common';
import { GetMeetupByGeoDto } from './dto/get-meetup-by-geo.dto';
import { UserResponse } from 'apps/auth-microservice/src/modules/user/response';

@Injectable()
export class MeetupRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  SERVICE: string = MeetupRepository.name;

  // TO DO исправить типизацию
  public async getMeetupById(id: number): Promise<MeetupResponse> {
    return this.prisma.meetup.findUnique({ where: { id: id } });
  }

  public async getAllMeetupsReport(): Promise<MeetupResponse[]> {
    return this.prisma.meetup.findMany();
  }

  public async getAllMeetups(dto: GetMeetupDto): Promise<MeetupResponse[]> {
    try {
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
        take: +dto?.limit || undefined,
        skip: (dto?.page - 1) * dto?.limit || undefined,
      };

      return this.prisma.meetup.findMany(query);
    } catch (e) {
      this.logger.error('Unable to get meetup list', e, this.SERVICE);
      throw e;
    }
  }

  public async getMeetupByGeo(
    dto: GetMeetupByGeoDto,
  ): Promise<MeetupResponse[]> {
    try {
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
    } catch (e) {
      this.logger.error('Unable to get meetup by geoposition', e, this.SERVICE);
      throw e;
    }
  }

  public async createMeetup(
    userId: number,
    dto: CreateMeetupDto,
  ): Promise<MeetupResponse> {
    try {
      return this.prisma.meetup.create({
        data: { ...dto, ownerId: userId },
      });
    } catch (e) {
      this.logger.error('Unable to create meetup', e, this.SERVICE);
      throw e;
    }
  }

  public async deleteMeetup(id: number): Promise<MeetupResponse> {
    try {
      return this.prisma.meetup.delete({ where: { id: id } });
    } catch (e) {
      this.logger.error('Unable to remove meetup', e, this.SERVICE);
      throw e;
    }
  }

  public async updateMeetup(
    id: number,
    dto: UpdateMeetupDto,
  ): Promise<MeetupResponse> {
    try {
      return this.prisma.meetup.update({ where: { id: id }, data: dto });
    } catch (e) {
      this.logger.error('Unable to update meetup', e, this.SERVICE);
      throw e;
    }
  }

  public async getUserRole(userId: number): Promise<UserResponse> {
    try {
      return this.prisma.user.findUnique({
        where: { id: userId },
      });
    } catch (e) {
      this.logger.error('Unable to get user role', e, this.SERVICE);
      throw e;
    }
  }

  public async getMeetupOwnerId(ownerId: number): Promise<MeetupResponse> {
    try {
      return this.prisma.meetup.findUnique({
        where: { id: ownerId },
      });
    } catch (e) {
      this.logger.error('Unable to get meetup by ownerId', e, this.SERVICE);
      throw e;
    }
  }
}
