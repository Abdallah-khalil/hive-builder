import { TablesInsert } from '@hive-builder/hive-db';
import { toDateTime } from '@hive-builder/util';
import { InputType } from '@nestjs/graphql';
import Stripe from 'stripe';

@InputType()
export class CreateSubscriptionInput {
  public static mapSubscriptionData(
    stripeSubscription: Stripe.Subscription,
  ): TablesInsert<'subscriptions'> {
    return {
      id: stripeSubscription.id,
      user_id: stripeSubscription.customer as string,
      metadata: stripeSubscription.metadata,
      status: stripeSubscription.status,
      price_id: stripeSubscription.items.data[0].price.id,
      cancel_at_period_end: stripeSubscription.cancel_at_period_end,
      cancel_at: toDateTime(stripeSubscription.cancel_at),
      canceled_at: toDateTime(stripeSubscription.canceled_at),
      current_period_start: toDateTime(stripeSubscription.current_period_start),
      current_period_end: toDateTime(stripeSubscription.current_period_end),
      created: toDateTime(stripeSubscription.created),
      ended_at: toDateTime(stripeSubscription.ended_at),
      trial_start: toDateTime(stripeSubscription.trial_start),
      trial_end: toDateTime(stripeSubscription.trial_end),
    };
  }
}
