import { MeetupResponse } from '../meetups/response';

export interface MeetupSearchPayload {
  hits: {
    total: number;
    hits: Array<{
      _source: MeetupResponse;
    }>;
  };
}
