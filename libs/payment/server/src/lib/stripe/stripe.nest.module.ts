import { StripeModule } from '@golevelup/nestjs-stripe';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from '../product';
import { ProductPriceModule } from '../product-price';
import { SubscriptionModule } from '../subscription';
import { StripeCustomerNestService } from './stripe-customer.nest.service';
import { StripeProductWebhookService } from './stripe-product-webhook.nest.service';
import { StripeSubscriptionNestService } from './stripe-subscription.nest.service';

@Module({
  imports: [
    StripeModule.forRootAsync(StripeModule, {
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        return {
          apiKey: configService.get<string>('stripeApiKey') ?? '',

          typescript: true,
          webhookConfig: {
            requestBodyProperty: 'rawBody',
            stripeSecrets: {
              accounts:
                configService.get<string>('stripeWebhookAccountSecret') ?? '',
              accountTest:
                configService.get<string>('stripeWebhookAccountTestSecret') ??
                '',
            },
          },
        };
      },
    }),
    ProductModule,
    ProductPriceModule,
    SubscriptionModule,
  ],
  providers: [
    StripeProductWebhookService,
    StripeCustomerNestService,
    StripeSubscriptionNestService,
  ],
  exports: [StripeCustomerNestService, StripeSubscriptionNestService],
})
export class StripeNestModule {}
