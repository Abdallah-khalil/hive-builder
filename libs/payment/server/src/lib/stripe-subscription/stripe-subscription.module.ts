import { Module } from '@nestjs/common';
import { StripeSubscriptionService } from './stripe-subscription.service';
import { StripeSubscriptionResolver } from './stripe-subscription.resolver';

@Module({
  providers: [StripeSubscriptionResolver, StripeSubscriptionService],
})
export class StripeSubscriptionModule {}
