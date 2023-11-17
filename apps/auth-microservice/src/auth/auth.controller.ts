import { Controller } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RmqMessages } from '@app/common';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(RmqMessages.CREATE_USER)
  public async createUser(@Payload() createUserDto: CreateUserDto) {
    const createdUser = await this.authService.createUser(createUserDto);

    return createdUser;
  }

  @MessagePattern(RmqMessages.LOGIN_USER)
  public async login(@Payload() user: Express.User) {
    const token = await this.authService.loginUser(user);

    return token;
  }

  @MessagePattern(RmqMessages.VALIDATE_USER)
  public async validateUser(
    @Payload('username') username: string,
    @Payload('password') password: string,
  ) {
    const token = await this.authService.validateUser(username, password);

    return token;
  }
}
