import { HiveDatabase } from '@hive-builder/hive-db';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from '@supabase/ssr';
import {
  AuthError,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { Request, Response } from 'express';

export interface ExtendedUser extends User {
  id: string;
}

@Injectable()
export class SupabaseServerNestService {
  private supabaseClient!: SupabaseClient<HiveDatabase>;

  public constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  public getSupabaseDefaultClient(): SupabaseClient<HiveDatabase> {
    return createClient<HiveDatabase>(
      this.configService.get<string>('supabaseUrl') as string,
      this.configService.get<string>('supabaseServiceKey') as string,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );
  }

  public getSupabaseClient({
    req,
    res,
  }: {
    req: Request;
    res?: Response | null;
  }): SupabaseClient<HiveDatabase> {
    if (this.supabaseClient) {
      return this.supabaseClient;
    }

    this.supabaseClient = createServerClient<HiveDatabase>(
      this.configService.get<string>('supabaseUrl') as string,
      this.configService.get<string>('supabaseKey') as string,
      {
        cookies: {
          getAll() {
            return parseCookieHeader(req?.headers.cookie ?? '');
          },
          setAll(
            cookiesToSet: {
              name: string;
              value: string;
              options: object;
            }[],
          ) {
            cookiesToSet.forEach(
              ({
                name,
                value,
                options,
              }: {
                name: string;
                value: string;
                options: object;
              }) =>
                res?.appendHeader(
                  'Set-Cookie',
                  serializeCookieHeader(name, value, options),
                ),
            );
          },
        },
      },
    );

    return this.supabaseClient;
  }

  public async updateSupabaseAuthSession(
    refreshToken: string,
    idToken: string,
    req: Request & { user?: ExtendedUser },
  ) {
    const client: SupabaseClient<HiveDatabase> = this.getSupabaseClient({
      req,
    });

    if (client == null) {
      this.logger.error(' supbase client has to be initialized  ');
    }
    const sessionDetails: {
      data: { session: Session | null };
      error: AuthError | null;
    } = await client.auth.getSession();

    if (!sessionDetails?.data?.session && refreshToken != null) {
      await this.refreshCurrentUserSession(client, refreshToken, idToken);
    } else {
      if (req.user?.id !== sessionDetails?.data?.session?.user?.id) {
        await this.refreshCurrentUserSession(client, refreshToken, idToken);
      }
    }
  }

  private async refreshCurrentUserSession(
    client: SupabaseClient<HiveDatabase>,
    refreshToken: string,
    idToken: string,
  ): Promise<void> {
    console.log('refreshing session ');

    await client.auth.refreshSession({
      refresh_token: refreshToken,
    });

    await client.auth.setSession({
      refresh_token: refreshToken,
      access_token: idToken,
    });
  }
}
