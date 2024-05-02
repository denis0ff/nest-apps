import { Module } from '@nestjs/common';
import { ElasticMicroserviceController } from './elastic.controller';
import { ElasticMicroserviceService } from './elastic.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { HttpConnection } from '@elastic/elasticsearch';

@Module({
  imports: [
    ConfigModule,
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ES_NODE'),
        auth: {
          username: configService.get('ES_USERNAME'),
          password: configService.get('ES_PASSWORD'),
        },
        Connection: HttpConnection,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ElasticMicroserviceController],
  providers: [ElasticMicroserviceService],
  exports: [ElasticsearchModule, ElasticMicroserviceService],
})
export class ElasticMicroserviceModule {}
