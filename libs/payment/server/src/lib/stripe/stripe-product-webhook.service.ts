import { StripeWebhookHandler } from '@golevelup/nestjs-stripe';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeProductWebhookService {
  @StripeWebhookHandler('product.created')
  public handleProductCreated(evt: Stripe.ProductCreatedEvent) {
    console.log(evt);
  }
}
