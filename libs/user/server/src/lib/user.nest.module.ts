import { SupabaseNestModule } from '@hive-builder/core-server';
import { Module } from '@nestjs/common';

import { UserResolver } from './user.nest.resolver';
import { UserService } from './user.nest.service';

@Module({
  imports: [SupabaseNestModule.injectClient()],
  providers: [UserResolver, UserService],
})
export class UserModule {}
