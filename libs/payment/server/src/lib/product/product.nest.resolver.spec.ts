import { Test, TestingModule } from '@nestjs/testing';
import { ProductResolver } from './product.nest.resolver';
import { ProductService } from './product.nest.service';

describe('ProductResolver', () => {
  let resolver: ProductResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductResolver, ProductService],
    }).compile();

    resolver = module.get<ProductResolver>(ProductResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
