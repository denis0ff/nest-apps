import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { RmqModule } from '@app/common';
import { PrismaModule } from '@app/common/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AccessJWTGuard } from '../auth/guards';

@Module({
  imports: [
    RmqModule,
    PrismaModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    AccessJWTGuard,
    {
      provide: APP_GUARD,
      useClass: AccessJWTGuard,
    },
  ],
  exports: [UserMicroserviceModule],
})
export class UserMicroserviceModule {}
