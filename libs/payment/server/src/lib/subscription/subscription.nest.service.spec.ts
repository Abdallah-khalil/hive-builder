import { Test, TestingModule } from '@nestjs/testing';
import { StripeSubscriptionService } from './stripe-subscription.service';

describe('StripeSubscriptionService', () => {
  let service: StripeSubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeSubscriptionService],
    }).compile();

    service = module.get<StripeSubscriptionService>(StripeSubscriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
