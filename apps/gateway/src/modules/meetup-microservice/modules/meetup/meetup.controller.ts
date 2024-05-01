import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpStatus,
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
import { AccessDenied, ApiMeetup } from '@app/common/swagger';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';


@ApiTags('Meetup API')
@Controller('meetup')
export class MeetupController {
  constructor(private readonly meetupsService: MeetupService) {}

  @Get('list')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all meetups' })
  @ApiMeetup()
  @CacheKey('meetups_all')
  @CacheTTL(300)
  public async getAllMeetups(
    @Query() dto: GetMeetupDto,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.getAllMeetups(dto);
  }

  @Get('position')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get meetups by geolocation' })
  @ApiMeetup()
  @CacheKey('meetups_pos')
  public async getMeetupByGeo(
    @Query('long', ParseFloatPipe) long: number,
    @Query('lat', ParseFloatPipe) lat: number,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.getMeetupByGeo({ long, lat });
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiExtraModels(MeetupResponse)
  @ApiOperation({ summary: 'Get meetup by id' })
  @ApiMeetup()
  @CacheKey('meetup_id')
  public async getMeetupById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.getMeetupById(id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiExtraModels(MeetupResponse)
  @ApiOperation({ summary: 'Create new meetup' })
  @ApiMeetup()
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Access denied',
    schema: {
      $ref: getSchemaPath(AccessDenied),
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Meetup successfully created',
    schema: {
      $ref: getSchemaPath(MeetupResponse),
    },
  })
  public async createMeetup(
    @GetUserId() userId: number,
    @Body() dto: CreateMeetupDto,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.createMeetup(userId, dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update meetup' })
  @ApiMeetup()
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Access denied',
    type: AccessDenied,
    schema: {
      $ref: getSchemaPath(AccessDenied),
    },
  })
  public async updateMeetup(
    @GetUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMeetupDto,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.updateMeetup(userId, id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete meetup' })
  @ApiMeetup()
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Access denied',
    schema: {
      $ref: getSchemaPath(AccessDenied),
    },
  })
  public async deleteMeetup(
    @GetUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MeetupResponse | string> {
    return this.meetupsService.deleteMeetup(userId, id);
  }
}
