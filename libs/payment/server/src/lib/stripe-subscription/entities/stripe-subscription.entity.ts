import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class StripeSubscription {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
