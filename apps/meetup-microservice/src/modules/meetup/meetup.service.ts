import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateMeetupDto, UpdateMeetupDto, GetMeetupDto } from './dto';
import { MeetupResponse } from './response';
import { MeetupRepository } from './meetup.repository';
import { ElasticMicroserviceService } from '../elastic/elastic.service';
import { GetMeetupByGeoDto } from './dto/get-meetup-by-geo.dto';
import { ElasticDto } from '../elastic/dto';

@Injectable()
export class MeetupService {
  constructor(
    private readonly repository: MeetupRepository,
    private readonly elasticSearch: ElasticMicroserviceService,
  ) {}

  public async createMeetup(
    userId: number,
    dto: CreateMeetupDto,
  ): Promise<MeetupResponse | string> {
    await this.checkAdminRole(userId);

    const result = await this.repository.createMeetup(userId, dto);

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

  public async deleteMeetup(
    userId: number,
    id: number,
  ): Promise<MeetupResponse | string> {
    await this.checkAdminRole(userId);
    await this.findMeetupById(+id);
    await this.checkOwner(userId, id);

    const result = await this.repository.deleteMeetup(id);

    return result;
  }

  public async updateMeetup(
    userId: number,
    id: number,
    dto: UpdateMeetupDto,
  ): Promise<MeetupResponse | string> {
    await this.checkAdminRole(userId);
    await this.checkOwner(userId, id);
    await this.findMeetupById(id);

    const result = await this.repository.updateMeetup(id, dto);

    return result;
  }

  public async findMeetupById(id: number): Promise<MeetupResponse> {
    const meetup = await this.repository.getMeetupById(id);

    if (!meetup) {
      throw new BadRequestException('No meetup with this id');
    }

    return meetup;
  }

  public async checkAdminRole(userId: number): Promise<void> {
    const { role } = await this.repository.getUserRole(userId);

    if (role != 'ADMIN') {
      throw new HttpException('Access denied', 403);
    }
  }

  public async checkOwner(userId: number, id: number): Promise<void> {
    const { ownerId } = await this.repository.getMeetupOwnerId(id);

    if (userId != ownerId) {
      throw new HttpException('Access denied!', 403);
    }
  }
}
