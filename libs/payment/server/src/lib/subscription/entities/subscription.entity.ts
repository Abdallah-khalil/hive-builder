import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Subscription {
  @Field(() => String, {
    description: 'id',
    name: 'id',
    nullable: true,
  })
  public id!: string | null;

  @Field(() => String, {
    description: 'userId',
    name: 'userId',
    nullable: true,
  })
  public user_id!: string | null;

  @Field(() => String, {
    description: 'metadata',
    name: 'metadata',
    nullable: true,
  })
  public metadata!: string | null;

  @Field(() => String, {
    description: 'status',
    name: 'status',
    nullable: true,
  })
  public status!: string | null;

  @Field(() => String, {
    description: 'priceId',
    name: 'priceId',
    nullable: true,
  })
  public price_id!: string | null;

  @Field(() => Boolean, {
    description: 'cancelAtPeriodEnd',
    name: 'cancelAtPeriodEnd',
    nullable: true,
  })
  public cancel_at_period_end!: string | null;

  @Field(() => String, {
    description: 'cancelAt',
    name: 'cancelAt',
    nullable: true,
  })
  public cancel_at!: string | null;

  @Field(() => String, {
    description: 'canceledAt',
    name: 'canceledAt',
    nullable: true,
  })
  public canceled_at!: string | null;

  @Field(() => String, {
    description: 'currentPeriodStart',
    name: 'currentPeriodStart',
    nullable: true,
  })
  public current_period_start!: string | null;

  @Field(() => String, {
    description: 'currentPeriodEnd',
    name: 'currentPeriodEnd',
    nullable: true,
  })
  public current_period_end!: string | null;

  @Field(() => String, {
    description: 'created',
    name: 'created',
    nullable: true,
  })
  public created!: string | null;

  @Field(() => String, {
    description: 'endedAt',
    name: 'endedAt',
    nullable: true,
  })
  public ended_at!: string | null;

  @Field(() => String, {
    description: 'trialStart',
    name: 'trialStart',
    nullable: true,
  })
  public trial_start!: string | null;

  @Field(() => String, {
    description: 'trialEnd',
    name: 'trialEnd',
    nullable: true,
  })
  public trial_end!: string | null;
}
