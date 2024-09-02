import { InputType } from '@nestjs/graphql';
import { CreateStripeProductInput } from './create-stripe-product.input';

@InputType()
export class UpdateStripeProductInput extends CreateStripeProductInput {}
