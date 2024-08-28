import { Test, TestingModule } from '@nestjs/testing';
import { StripeProductResolver } from './stripe-product.resolver';
import { StripeProductService } from './stripe-product.service';

describe('StripeProductResolver', () => {
  let resolver: StripeProductResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeProductResolver, StripeProductService],
    }).compile();

    resolver = module.get<StripeProductResolver>(StripeProductResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
