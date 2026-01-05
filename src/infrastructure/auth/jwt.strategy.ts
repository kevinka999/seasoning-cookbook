import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Identity } from './identity.decorator';

export interface JwtPayload {
  sub: string;
  email?: string;
  aud?: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const publicKey = configService.get<string>('JWT_PUBLIC_KEY');

    if (!publicKey) {
      throw new Error('JWT_PUBLIC_KEY is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: publicKey,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayload): Promise<Identity> {
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }

    if (!payload.email) {
      throw new UnauthorizedException('Email is required in token payload');
    }

    if (!payload.aud) {
      throw new UnauthorizedException(
        'Application ID (aud) is required in token payload',
      );
    }

    return {
      id: payload.sub,
      email: payload.email,
      applicationId: payload.aud,
    };
  }
}
