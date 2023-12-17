import { clientRmqOptionsMeetup } from '@app/common';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [ClientsModule.register([clientRmqOptionsMeetup])],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
