import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { clientRmqOptions, jwtConfig } from '@app/common';

@Module({
  imports: [
    ClientsModule.register([clientRmqOptions]),
    PassportModule,
    JwtModule.register(jwtConfig),
  ],
  providers: [JwtStrategy, UserService],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
