import { Module } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { MeetupController } from './meetup.controller';
import { MeetupRepository } from './meetup.repository';
import { PrismaModule, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ReportMicroserviceModule } from '../report/report.module';
import { ElasticMicroserviceModule } from '../elastic/elastic.module';
import { ElasticMicroserviceService } from '../elastic/elastic.service';
import { UserMicroserviceModule } from 'apps/auth-microservice/src/modules/user/user.module';
import { AccessJWTGuard } from 'apps/auth-microservice/src/modules/auth/guards';
import { AuthMicroserviceModule } from 'apps/auth-microservice/src/modules/auth/auth.module';
import { Logger } from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    PrismaModule,
    RmqModule,
    AuthMicroserviceModule,
    UserMicroserviceModule,
    ReportMicroserviceModule,
    ElasticMicroserviceModule,
  ],
  controllers: [MeetupController],
  providers: [
    MeetupService,
    MeetupRepository,
    ElasticMicroserviceService,
    AccessJWTGuard,
    {
      provide: APP_GUARD,
      useClass: AccessJWTGuard,
    },
    Logger,
  ],
  exports: [Logger],
})
export class MeetupMicroserviceModule {}
