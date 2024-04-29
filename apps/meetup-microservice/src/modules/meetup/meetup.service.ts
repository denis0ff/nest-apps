import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
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
    private readonly logger: Logger,
  ) {}

  SERVICE: string = MeetupRepository.name;

  public async createMeetup(
    userId: number,
    dto: CreateMeetupDto,
  ): Promise<MeetupResponse | HttpException> {
    try {
      await this.checkAdminRole(userId);

      const result = await this.repository.createMeetup(userId, dto);

      await this.elasticSearch.indexMeetups(result);

      this.logger.log(
        `Meetup successfully created by user with id: ${userId} - ${JSON.stringify(
          dto,
        )}`,
        this.SERVICE,
      );

      return result;
    } catch (e: any) {
      this.logger.error('Unable to create meetup', e, this.SERVICE);

      if (e instanceof HttpException) {
        return e;
      }

      return new HttpException(
        `${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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

  public async getMeetupById(
    id: number,
  ): Promise<MeetupResponse | HttpException> {
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
  ): Promise<MeetupResponse | HttpException> {
    try {
      await this.checkAdminRole(userId);
      await this.checkOwner(userId, id);
      await this.findMeetupById(id);

      const result = await this.repository.updateMeetup(id, dto);

      this.logger.log(
        `Meetup with id: ${id} successfully updated by user with id: ${userId} - ${JSON.stringify(
          dto,
        )}`,
        this.SERVICE,
      );

      return result;
    } catch (e: any) {
      this.logger.error('Unable to update meetup', e, this.SERVICE);

      if (e instanceof HttpException) {
        return e;
      }

      return new HttpException(
        `${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findMeetupById(id: number) {
    try {
      const meetup = await this.repository.getMeetupById(id);

      if (!meetup) {
        throw new BadRequestException('No meetup with this id');
      }

      this.logger.log(
        `Meetup with id: ${id} successfully found - ${JSON.stringify(meetup)}`,
        this.SERVICE,
      );

      return meetup;
    } catch (e: any) {
      this.logger.error('Unable to find meetup', e, this.SERVICE);

      if (e instanceof HttpException) {
        return e;
      }

      return new HttpException(
        `${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async checkAdminRole(userId: number): Promise<void | HttpException> {
    const { role } = await this.repository.getUserRole(userId);

    if (role != 'ADMIN') {
      return new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }
  }

  public async checkOwner(
    userId: number,
    id: number,
  ): Promise<void | HttpException> {
    const { ownerId } = await this.repository.getMeetupOwnerId(id);

    if (userId != ownerId) {
      return new HttpException('Access denied!', HttpStatus.FORBIDDEN);
    }
  }
}
