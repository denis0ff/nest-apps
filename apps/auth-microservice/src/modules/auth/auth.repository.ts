import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { User } from '@prisma/client';
import { AuthDto } from './dto';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  SERVICE: string = AuthRepository.name;

  public async findUser({ username }: AuthDto): Promise<User> {
    try {
      return this.prisma.user.findUnique({
        where: { username },
      });
    } catch (e) {
      this.logger.error('Unable to find user', e, this.SERVICE);
      throw e;
    }
  }

  public async findGoogleUser(username: string): Promise<User> {
    try {
      return this.prisma.user.findUnique({ where: { username } });
    } catch (e) {
      this.logger.error('Unable to find user', e, this.SERVICE);
      throw e;
    }
  }

  public async createNewUser(
    { username }: AuthDto,
    password: string,
  ): Promise<User> {
    try {
      return this.prisma.user.create({
        data: { username, password },
      });
    } catch (e) {
      this.logger.error('Unable to create user', e, this.SERVICE);
      throw e;
    }
  }

  public async logout(id: number): Promise<boolean> {
    try {
      await this.prisma.user.updateMany({
        where: {
          id,
          hashedRefreshToken: { not: null },
        },
        data: {
          hashedRefreshToken: null,
        },
      });

      return true;
    } catch (e) {
      this.logger.error('Unable to logout user', e, this.SERVICE);
      throw e;
    }
  }

  public async findUserById(id: number): Promise<User> {
    try {
      return this.prisma.user.findUnique({ where: { id } });
    } catch (e) {
      this.logger.error('Unable to find user', e, this.SERVICE);
      throw e;
    }
  }

  public async updateRefreshTokenHash(
    id: number,
    hashedRefreshToken: string,
  ): Promise<User> {
    try {
      return this.prisma.user.update({
        where: {
          id,
        },
        data: {
          hashedRefreshToken,
        },
      });
    } catch (e) {
      this.logger.error('Unable to update refresh token', e, this.SERVICE);
      throw e;
    }
  }
}
