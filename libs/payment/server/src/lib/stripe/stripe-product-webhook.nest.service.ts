import { StripeWebhookHandler } from '@golevelup/nestjs-stripe';
import { TablesInsert } from '@hive-builder/hive-db';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import {
  CreateStripeProductInput,
  StripeProductService,
} from '../stripe-product';

@Injectable()
export class StripeProductWebhookService {
  public constructor(
    private readonly stripeProductService: StripeProductService,
  ) {}

  @StripeWebhookHandler('product.created')
  public async handleProductCreated(evt: Stripe.ProductCreatedEvent) {
    const product: TablesInsert<'stripe_products'> =
      CreateStripeProductInput.mapStripeProduct(
        evt.data.object as Stripe.Product,
      );
    await this.stripeProductService.create(product);
  }

  @StripeWebhookHandler('product.updated')
  public async handleProductUpdated(evt: Stripe.ProductUpdatedEvent) {
    const product: TablesInsert<'stripe_products'> =
      CreateStripeProductInput.mapStripeProduct(
        evt.data.object as Stripe.Product,
      );
    await this.stripeProductService.update(product.id, product);
  }
}
