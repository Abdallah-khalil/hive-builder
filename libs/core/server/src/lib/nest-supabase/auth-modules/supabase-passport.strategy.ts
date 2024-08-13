import { Request } from 'express';
import { JwtFromRequestFunction } from 'passport-jwt';
import { Strategy } from 'passport-strategy';

import { SupabaseClient } from '@supabase/supabase-js';
import {
  SUPABASE_AUTH,
  SupabaseAuthStrategyOptions,
  SupabaseAuthUser,
  UNAUTHORIZED,
} from '../models/supabase-auth-config';

export class SupabaseAuthStrategy extends Strategy {
  readonly name = SUPABASE_AUTH;
  private supabase: SupabaseClient;
  private extractor: JwtFromRequestFunction;

  override success!: (user: any, info: any) => void;
  override fail!: Strategy['fail'];

  constructor(
    options: SupabaseAuthStrategyOptions,
    supabaseClient: SupabaseClient,
  ) {
    super();
    if (!options.extractor) {
      throw new Error(
        '\n Extractor is not a function. You should provide an extractor. \n',
      );
    }

    this.supabase = supabaseClient;
    this.extractor = options.extractor;
  }

  async validate(
    payload: SupabaseAuthUser | null,
  ): Promise<SupabaseAuthUser | null> {
    if (!!payload) {
      this.success(payload, {});

      return payload;
    }

    this.fail(UNAUTHORIZED, 401);

    return null;
  }

  override authenticate(req: Request): void {
    const idToken = this.extractor(req);

    if (!idToken) {
      this.fail(UNAUTHORIZED, 401);
      return;
    }

    this.supabase.auth
      .getUser(idToken)
      .then(({ data: { user } }) => this.validate(user))
      .catch((err) => {
        this.fail(err.message, 401);
      });
  }
}
