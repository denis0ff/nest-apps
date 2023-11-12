import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';

export type MeetupData<T extends CreateMeetupDto | UpdateMeetupDto> = Omit<
  T,
  'tags'
> & {
  tags: { id: number; title: string }[];
};
