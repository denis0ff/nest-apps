import { Inject, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RmqMessages } from '@app/common';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH') private authClient: ClientProxy) {}

  public async register(dto: AuthDto) {
    return await lastValueFrom(
      this.authClient.send(RmqMessages.CREATE_USER, { dto }),
    );
  }

  public async login(dto: AuthDto) {
    return await lastValueFrom(
      this.authClient.send(RmqMessages.LOGIN_USER, { dto }),
    );
  }

  public async logout(userId: number) {
    return await lastValueFrom(
      this.authClient.send(RmqMessages.LOGOUT_USER, { userId }),
    );
  }

  public async refreshTokens(userId: number, refreshToken: string) {
    return await lastValueFrom(
      this.authClient.send(RmqMessages.REFRESH_TOKEN, { userId, refreshToken }),
    );
  }

  public async validateUser(username: string) {
    return await lastValueFrom(
      this.authClient.send(RmqMessages.VALIDATE_USER, { username }),
    );
  }
}
