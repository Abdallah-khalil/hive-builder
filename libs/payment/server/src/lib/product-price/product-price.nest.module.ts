import { SupabaseServerNestModule } from '@hive-builder/core-server';
import { Module } from '@nestjs/common';
import { ProductPriceResolver } from './product-price.nest.resolver';
import { ProductPriceService } from './product-price.nest.service';

@Module({
  imports: [SupabaseServerNestModule],
  providers: [ProductPriceResolver, ProductPriceService],
  exports: [ProductPriceService],
})
export class ProductPriceModule {}
