import { MeetupResponse } from 'apps/meetup-microservice/src/modules/meetup/response';

export class UserResponse {
  id: number;
  username: string;
  password: string;
  role: string;
  hashedRefreshToken: string;
  followedMeetups?: MeetupResponse[];
  createdMeetups?: MeetupResponse[];
  image: Buffer;
}
