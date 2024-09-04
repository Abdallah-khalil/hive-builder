import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { StripeProductPrice } from './entities/stripe-product-price.entity';
import { StripeProductPriceService } from './stripe-product-price.nest.service';

@Resolver(() => StripeProductPrice)
export class StripeProductPriceResolver {
  public constructor(
    private readonly stripeProductPriceService: StripeProductPriceService,
  ) {}

  @Query(() => [StripeProductPrice], { name: 'stripeProductPrice' })
  public async findAll() {
    return this.stripeProductPriceService.findAll();
  }

  @Query(() => StripeProductPrice, { name: 'stripeProductPrice' })
  public async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.stripeProductPriceService.findOne(id);
  }
}
