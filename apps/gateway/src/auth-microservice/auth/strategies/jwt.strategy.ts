import { Injectable } from '@nestjs/common/decorators';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_OPTIONS } from '@app/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req?.cookies['access_token'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: JWT_OPTIONS.SECRET,
    });
  }

  async validate(payload: any) {
    return { id: payload.id, username: payload.username };
  }
}
