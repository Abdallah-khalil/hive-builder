import { InputType, PartialType } from '@nestjs/graphql';
import { CreateStripeProductPriceInput } from './create-stripe-product-price.input';

@InputType()
export class UpdateStripeProductPriceInput extends PartialType(
  CreateStripeProductPriceInput,
) {}
