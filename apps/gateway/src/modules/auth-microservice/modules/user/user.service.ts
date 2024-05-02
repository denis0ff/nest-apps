import { Inject, Injectable } from '@nestjs/common';
import { UserResponse } from './response';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { MeetupResponse } from 'apps/meetup-microservice/src/modules/meetup/response';
import { RmqMessages } from '@app/common';

@Injectable()
export class UserService {
  constructor(@Inject('AUTH') private authClient: ClientProxy) {}

  public async getUserInfo(id: number): Promise<UserResponse> {
    return await lastValueFrom(
      this.authClient.send(RmqMessages.GET_USER_BY_ID, { id }),
    );
  }

  public async subscribeToMeetup(
    userId: number,
    meetupId: number,
  ): Promise<MeetupResponse> {
    return await lastValueFrom(
      this.authClient.send(RmqMessages.SUBSCRIBE_TO_MEETUP, {
        userId,
        meetupId,
      }),
    );
  }
}
