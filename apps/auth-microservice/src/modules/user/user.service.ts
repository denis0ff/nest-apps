import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserResponse } from './response';
import { MeetupResponse } from 'apps/meetup-microservice/src/modules/meetup/response';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async getUserMeetups(id: number): Promise<UserResponse> {
    return this.repository.getUserMeetups(id);
  }

  async subscribeToMeetup(
    userId: number,
    meetupId: number,
  ): Promise<MeetupResponse> {
    return await this.repository.subscribeToMeetup(userId, meetupId);
  }
}
