import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { firstValueFrom } from 'rxjs';
import { RmqMessages, RMQ_CONFIG } from '@app/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject(RMQ_CONFIG.SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const user = await firstValueFrom(
      this.client.send(RmqMessages.CREATE_USER, createUserDto),
    );

    return user;
  }

  public async login(user: Express.User) {
    const token = await firstValueFrom(
      this.client.send(RmqMessages.LOGIN_USER, user),
    );

    return token;
  }

  public async validateUser(username: string, password: string) {
    const validate = await firstValueFrom(
      this.client.send(RmqMessages.VALIDATE_USER, { username, password }),
    );

    return validate;
  }
}
