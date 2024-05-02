import { RmqMessages } from '@app/common';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ElasticDto } from './dto';
import { ElasticMicroserviceService } from './elastic.service';

@Controller()
export class ElasticMicroserviceController {
  constructor(private readonly elasticService: ElasticMicroserviceService) {}

  @EventPattern(RmqMessages.ELASTIC_SEARCH)
  public async elasticSearch(@Payload('dto') dto: ElasticDto) {
    return this.elasticService.searchMeetups(dto);
  }
}
