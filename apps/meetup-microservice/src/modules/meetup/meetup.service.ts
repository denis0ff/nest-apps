import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateMeetupDto, UpdateMeetupDto, GetMeetupDto } from './dto';
import { MeetupResponse } from './response';
import { MeetupRepository } from './meetup.repository';
import { ElasticMicroserviceService } from '../elastic/elastic.service';
import { GetMeetupByGeoDto } from './dto/get-meetup-by-geo.dto';

@Injectable()
export class MeetupService {
  constructor(
    private readonly repository: MeetupRepository,
    private readonly elasticSearch: ElasticMicroserviceService,
  ) {}

  public async createAMeetup(
    userId: number,
    dto: CreateMeetupDto,
  ): Promise<MeetupResponse | string> {
    await this.getUserRole(userId);

    const result = await this.repository.createAMeetup(userId, dto);

    await this.elasticSearch.indexMeetups(result);

    return result;
  }

  public async getAllMeetups(
    dto: GetMeetupDto,
  ): Promise<MeetupResponse[] | string> {
    const result = await this.repository.getAllMeetups(dto);

    return result;
  }

  public async getMeetupByGeo(dto: GetMeetupByGeoDto) {
    const result = await this.repository.getMeetupByGeo(dto);

    return result;
  }

  public async getMeetupById(id: number): Promise<MeetupResponse | string> {
    const result = await this.findMeetupById(id);

    return result;
  }

  public async deleteMeetupById(
    userId: number,
    id: number,
  ): Promise<MeetupResponse | string> {
    await this.getUserRole(userId);
    await this.findMeetupById(+id);
    await this.compareUserIdAndMeetupId(userId, id);

    const result = await this.repository.deleteMeetupById(id);

    return result;
  }

  public async changeInfoInMeetup(
    userId: number,
    id: number,
    dto: UpdateMeetupDto,
  ): Promise<MeetupResponse | string> {
    await this.getUserRole(userId);
    await this.compareUserIdAndMeetupId(userId, id);
    await this.findMeetupById(id);

    const result = await this.repository.changeInfoInMeetup(id, dto);

    return result;
  }

  public async findMeetupById(id: number): Promise<MeetupResponse> {
    const meetup = await this.repository.getMeetupById(id);

    if (!meetup) {
      throw new BadRequestException('No meetup with this id');
    }

    return meetup;
  }

  public async searchForPosts(text: string) {
    const results = await this.elasticSearch.searchMeetups(text);
    const idList = results.map((result) => result);

    if (!idList.length) {
      return [];
    }

    return this.repository.getMeetupById(idList);
  }

  public async getUserRole(userId: number): Promise<void> {
    const userRole = await this.repository.getUserRole(userId);

    if (userRole.role != 'ADMIN') {
      throw new HttpException('Access denied', 403);
    }
  }

  public async compareUserIdAndMeetupId(
    userId: number,
    id: number,
  ): Promise<void> {
    const meetupOwner = await this.repository.getMeetupOwnerId(id);

    if (userId != meetupOwner.ownerId) {
      throw new HttpException('Access denied!', 403);
    }
  }
}
