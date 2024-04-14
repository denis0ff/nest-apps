import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { MeetupResponse } from '../meetup/response';
import { MeetupSearchPayload } from './types';

@Injectable()
export class ElasticMicroserviceService {
  index = 'meetups';
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  public async indexMeetups(meetup: MeetupResponse) {
    return this.elasticsearchService.index<MeetupResponse>({
      index: this.index,
      body: { ...meetup },
    });
  }

  public async searchMeetups(query: string) {
    const {
      hits: { hits },
    } = await this.elasticsearchService.search<MeetupSearchPayload>({
      index: this.index,
      body: {
        query: {
          match: {
            name: query,
          },
        },
      },
    });

    return hits.map((item) => item._source);
  }
}
