import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, {
    description: 'image url for the profile',
    name: 'avatarUrl',
    nullable: true,
  })
  public avatar_url!: string | null;

  @Field(() => String, {
    description: 'billing address',
    name: 'billingAddress',
    nullable: true,
  })
  public billing_address?: string | null;

  @Field(() => String, {
    description: 'full name',
    name: 'fullName',
    nullable: true,
  })
  public full_name!: string | null;

  @Field(() => String, {
    description: 'payment method',
    name: 'paymentMethod',
    nullable: true,
  })
  public payment_method?: string | null;
}
