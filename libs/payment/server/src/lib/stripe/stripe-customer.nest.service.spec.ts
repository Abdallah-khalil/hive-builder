import { Test, TestingModule } from '@nestjs/testing';
import { StripeCustomerNestService } from './stripe-customer.nest.service';

describe('StripeCustomerNestService', () => {
  let service: StripeCustomerNestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeCustomerNestService],
    }).compile();

    service = module.get<StripeCustomerNestService>(StripeCustomerNestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
