import { Test, TestingModule } from '@nestjs/testing';
import { StripeProductWebhookService } from './stripe-product-webhook.nest.service';

describe('StripeProductWebhookService', () => {
  let service: StripeProductWebhookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeProductWebhookService],
    }).compile();

    service = module.get<StripeProductWebhookService>(
      StripeProductWebhookService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
