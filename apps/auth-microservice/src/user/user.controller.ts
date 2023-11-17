import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { RmqMessages } from '@app/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(RmqMessages.GET_ALL_USERS)
  async readAll() {
    const users = await this.userService.readAll();

    return users;
  }

  @MessagePattern(RmqMessages.GET_USER_BY_ID)
  async readById(@Payload('id') id: string) {
    const user = await this.userService.readById(id);

    return user;
  }

  @EventPattern(RmqMessages.DELETE_USER_BY_ID)
  async deleteById(@Payload('id') id: string) {
    await this.userService.deleteById(id);
  }
}
