import { StripeWebhookHandler } from '@golevelup/nestjs-stripe';
import { TablesInsert } from '@hive-builder/hive-db';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import {
  CreateStripeProductInput,
  StripeProductService,
} from '../stripe-product';
import {
  CreateStripeProductPriceInput,
  StripeProductPriceService,
} from '../stripe-product-price';

@Injectable()
export class StripeProductWebhookService {
  public constructor(
    private readonly stripeProductService: StripeProductService,
    private readonly stripeProductPriceService: StripeProductPriceService,
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

  @StripeWebhookHandler('product.deleted')
  public async handleProductDeleted(evt: Stripe.ProductDeletedEvent) {
    await this.stripeProductService.remove(evt.data.object.id);
  }

  @StripeWebhookHandler('price.created')
  public async handlePriceCreated(evt: Stripe.PriceCreatedEvent) {
    const productPrice: TablesInsert<'stripe_product_prices'> =
      CreateStripeProductPriceInput.mapStripeProductPrice(
        evt.data.object as Stripe.Price,
      );
    await this.stripeProductPriceService.create(productPrice);
  }

  @StripeWebhookHandler('price.updated')
  public async handlePriceUpdated(evt: Stripe.PriceUpdatedEvent) {
    const productPrice: TablesInsert<'stripe_product_prices'> =
      CreateStripeProductPriceInput.mapStripeProductPrice(
        evt.data.object as Stripe.Price,
      );
    await this.stripeProductPriceService.update(productPrice.id, productPrice);
  }

  @StripeWebhookHandler('price.deleted')
  public async handlePriceDeleted(evt: Stripe.PriceDeletedEvent) {
    await this.stripeProductPriceService.remove(evt.data.object.id);
  }
}
