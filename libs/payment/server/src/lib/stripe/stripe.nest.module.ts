import { StripeModule } from '@golevelup/nestjs-stripe';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeProductModule } from '../stripe-product';
import { StripeProductPriceModule } from '../stripe-product-price';
import { StripeProductWebhookService } from './stripe-product-webhook.nest.service';
import { StripeService } from './stripe.nest.service';

@Module({
  imports: [
    StripeModule.forRootAsync(StripeModule, {
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        return {
          apiKey: configService.get<string>('stripeSecretKey') ?? '',
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
    StripeProductModule,
    StripeProductPriceModule,
  ],
  providers: [StripeService, StripeProductWebhookService],
})
export class StripeNestModule {}
