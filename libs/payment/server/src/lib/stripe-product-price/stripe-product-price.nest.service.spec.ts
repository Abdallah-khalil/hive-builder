import { Test, TestingModule } from '@nestjs/testing';
import { StripeProductPriceService } from './stripe-product-price.nest.service';

describe('StripeProductPriceService', () => {
  let service: StripeProductPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeProductPriceService],
    }).compile();

    service = module.get<StripeProductPriceService>(StripeProductPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
