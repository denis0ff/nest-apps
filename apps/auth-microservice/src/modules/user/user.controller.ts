import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponse } from './response';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RmqMessages } from '@app/common';
import { MeetupResponse } from 'apps/meetup-microservice/src/modules/meetup/response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(RmqMessages.GET_USER_BY_ID)
  public async getUserMeetups(
    @Payload('id') id: number,
  ): Promise<UserResponse> {
    return this.userService.getUserMeetups(id);
  }

  @MessagePattern(RmqMessages.SUBSCRIBE_TO_MEETUP)
  public async subscribeToMeetup(
    @Payload('userId') userId: number,
    @Payload('meetupId') meetupId: number,
  ): Promise<MeetupResponse> {
    return this.userService.subscribeToMeetup(userId, meetupId);
  }
}
