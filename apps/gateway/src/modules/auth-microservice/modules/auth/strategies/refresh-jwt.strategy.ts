import * as process from 'process';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { GooglePayload } from '../types';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class RefreshJWTStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([RefreshJWTStrategy.extractJWT]),
      secretOrKey: process.env.REFRESH_JWT_SECRET,
      passReqToCallback: true,
    });
  }

  static extractJWT(req: Request): string | null {
    if (req.cookies && 'refreshToken' in req.cookies) {
      return req.cookies.refreshToken;
    }
    return null;
  }

  validate(req: Request, payload: GooglePayload) {
    const refreshToken = req.cookies.refreshToken;
    return { ...payload, refreshToken };
  }
}
