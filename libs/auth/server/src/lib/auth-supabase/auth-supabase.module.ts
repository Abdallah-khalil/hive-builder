import { SupabaseNestModule } from '@hive-builder/core-server';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.nest.module';
import { AuthSupabaseResolver } from './auth-supabase.resolver';
import { AuthSupabaseService } from './auth-supabase.service';
import { SupabaseAuthStrategy } from './strategies/supabase-passport.strategy';

@Module({
  imports: [SupabaseNestModule.injectClient(), PassportModule, UserModule],
  providers: [AuthSupabaseResolver, AuthSupabaseService, SupabaseAuthStrategy],
})
export class AuthSupabaseModule {}
