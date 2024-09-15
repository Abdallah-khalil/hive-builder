import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String, {
    description: 'image url for the profile',
    name: 'avatarUrl',
    nullable: true,
  })
  public avatar_url!: string | null;

  @Field(() => String, {
    description: 'billing address',
    name: 'billingAddress',
    nullable: true,
  })
  public billing_address!: string | null;

  @Field(() => String, {
    description: 'full name',
    name: 'fullName',
    nullable: true,
  })
  public full_name!: string | null;

  @Field(() => String, {
    description: 'primary key',
    name: 'id',
    nullable: true,
  })
  public id!: string;

  @Field(() => String, {
    description: 'payment method',
    name: 'paymentMethod',
    nullable: true,
  })
  public payment_method!: string | null;

  @Field(() => String, {
    description: 'stripe customer id',
    name: 'stripeCustomerId',
    nullable: true,
  })
  public stripe_customer_id!: string | null;
}
