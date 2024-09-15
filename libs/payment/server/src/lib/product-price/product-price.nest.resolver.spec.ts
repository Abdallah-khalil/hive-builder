import { Test, TestingModule } from '@nestjs/testing';
import { ProductPriceResolver } from './product-price.nest.resolver';
import { ProductPriceService } from './product-price.nest.service';

describe('ProductPriceResolver', () => {
  let resolver: ProductPriceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductPriceResolver, ProductPriceService],
    }).compile();

    resolver = module.get<ProductPriceResolver>(ProductPriceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
