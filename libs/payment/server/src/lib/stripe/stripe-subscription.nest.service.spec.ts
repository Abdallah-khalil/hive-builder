import { Test, TestingModule } from '@nestjs/testing';
import { StripeSubscriptionNestService } from './stripe-subscription.nest.service';

describe('StripeSubscriptionNestService', () => {
  let service: StripeSubscriptionNestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeSubscriptionNestService],
    }).compile();

    service = module.get<StripeSubscriptionNestService>(
      StripeSubscriptionNestService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
