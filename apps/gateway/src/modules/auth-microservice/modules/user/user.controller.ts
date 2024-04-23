import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GetUserId } from '../auth/decorators';
import { MeetupResponse, UserResponse } from './response';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  getUserInfo(
    @GetUserId(ParseIntPipe) userId: number,
  ): Promise<UserResponse> {
    return this.usersService.getUserInfo(userId);
  }

  @Post('subscribe/:meetupId')
  async subscribeToMeetup(
    @GetUserId() userId: number,
    @Param('meetupId', ParseIntPipe) meetupId: number,
  ): Promise<MeetupResponse> {
    return this.usersService.subscribeToMeetup(userId, meetupId);
  }
}
