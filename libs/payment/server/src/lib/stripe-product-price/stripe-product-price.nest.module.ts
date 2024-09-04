import { SupabaseNestModule } from '@hive-builder/core-server';
import { Module } from '@nestjs/common';
import { StripeProductPriceResolver } from './stripe-product-price.nest.resolver';
import { StripeProductPriceService } from './stripe-product-price.nest.service';

@Module({
  imports: [SupabaseNestModule.injectClient()],
  providers: [StripeProductPriceResolver, StripeProductPriceService],
  exports: [StripeProductPriceService],
})
export class StripeProductPriceModule {}
