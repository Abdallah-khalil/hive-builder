import { Enums, TablesInsert } from '@hive-builder/hive-db';
import { Field, InputType, Int } from '@nestjs/graphql';
import Stripe from 'stripe';

@InputType()
export class CreateProductPriceInput {
  @Field(() => String, {
    description: 'id',
    name: 'id',
    nullable: true,
  })
  public id!: string | null;

  @Field(() => Boolean, {
    description: 'active',
    name: 'active',
    nullable: true,
  })
  public active!: string | null;

  @Field(() => String, {
    description: 'description',
    name: 'description',
    nullable: true,
  })
  public description!: string | null;

  @Field(() => String, {
    description: 'metadata',
    name: 'metadata',
    nullable: true,
  })
  public metadata!: string | null;

  @Field(() => String, {
    description: 'unit_amount',
    name: 'unitAmount',
    nullable: true,
  })
  public unitAmount!: string | null;

  @Field(() => String, {
    description: 'product_id',
    name: 'productId',
    nullable: true,
  })
  public productId!: string | null;

  @Field(() => String, {
    description: 'currency',
    name: 'currency',
    nullable: true,
  })
  public currency!: string | null;

  @Field(() => String, {
    description: 'pricing_type',
    name: 'type',
    nullable: true,
  })
  public type!: Enums<'pricing_type'> | null;

  @Field(() => String, {
    description: 'pricing_plan_interval',
    name: 'interval',
    nullable: true,
  })
  public interval!: Enums<'pricing_plan_interval'> | null;

  @Field(() => Int, {
    description: 'trial_period_days',
    name: 'trialPeriodDays',
    nullable: true,
  })
  public trialPeriodDays!: number | null;

  @Field(() => Int, {
    description: 'interval_count',
    name: 'intervalCount',
    nullable: true,
  })
  public intervalCount!: number | null;

  public static mapStripeProductPrice(
    stripeProductPrice: Stripe.Price,
  ): TablesInsert<'stripe_product_prices'> {
    return {
      active: stripeProductPrice.active,
      id: stripeProductPrice.id,
      metadata: JSON.stringify(stripeProductPrice.metadata),
      unit_amount: stripeProductPrice.unit_amount,
      product_id:
        typeof stripeProductPrice.product === 'string'
          ? stripeProductPrice.product
          : '',
      currency: stripeProductPrice.currency,
      type: stripeProductPrice.type,
      interval: stripeProductPrice.recurring?.interval,
      interval_count: stripeProductPrice.recurring?.interval_count,
      trial_period_days: stripeProductPrice.recurring?.trial_period_days,
    };
  }
}
