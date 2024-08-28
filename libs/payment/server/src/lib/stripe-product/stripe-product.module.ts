import { Module } from '@nestjs/common';
import { StripeProductService } from './stripe-product.service';
import { StripeProductResolver } from './stripe-product.resolver';

@Module({
  providers: [StripeProductResolver, StripeProductService],
})
export class StripeProductModule {}
