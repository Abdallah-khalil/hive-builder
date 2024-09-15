import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { ProductPrice } from './entities/product-price.entity';
import { ProductPriceService } from './product-price.nest.service';

@Resolver(() => ProductPrice)
export class ProductPriceResolver {
  public constructor(
    private readonly stripeProductPriceService: ProductPriceService,
  ) {}

  @Query(() => [ProductPrice], { name: 'stripeProductPrice' })
  public async findAll(@Context() ctx: { req: Request; res: Response }) {
    return this.stripeProductPriceService.findAll(ctx);
  }

  @Query(() => ProductPrice, { name: 'stripeProductPrice' })
  public async findOne(
    @Args('id', { type: () => String }) id: string,
    @Context() ctx: { req: Request; res: Response },
  ) {
    return this.stripeProductPriceService.findOne('id', id, ctx);
  }
}
