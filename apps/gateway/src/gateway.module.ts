import { appConfig } from "@app/common";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AccessJWTGuard } from "apps/auth-microservice/src/modules/auth/guards";
import { MeetupMicroserviceModule } from "./meetup-microservice/meetup-microservice.module";
import { AuthGatewayModule } from "./modules/auth-microservice/modules/auth/auth.module";
import { UserGatewayModule } from "./modules/auth-microservice/modules/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    AuthGatewayModule,
    UserGatewayModule,
    MeetupMicroserviceModule
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
