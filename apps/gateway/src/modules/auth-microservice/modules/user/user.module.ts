import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule, RmqModule } from '@app/common';

@Module({
  imports: [PrismaModule, RmqModule.register({ serviceName: 'AUTH' })],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserGatewayModule],
})
export class UserGatewayModule {}
