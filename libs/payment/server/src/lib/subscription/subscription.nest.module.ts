import { SupabaseServerNestModule } from '@hive-builder/core-server';
import { Module } from '@nestjs/common';
import { SubscriptionResolver } from './subscription.nest.resolver';
import { SubscriptionService } from './subscription.nest.service';

@Module({
  imports: [SupabaseServerNestModule],
  exports: [SubscriptionService],
  providers: [SubscriptionResolver, SubscriptionService],
})
export class SubscriptionModule {}
