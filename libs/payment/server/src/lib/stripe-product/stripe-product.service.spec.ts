import { Test, TestingModule } from '@nestjs/testing';
import { StripeProductService } from './stripe-product.service';

describe('StripeProductService', () => {
  let service: StripeProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeProductService],
    }).compile();

    service = module.get<StripeProductService>(StripeProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
