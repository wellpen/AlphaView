import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    const secret = config.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET 沒有設定！');
    }
    super({
      jwtFromRequest: (req: Request): string | null => {
        const cookies = req.cookies as Record<string, string | undefined>;
        const token = cookies?.token;
        return typeof token === 'string' ? token : null;
      },
      secretOrKey: secret,
    });
  }

  validate(payload: { sub: number; email: string }) {
    return { id: payload.sub, email: payload.email };
  }
}
