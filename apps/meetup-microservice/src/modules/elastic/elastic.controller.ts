import { RmqMessages } from '@app/common';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ElasticMicroserviceService } from './elastic.service';

@Controller()
export class ElasticMicroserviceController {
  constructor(private readonly elasticService: ElasticMicroserviceService) {}

  @EventPattern(RmqMessages.ELASTIC_SEARCH)
  public async elasticSearch(@Payload('searchString') searchString: string) {
    return this.elasticService.searchMeetups(searchString);
  }
}
