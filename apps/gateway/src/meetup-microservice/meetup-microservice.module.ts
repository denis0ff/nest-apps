import { Module } from '@nestjs/common';
import { TagModule } from './tag/tag.module';
import { MeetupModule } from './meetup/meetup.module';

@Module({
  imports: [MeetupModule, TagModule],
})
export class MeetupMicroserviceModule {}
