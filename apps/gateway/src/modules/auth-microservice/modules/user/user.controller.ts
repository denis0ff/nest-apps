import { BadRequestError, UnauthorizedError } from '@app/common/swagger';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { GetUserId } from '../auth/decorators';
import { MeetupResponse, UserResponse } from './response';
import { UserService } from './user.service';

@ApiTags('User API')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user info' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: UserResponse,
    schema: {
      $ref: getSchemaPath(UserResponse),
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    schema: {
      $ref: getSchemaPath(BadRequestError),
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      $ref: getSchemaPath(UnauthorizedError),
    },
  })
  @CacheKey('user_info')
  @CacheTTL(300)
  getUserInfo(@GetUserId(ParseIntPipe) userId: number): Promise<UserResponse> {
    return this.usersService.getUserInfo(userId);
  }

  @Post('subscribe/:meetupId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Subscribe to meetup' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    schema: {
      $ref: getSchemaPath(MeetupResponse),
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    schema: {
      $ref: getSchemaPath(BadRequestError),
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    schema: {
      $ref: getSchemaPath(UnauthorizedError),
    },
  })
  async subscribeToMeetup(
    @GetUserId() userId: number,
    @Param('meetupId', ParseIntPipe) meetupId: number,
  ): Promise<MeetupResponse> {
    return this.usersService.subscribeToMeetup(userId, meetupId);
  }
}
