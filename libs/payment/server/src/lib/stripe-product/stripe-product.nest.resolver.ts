import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { StripeProduct } from './entities/stripe-product.entity';
import { StripeProductService } from './stripe-product.nest.service';

@Resolver(() => StripeProduct)
export class StripeProductResolver {
  public constructor(
    private readonly stripeProductService: StripeProductService,
  ) {}

  @Query(() => [StripeProduct], { name: 'stripeProducts' })
  public async findAll() {
    return this.stripeProductService.findAll();
  }

  @Query(() => StripeProduct, { name: 'stripeProduct' })
  public async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.stripeProductService.findOne(id);
  }
}
