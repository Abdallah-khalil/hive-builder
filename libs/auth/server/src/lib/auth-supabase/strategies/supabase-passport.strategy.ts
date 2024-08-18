import { HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthUser, SupabaseClient, UserResponse } from '@supabase/supabase-js';
import { Request } from 'express';
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';

export type SupabaseAuthUser = AuthUser;

export class SupabaseAuthStrategy extends PassportStrategy(
  Strategy,
  'SUPABASE_AUTH',
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public override success!: (user: any, info: any) => void;
  public override fail!: Strategy['fail'];

  public constructor(private readonly supabase: SupabaseClient) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env['JWT_SECRET'],
    });
  }

  public async validate(
    payload: SupabaseAuthUser | null,
  ): Promise<SupabaseAuthUser | null> {
    if (payload) {
      this.success(payload, {});

      return payload;
    }

    this.fail('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);

    return null;
  }

  public override authenticate(req: Request): void {
    const extractor: JwtFromRequestFunction =
      ExtractJwt.fromAuthHeaderAsBearerToken();
    const idToken: string | null = extractor(req);

    if (idToken == null) {
      this.fail('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
      return;
    }

    this.supabase.auth
      .getUser(idToken)
      .then(async ({ data: { user } }: UserResponse) => this.validate(user))
      .catch((err: Error) => {
        this.fail(err.message, HttpStatus.UNAUTHORIZED);
      });
  }
}
