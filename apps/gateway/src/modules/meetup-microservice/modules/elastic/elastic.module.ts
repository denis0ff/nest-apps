import { Module } from '@nestjs/common';
import { ElasticGatewayController } from './elastic.controller';
import { ElasticGatewayService } from './elastic.service';
import { RmqModule } from '@app/common';

@Module({
  imports: [RmqModule.register({ serviceName: 'MEETUP' })],
  controllers: [ElasticGatewayController],
  providers: [ElasticGatewayService],
})
export class ElasticGatewayModule {}
