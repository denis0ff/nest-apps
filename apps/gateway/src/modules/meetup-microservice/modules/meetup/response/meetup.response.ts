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
