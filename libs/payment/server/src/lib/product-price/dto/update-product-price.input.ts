import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductPriceInput } from './create-product-price.input';

@InputType()
export class UpdateStripeProductPriceInput extends PartialType(
  CreateProductPriceInput,
) {}
