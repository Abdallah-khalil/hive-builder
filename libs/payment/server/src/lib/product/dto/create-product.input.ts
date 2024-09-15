import { TablesInsert } from '@hive-builder/hive-db';
import { InputType } from '@nestjs/graphql';
import Stripe from 'stripe';

@InputType()
export class CreateProductInput {
  public static mapProduct(
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
