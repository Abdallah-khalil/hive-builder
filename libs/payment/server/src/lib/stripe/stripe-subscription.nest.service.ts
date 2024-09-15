import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import { ErrorHandlerService } from '@hive-builder/core-server';
import { Tables } from '@hive-builder/hive-db';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { ProductService } from '../product';

@Injectable()
export class StripeSubscriptionNestService {
  public constructor(
    @InjectStripeClient() private readonly stripeClient: Stripe,
    private readonly errorHandler: ErrorHandlerService,
    private readonly productService: ProductService,
  ) {}

  public async createFreeSubscription({
    customerId,
    ctx,
  }: {
    customerId: string;
    ctx: { req: Request; res: Response };
  }): Promise<Stripe.Subscription> {
    /** @description we first get the current basic ( free ) plan stored in supabase and then create a customer with a free subscription he can easily upgrade later  */
    const freePlanId: string = await this.productService
      .findOne('name', 'Free', ctx)
      .then((data: Tables<'stripe_products'> | null) => {
        return data != null ? data.stripe_product_id : '';
      });

    if (freePlanId == null) {
      const error: Error = new Error('No free plan found');
      this.errorHandler.handleError(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return this.stripeClient.subscriptions.create({
      customer: customerId,
      items: [{ plan: freePlanId }],
    });
  }

  public async remove(id: string) {
    return this.stripeClient.subscriptions.cancel(id).catch((error: Error) => {
      this.errorHandler.handleError(error);
      throw error;
    });
  }
}
