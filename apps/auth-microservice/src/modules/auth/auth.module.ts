import { Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { JwtTokensService } from './jwt.tokens.service';
import { PrismaModule } from '@app/common/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig, RmqModule } from '@app/common';
import { UserMicroserviceModule } from '../user/user.module';
import { AccessJWTStrategy, RefreshJWTStrategy } from './strategies';
import { UploadMicroserviceModule } from '../upload/upload.module';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    RmqModule,
    UserMicroserviceModule,
    UploadMicroserviceModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    JwtTokensService,
    RefreshJWTStrategy,
    AccessJWTStrategy,
    Logger,
  ],
  exports: [AuthRepository, JwtTokensService, Logger],
})
export class AuthMicroserviceModule {}
