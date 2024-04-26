import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ElasticGatewayService } from './elastic.service';

@ApiTags('Elastic API')
@Controller('elastic')
export class ElasticGatewayController {
  constructor(private readonly elasticService: ElasticGatewayService) {}

  @Get()
  public async elasticSearch(@Query('searchString') searchString: string) {
    return this.elasticService.searchMeetups({ searchString });
  }
}
