import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async readAll() {
    const users = await this.prisma.users.findMany({
      select: {
        id: true,
        username: true,
      },
    });

    return users;
  }

  async readById(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { id: Number(id) },
      select: { id: true, username: true },
    });

    return user;
  }

  async readByUsername(username: string) {
    const user = await this.prisma.users.findUnique({
      where: { username },
      select: { id: true, username: true, password: true },
    });

    return user;
  }

  async create({ username, password }: CreateUserDto) {
    const createdUser = await this.prisma.users.create({
      data: { username, password },
      select: { id: true, username: true },
    });

    return createdUser;
  }

  async deleteById(id: string) {
    await this.prisma.users.delete({ where: { id: Number(id) } });
  }
}
