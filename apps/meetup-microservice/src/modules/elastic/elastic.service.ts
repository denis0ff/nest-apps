import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { MeetupResponse } from '../meetup/response';
import { ElasticDto } from './dto';
import { MeetupSearchPayload } from './types';

@Injectable()
export class ElasticMicroserviceService {
  index = 'meetup';
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  public async indexMeetups(meetup: MeetupResponse) {
    return this.elasticsearchService.index<MeetupResponse>({
      index: this.index,
      body: { ...meetup },
    });
  }

  public async searchMeetups({ searchString }: ElasticDto) {
    const {
      hits: { hits },
    } = await this.elasticsearchService.search<MeetupSearchPayload>({
      index: this.index,
      body: {
        query: {
          match: {
            name: searchString,
          },
        },
      },
    });

    return hits.map((item) => item._source);
  }
}
