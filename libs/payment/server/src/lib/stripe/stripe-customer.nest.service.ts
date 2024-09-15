import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import { ErrorHandlerService } from '@hive-builder/core-server';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeCustomerNestService {
  public constructor(
    @InjectStripeClient() private readonly stripeClient: Stripe,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  public async create({
    displayName,
    email,
    phone,
  }: {
    email: string;
    displayName: string;
    phone: string;
  }): Promise<Stripe.Customer> {
    return this.stripeClient.customers
      .create({
        email,
        name: displayName,
        phone,
      })
      .catch((error: Error) => {
        this.errorHandler.handleError(error);
        throw error;
      });
  }

  public async remove(id: string) {
    return this.stripeClient.customers.del(id).catch((error: Error) => {
      this.errorHandler.handleError(error);
      throw error;
    });
  }
}
