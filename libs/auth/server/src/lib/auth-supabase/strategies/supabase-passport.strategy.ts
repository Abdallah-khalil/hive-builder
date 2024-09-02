import { HiveDatabase } from '@hive-builder/hive-db';
import { HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  AuthError,
  AuthUser,
  Session,
  SupabaseClient,
  UserResponse,
} from '@supabase/supabase-js';
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

  public constructor(private readonly supabase: SupabaseClient<HiveDatabase>) {
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

  public override async authenticate(req: Request): Promise<void> {
    const extractor: JwtFromRequestFunction =
      ExtractJwt.fromAuthHeaderAsBearerToken();
    const idToken: string | null = extractor(req);
    const refreshToken: string | null = req.headers['refresh-token'] as string;

    if (idToken == null) {
      this.fail('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
      return;
    }

    const sessionDetails: {
      data: { session: Session | null };
      error: AuthError | null;
    } = await this.supabase.auth.getSession();

    this.supabase.auth
      .getUser(idToken)
      .then(async ({ data: { user } }: UserResponse) => {
        if (sessionDetails?.data?.session === null && refreshToken != null) {
          await this.updateSupabaseAuthSession(refreshToken, idToken);
        } else {
          if (user?.id !== sessionDetails?.data?.session?.user?.id) {
            await this.updateSupabaseAuthSession(refreshToken, idToken);
          }
        }
        return this.validate(user);
      })
      .catch((err: Error) => {
        this.fail(err.message, HttpStatus.UNAUTHORIZED);
      });
  }

  private async updateSupabaseAuthSession(
    refreshToken: string,
    idToken: string,
  ) {
    await this.supabase.auth.setSession({
      refresh_token: refreshToken,
      access_token: idToken,
    });
  }
}
