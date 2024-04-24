import { appConfig } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccessJWTGuard } from 'apps/auth-microservice/src/modules/auth/guards';
import { AuthGatewayModule } from './modules/auth-microservice/modules/auth/auth.module';
import { UserGatewayModule } from './modules/auth-microservice/modules/user/user.module';
import { ElasticGatewayModule } from './modules/meetup-microservice/modules/elastic/elastic.module';
import { MeetupGatewayModule } from './modules/meetup-microservice/modules/meetup/meetup.module';
import { ReportGatewayModule } from './modules/meetup-microservice/modules/report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    MeetupGatewayModule,
    AuthGatewayModule,
    UserGatewayModule,
    ReportGatewayModule,
    ElasticGatewayModule,
  ],
  providers: [
    AccessJWTGuard,
    {
      provide: APP_GUARD,
      useClass: AccessJWTGuard,
    },
  ],
})
export class GatewayModule {}
