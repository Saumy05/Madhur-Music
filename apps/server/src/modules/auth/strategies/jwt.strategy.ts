import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'madhur_fallback_secret',
    });
  }

  /** The validated payload is attached to req.user */
  async validate(payload: { sub: string; username: string; role: string }) {
    return {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
