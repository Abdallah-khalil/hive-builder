import { StripeWebhookHandler } from '@golevelup/nestjs-stripe';
import { TablesInsert } from '@hive-builder/hive-db';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateProductInput, ProductService } from '../product';
import { CreateProductPriceInput, ProductPriceService } from '../product-price';
import { CreateSubscriptionInput, SubscriptionService } from '../subscription';

@Injectable()
export class StripeProductWebhookService {
  public constructor(
    private readonly productService: ProductService,
    private readonly productPriceService: ProductPriceService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @StripeWebhookHandler('product.created')
  public async handleProductCreated(evt: Stripe.ProductCreatedEvent) {
    const product: TablesInsert<'stripe_products'> =
      CreateProductInput.mapProduct(evt.data.object as Stripe.Product);
    await this.productService.create(product);
  }

  @StripeWebhookHandler('product.updated')
  public async handleProductUpdated(evt: Stripe.ProductUpdatedEvent) {
    if (evt.type !== 'product.updated') {
      const product: TablesInsert<'stripe_products'> =
        CreateProductInput.mapProduct(evt.data.object as Stripe.Product);
      await this.productService.update(product.id, product);
    }

    return 'Event handled' + evt.type;
  }

  @StripeWebhookHandler('product.deleted')
  public async handleProductDeleted(evt: Stripe.ProductDeletedEvent) {
    await this.productService.remove(evt.data.object.id);
  }

  @StripeWebhookHandler('price.created')
  public async handlePriceCreated(evt: Stripe.PriceCreatedEvent) {
    const productPrice: TablesInsert<'stripe_product_prices'> =
      CreateProductPriceInput.mapStripeProductPrice(
        evt.data.object as Stripe.Price,
      );
    await this.productPriceService.create(productPrice);
  }

  @StripeWebhookHandler('price.updated')
  public async handlePriceUpdated(evt: Stripe.PriceUpdatedEvent) {
    if (evt.type === 'price.updated') {
      const productPrice: TablesInsert<'stripe_product_prices'> =
        CreateProductPriceInput.mapStripeProductPrice(
          evt.data.object as Stripe.Price,
        );
      console.log('price updated', productPrice);
      await this.productPriceService.update(productPrice.id, productPrice);
    }

    return 'Event handled' + evt.type;
  }

  @StripeWebhookHandler('price.deleted')
  public async handlePriceDeleted(evt: Stripe.PriceDeletedEvent) {
    await this.productPriceService.remove(evt.data.object.id);
  }

  @StripeWebhookHandler('customer.subscription.created')
  public async handleSubscriptionCreated(
    evt: Stripe.CustomerSubscriptionCreatedEvent,
  ) {
    const subscription: TablesInsert<'subscriptions'> =
      CreateSubscriptionInput.mapSubscriptionData(
        evt.data.object as Stripe.Subscription,
      );
    await this.subscriptionService.create(subscription);
  }

  @StripeWebhookHandler('customer.subscription.updated')
  public async handleSubscriptionUpdated(
    evt: Stripe.CustomerSubscriptionUpdatedEvent,
  ) {
    if (evt.type === 'customer.subscription.updated') {
      const subscription: TablesInsert<'subscriptions'> =
        CreateSubscriptionInput.mapSubscriptionData(
          evt.data.object as Stripe.Subscription,
        );
      await this.subscriptionService.update(subscription.id, subscription);
    }

    return 'Event handled' + evt.type;
  }

  @StripeWebhookHandler('customer.subscription.deleted')
  public async handleSubscriptionDeleted(
    evt: Stripe.CustomerSubscriptionDeletedEvent,
  ) {
    await this.subscriptionService.remove(evt.data.object.id);
  }
}
