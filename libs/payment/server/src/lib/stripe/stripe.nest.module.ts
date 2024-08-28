import { StripeModule } from '@golevelup/nestjs-stripe';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeProductWebhookService } from './stripe-product-webhook.service';
import { StripeService } from './stripe.service';

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
  ],
  providers: [StripeService, StripeProductWebhookService],
})
export class StripeNestModule {}
