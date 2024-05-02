import { appConfig } from '@app/common';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AccessJWTGuard } from 'apps/auth-microservice/src/modules/auth/guards';
import { redisStore } from 'cache-manager-redis-yet';
import { AuthGatewayModule } from './modules/auth-microservice/modules/auth/auth.module';
import { UploadGatewayModule } from './modules/auth-microservice/modules/upload/upload.module';
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
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        isGlobal: true,
        store: redisStore,
        url: configService.get('REDIS_URL'),
        ttl: 600,
        max: 15,
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    MeetupGatewayModule,
    AuthGatewayModule,
    UserGatewayModule,
    ReportGatewayModule,
    ElasticGatewayModule,
    UploadGatewayModule,
  ],
  providers: [
    AccessJWTGuard,
    {
      provide: APP_GUARD,
      useClass: AccessJWTGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class GatewayModule {}
