import { Module } from '@nestjs/common';
import { MeetupModule } from './modules/meetup/meetup.module';
import { TagModule } from './modules/tag/tag.module';

@Module({
  imports: [MeetupModule, TagModule],
  controllers: [],
  providers: [],
})
export class MeetupMicroservice {}
