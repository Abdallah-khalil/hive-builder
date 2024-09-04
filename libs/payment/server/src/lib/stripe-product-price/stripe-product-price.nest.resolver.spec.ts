import { Test, TestingModule } from '@nestjs/testing';
import { StripeProductPriceResolver } from './stripe-product-price.nest.resolver';
import { StripeProductPriceService } from './stripe-product-price.nest.service';

describe('StripeProductPriceResolver', () => {
  let resolver: StripeProductPriceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeProductPriceResolver, StripeProductPriceService],
    }).compile();

    resolver = module.get<StripeProductPriceResolver>(
      StripeProductPriceResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
