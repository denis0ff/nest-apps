import { RmqMessages, RMQ_CONFIG } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject(RMQ_CONFIG.SERVICE_AUTH)
    private readonly client: ClientProxy,
  ) {}

  async readAll() {
    const users = await firstValueFrom(
      this.client.send(RmqMessages.GET_ALL_USERS, {}),
    );

    return users;
  }

  async readById(id: string) {
    const user = await firstValueFrom(
      this.client.send(RmqMessages.GET_USER_BY_ID, { id }),
    );

    return user;
  }

  async deleteById(id: string) {
    await this.client.emit(RmqMessages.DELETE_USER_BY_ID, { id });
  }
}
