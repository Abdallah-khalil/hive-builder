import { Logger, Module } from '@nestjs/common';
import { SupabaseServerNestService } from './supabase-server.nest.service';

@Module({
  providers: [SupabaseServerNestService, Logger],
  exports: [SupabaseServerNestService],
})
export class SupabaseServerNestModule {}
