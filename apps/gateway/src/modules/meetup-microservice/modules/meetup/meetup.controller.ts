import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  ParseFloatPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupDto, GetMeetupDto, UpdateMeetupDto } from './dto';
import { MeetupResponse } from './response';
import { GetUserId } from '../../../auth-microservice/modules/auth/decorators';

@Controller('meetup')
export class MeetupController {
  constructor(private readonly meetupsService: MeetupService) {}

  @Get('list')
  public async getAllMeetups(
    @Body() dto: GetMeetupDto,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.getAllMeetups(dto);
  }

  @Get('position')
  public async getMeetupByGeo(
    @Query('long', ParseFloatPipe) long: number,
    @Query('lat', ParseFloatPipe) lat: number,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.getMeetupByGeo({ long, lat });
  }

  @Get(':id')
  public async getMeetupById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.getMeetupById(id);
  }

  @Post()
  public async createMeetup(
    @GetUserId() userId: number,
    @Body() dto: CreateMeetupDto,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.createMeetup(userId, dto);
  }

  @Patch(':id')
  public async updateMeetup(
    @GetUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMeetupDto,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.updateMeetup(userId, id, dto);
  }

  @Delete(':id')
  public async deleteMeetup(
    @GetUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.deleteMeetup(userId, id);
  }

  @Get('csv')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename=meetups.csv')
  public async reportCSV() {
    return this.meetupsService.reportCSV();
  }

  @Get('pdf')
  @Header('Content-Type', 'text/pdf')
  @Header('Content-Disposition', 'attachment; filename=meetups.pdf')
  public async reportPDF() {
    return this.meetupsService.reportPDF();
  }
}
