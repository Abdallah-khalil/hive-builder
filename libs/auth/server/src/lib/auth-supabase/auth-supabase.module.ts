import { SupabaseNestModule } from '@hive-builder/core-server';
import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SupabaseClient } from '@supabase/supabase-js';
import { UserModule } from '../user/user.nest.module';
import { AuthSupabaseResolver } from './auth-supabase.resolver';
import { AuthSupabaseService } from './auth-supabase.service';
import { SupabaseAuthStrategy } from './strategies/supabase-passport.strategy';

@Module({
  imports: [SupabaseNestModule.injectClient(), PassportModule, UserModule],
  providers: [
    AuthSupabaseResolver,
    AuthSupabaseService,
    {
      provide: SupabaseAuthStrategy,
      useFactory: (supabaseClient: SupabaseClient) => {
        return new SupabaseAuthStrategy(supabaseClient);
      },
      inject: [SupabaseClient],
    },

    Logger,
  ],
})
export class AuthSupabaseModule {}
