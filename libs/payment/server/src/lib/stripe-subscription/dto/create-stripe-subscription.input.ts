import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStripeSubscriptionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
