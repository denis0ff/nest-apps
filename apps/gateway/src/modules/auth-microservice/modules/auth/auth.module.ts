import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { appConfig, PrismaModule, RmqModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { UserGatewayModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './strategies';
import { AuthMicroserviceModule } from 'apps/auth-microservice/src/modules/auth/auth.module';
import { AuthRepository } from 'apps/auth-microservice/src/modules/auth/auth.repository';
import { JwtTokensService } from 'apps/auth-microservice/src/modules/auth/jwt.tokens.service';

@Module({
  imports: [
    RmqModule.register({ serviceName: 'AUTH' }),
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    PrismaModule,
    AuthMicroserviceModule,
    JwtModule.register({}),
    UserGatewayModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    AuthRepository,
    JwtTokensService,
    GoogleStrategy,
  ],
})
export class AuthGatewayModule {}
