import { Controller, Get, Query } from '@nestjs/common';
import { ElasticGatewayService } from './elastic.service';

@Controller('elastic')
export class ElasticGatewayController {
  constructor(private readonly elasticService: ElasticGatewayService) {}

  @Get()
  public async elasticSearch(@Query('searchString') searchString: string) {
    return this.elasticService.searchMeetups({ searchString });
  }
}
