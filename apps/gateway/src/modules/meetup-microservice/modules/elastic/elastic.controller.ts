import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { ElasticGatewayService } from './elastic.service';

@SkipThrottle()
@ApiTags('Elastic API')
@Controller('elastic')
export class ElasticGatewayController {
  constructor(private readonly elasticService: ElasticGatewayService) {}

  @Get()
  @CacheKey('meetup_all')
  @CacheTTL(300)
  public async elasticSearch(@Query('searchString') searchString: string) {
    return this.elasticService.searchMeetups({ searchString });
  }
}
