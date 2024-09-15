import { Enums, Json } from '@hive-builder/hive-db';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductPrice {
  @Field(() => String, {
    description: 'active',
    name: 'active',
    nullable: true,
  })
  public active!: boolean | null;

  @Field(() => String, {
    description: 'currency',
    name: 'currency',
    nullable: true,
  })
  public currency?: string | null;

  @Field(() => String, {
    description: 'description',
    name: 'description',
    nullable: true,
  })
  public description?: string | null;

  @Field(() => String, {
    description: 'id',
    name: 'id',
    nullable: false,
  })
  public id!: string;

  @Field(() => String, {
    description: 'interval',
    name: 'interval',
    nullable: true,
  })
  public interval?: Enums<'pricing_plan_interval'> | null;

  @Field(() => Number, {
    description: 'intervalCount',
    name: 'intervalCount',
    nullable: true,
  })
  public interval_count?: number | null;

  @Field(() => String, {
    description: 'metadata',
    name: 'metadata',
    nullable: true,
  })
  public metadata?: Json | null;

  @Field(() => String, {
    description: 'productId',
    name: 'productId',
    nullable: true,
  })
  public product_id?: string | null;

  @Field(() => Number, {
    description: 'trialPeriodDays',
    name: 'trialPeriodDays',
    nullable: true,
  })
  public trial_period_days?: number | null;

  @Field(() => String, {
    description: 'type',
    name: 'type',
    nullable: true,
  })
  public type?: Enums<'pricing_type'> | null;

  @Field(() => Number, {
    description: 'unitAmount',
    name: 'unitAmount',
    nullable: true,
  })
  public unit_amount?: number | null;
}
