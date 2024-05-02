import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'process';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AccessJWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([AccessJWTStrategy.extractJWT]),
      secretOrKey: process.env.ACCESS_JWT_SECRET,
    });
  }

  static extractJWT(req: Request): string | null {
    if (req.cookies && 'accessToken' in req.cookies) {
      return req.cookies.accessToken;
    }
    return null;
  }

  validate(payload: { username: string }) {
    return payload;
  }
}
