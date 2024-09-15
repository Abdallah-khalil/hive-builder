import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { Product } from './entities/product.entity';
import { ProductService } from './product.nest.service';

@Resolver(() => Product)
export class ProductResolver {
  public constructor(private readonly stripeProductService: ProductService) {}

  @Query(() => [Product], { name: 'products' })
  public async findAll(@Context() ctx: { req: Request; res: Response }) {
    return this.stripeProductService.findAll(ctx);
  }

  @Query(() => Product, { name: 'product' })
  public async findOne(
    @Args('id', { type: () => String }) id: string,
    @Context() ctx: { req: Request; res: Response },
  ) {
    return this.stripeProductService.findOne('id', id, ctx);
  }
}
