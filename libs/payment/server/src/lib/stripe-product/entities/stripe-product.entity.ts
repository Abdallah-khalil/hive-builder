import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StripeProduct {
  @Field(() => String, {
    description: 'primary key',
    name: 'id',
    nullable: true,
  })
  public id!: string;

  @Field(() => String, {
    description: 'stripe product id',
    name: 'stripeProductId',
    nullable: true,
  })
  public stripe_product_id!: string;
}
