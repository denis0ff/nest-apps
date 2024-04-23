export class MeetupResponse {
  id: number;
  title: string;
  description: string;
  place: string;
  date: Date;
  long: number;
  lat: number;
  tags: string[];
  ownerId: number;
}

export class UserResponse {
  id: number;
  username: string;
  password: string;
  role: string;
  hashedRefreshToken: string;
  followedMeetups?: MeetupResponse[];
  createdMeetups?: MeetupResponse[];
}
