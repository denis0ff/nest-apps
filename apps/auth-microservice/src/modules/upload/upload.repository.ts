import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async addImageToUser(userId: number, fileBuffer: Buffer) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { image: fileBuffer },
    });
  }
}
