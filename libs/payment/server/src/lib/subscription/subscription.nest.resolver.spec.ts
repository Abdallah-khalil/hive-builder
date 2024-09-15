import { Test, TestingModule } from '@nestjs/testing';
import { StripeSubscriptionResolver } from './subscription.nest.resolver';
import { StripeSubscriptionService } from './subscription.nest.service';

describe('StripeSubscriptionResolver', () => {
  let resolver: StripeSubscriptionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeSubscriptionResolver, StripeSubscriptionService],
    }).compile();

    resolver = module.get<StripeSubscriptionResolver>(
      StripeSubscriptionResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
