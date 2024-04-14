import { MeetupResponse } from '../meetup/response';

export interface MeetupSearchPayload {
  hits: {
    total: number;
    hits: Array<{
      _source: MeetupResponse;
    }>;
  };
}
