import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { JwtTokensService } from './jwt.tokens.service';
import { MessagePattern } from '@nestjs/microservices';
import { Payload } from '@nestjs/microservices';
import { RmqMessages } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtTokenService: JwtTokensService,
  ) {}

  @MessagePattern(RmqMessages.CREATE_USER)
  public async register(@Payload('dto') dto: AuthDto) {
    return this.authService.register(dto);
  }

  @MessagePattern(RmqMessages.LOGIN_USER)
  public async login(@Payload('dto') dto: AuthDto) {
    return this.authService.login(dto);
  }

  @MessagePattern(RmqMessages.VALIDATE_USER)
  public async validateUser(@Payload('username') username: string) {
    return this.authService.validateUser(username);
  }

  @MessagePattern(RmqMessages.LOGOUT_USER)
  public async logout(@Payload('userId') userId: number) {
    return this.authService.logout(userId);
  }

  @MessagePattern(RmqMessages.REFRESH_TOKEN)
  public async refreshTokens(
    @Payload('userId') userId: number,
    @Payload('refreshToken') refreshToken: string,
  ) {
    return this.jwtTokenService.refreshTokens(userId, refreshToken);
  }
}
