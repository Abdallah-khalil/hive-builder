import { SupabaseNestModule } from '@hive-builder/core-server';
import { Module } from '@nestjs/common';
import { StripeProductResolver } from './stripe-product.nest.resolver';
import { StripeProductService } from './stripe-product.nest.service';

@Module({
  imports: [SupabaseNestModule.injectClient()],
  providers: [StripeProductResolver, StripeProductService],
  exports: [StripeProductService],
})
export class StripeProductModule {}
