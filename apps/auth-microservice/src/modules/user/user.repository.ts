import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { Meetups } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async getUserMeetups(id: number) {
    return this.prisma.users.findUnique({
      where: { id },
      include: { followedMeetups: true, createdMeetups: true },
    });
  }

  public async subscribeToMeetup(
    userId: number,
    meetupId: number,
  ): Promise<Meetups> {
    try {
      await this.prisma.users.update({
        where: { id: userId },
        data: {
          followedMeetups: { connect: { id: meetupId } },
        },
      });

      return this.prisma.meetups.findUnique({ where: { id: meetupId } });
    } catch {
      throw new BadRequestException('Invalid input data');
    }
  }
}
