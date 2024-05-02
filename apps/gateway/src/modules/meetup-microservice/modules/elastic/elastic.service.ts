import { RmqMessages } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ElasticDto } from './dto';

@Injectable()
export class ElasticGatewayService {
  constructor(@Inject('MEETUP') private meetupClient: ClientProxy) {}

  public async searchMeetups(dto: ElasticDto) {
    return await lastValueFrom(
      this.meetupClient.send(RmqMessages.ELASTIC_SEARCH, { dto }),
    );
  }
}
