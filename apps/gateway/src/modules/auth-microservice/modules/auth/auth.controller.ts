import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { GetUser, GetUserId } from './decorators';
import { Public } from './decorators';
import { RefreshJWTGuard } from './guards';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtTokensService } from 'apps/auth-microservice/src/modules/auth/jwt.tokens.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private authService: AuthService,
    private readonly jwtTokenService: JwtTokensService,
  ) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async register(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const tokens = await this.authService.register(dto);

    res.cookie('accessToken', tokens.accessToken, { httpOnly: true });
    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });

    return tokens;
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async login(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const tokens = await this.authService.login(dto);

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: true,
    });
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return tokens;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(
    @GetUserId() userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshJWTGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  public async refreshTokens(
    @GetUserId() userId: number,
    @GetUser('refreshToken') refreshToken: string,
  ): Promise<void> {
    await this.jwtTokenService.refreshTokens(userId, refreshToken);
  }

  @Public()
  @Get('login/google')
  @UseGuards(AuthGuard('google'))
  public async googleLogin(): Promise<void> {}

  @Public()
  @Get('google-redirect')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('google'))
  public async googleAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    // TO DO add d.ts to extend User interface
    const username = (req.user as any).email;
    const tokens = await this.authService.validateUser(username);

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: true,
    });
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return tokens;
  }
}
