import { SupabaseServerNestModule } from '@hive-builder/core-server';
import { Module } from '@nestjs/common';
import { ProductResolver } from './product.nest.resolver';
import { ProductService } from './product.nest.service';

@Module({
  imports: [SupabaseServerNestModule],
  providers: [ProductResolver, ProductService],
  exports: [ProductService],
})
export class ProductModule {}
