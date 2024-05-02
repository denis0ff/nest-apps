import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { MeetupResponse } from '../meetup/response';
import { ElasticDto } from './dto';
import { MeetupSearchPayload, MeetupSearchResult } from './types';

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
    const data = await this.elasticsearchService.search<
      MeetupSearchPayload,
      MeetupSearchResult
    >({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: searchString,
            fuzziness: 'auto',
          },
        },
      },
    });

    return {
      total: data.hits.hits.length,
      hits: data.hits.hits.map(({ _source }) => _source),
    };
  }
}
