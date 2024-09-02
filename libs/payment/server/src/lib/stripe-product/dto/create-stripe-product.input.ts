import { TablesInsert } from '@hive-builder/hive-db';
import { Field, InputType } from '@nestjs/graphql';
import Stripe from 'stripe';

@InputType()
export class CreateStripeProductInput {
  @Field(() => String, {
    description: 'Product Name',
    name: 'name',
    nullable: true,
  })
  public name!: string | null;

  @Field(() => Boolean, {
    description: 'active',
    name: 'active',
    nullable: true,
  })
  public active!: string | null;

  @Field(() => String, {
    description: 'id',
    name: 'id',
    nullable: true,
  })
  public id!: string | null;

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
    description: 'image',
    name: 'image',
    nullable: true,
  })
  public image!: string | null;

  @Field(() => String, {
    description: 'stripe_product_id',
    name: 'stripeProductId',
    nullable: true,
  })
  public stripeProductId!: string | null;

  public static mapStripeProduct(
    stripeProduct: Stripe.Product,
  ): TablesInsert<'stripe_products'> {
    return {
      active: stripeProduct.active,
      description: stripeProduct.description,
      id: stripeProduct.id,
      metadata: JSON.stringify(stripeProduct.metadata),
      name: stripeProduct.name,
      stripe_product_id: stripeProduct.id,
      image: stripeProduct.images?.[0] ?? null,
    };
  }
}
