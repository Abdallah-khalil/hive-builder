import {
  SupabaseServerNestModule,
  SupabaseServerNestService,
} from '@hive-builder/core-server';
import { StripeNestModule } from '@hive-builder/payment-server';
import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.nest.module';
import { AuthSupabaseResolver } from './auth-supabase.nest.resolver';
import { AuthSupabaseService } from './auth-supabase.nest.service';
import { SupabaseAuthStrategy } from './strategies/supabase-passport.strategy';

@Module({
  imports: [
    SupabaseServerNestModule,
    PassportModule,
    UserModule,
    StripeNestModule,
  ],
  providers: [
    AuthSupabaseResolver,
    AuthSupabaseService,
    {
      provide: SupabaseAuthStrategy,
      useFactory: (supabaseClient: SupabaseServerNestService) => {
        return new SupabaseAuthStrategy(supabaseClient);
      },
      inject: [SupabaseServerNestService],
    },

    Logger,
  ],
})
export class AuthSupabaseModule {}
