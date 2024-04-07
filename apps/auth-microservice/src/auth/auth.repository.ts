import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { Users } from '@prisma/client';
import { AuthDto } from './dto';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findUser({ username }: AuthDto): Promise<Users> {
    return this.prisma.users.findUnique({
      where: { username },
    });
  }

  public async findGoogleUser(username: string): Promise<Users> {
    return this.prisma.users.findUnique({ where: { username } });
  }

  public async createNewUser(
    { username }: AuthDto,
    password: string,
  ): Promise<Users> {
    return this.prisma.users.create({
      data: { username, password },
    });
  }

  public async logout(id: number): Promise<boolean> {
    await this.prisma.users.updateMany({
      where: {
        id,
        hashedRefreshToken: { not: null },
      },
      data: {
        hashedRefreshToken: null,
      },
    });

    return true;
  }

  public async findUserById(id: number): Promise<Users> {
    return this.prisma.users.findUnique({ where: { id } });
  }

  public async updateRefreshTokenHash(
    id: number,
    hashedRefreshToken: string,
  ): Promise<Users> {
    return this.prisma.users.update({
      where: {
        id,
      },
      data: {
        hashedRefreshToken,
      },
    });
  }
}
