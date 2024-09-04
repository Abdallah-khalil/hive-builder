import { CreateStripeSubscriptionInput } from './create-stripe-subscription.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStripeSubscriptionInput extends PartialType(
  CreateStripeSubscriptionInput,
) {
  @Field(() => Int)
  id: number;
}
