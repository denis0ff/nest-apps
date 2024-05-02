import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { bcryptSalt } from '@app/common';

@Injectable()
export class JwtTokensService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly repository: AuthRepository,
  ) {}

  public async signToken(userId: number, username: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('ACCESS_JWT_SECRET'),
          expiresIn: this.configService.get<string>('ACCESS_JWT_EXPIRES_IN'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('REFRESH_JWT_SECRET'),
          expiresIn: this.configService.get<string>('REFRESH_JWT_EXPIRES_IN'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async accessTokenCookie(
    res: Response,
    accessToken: string,
  ): Promise<void> {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
    });
  }

  public async refreshTokenCookie(
    res: Response,
    refreshToken: string,
  ): Promise<void> {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
    });
  }

  public async refreshTokens(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const user = await this.repository.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User are not exist');
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (!refreshTokenMatches) {
      throw new BadRequestException('Tokens are not the same!');
    }

    const tokens = await this.signTokens(user.id, user.username);

    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
  }

  public async putTokensToCookies(
    userId: number,
    username: string,
    res?: Response,
  ): Promise<void> {
    const tokens = await this.signToken(userId, username);

    await this.accessTokenCookie(res, tokens.accessToken);
    await this.refreshTokenCookie(res, tokens.refreshToken);
    await this.refreshTokens(userId, tokens.refreshToken);
  }

  public async signTokens(userId: number, username: string): Promise<Tokens> {
    return this.signToken(userId, username);
  }

  public async updateRefreshTokenHash(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await JwtTokensService.hashData(refreshToken);

    await this.repository.updateRefreshTokenHash(userId, hashedRefreshToken);
  }

  static async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, bcryptSalt);
  }
}
