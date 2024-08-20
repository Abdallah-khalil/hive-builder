import { TablesInsert } from '@hive-builder/hive-db';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, {
    description: 'image url for the profile',
    name: 'avatarUrl',
    nullable: true,
  })
  public avatarUrl!: string | null;

  @Field(() => String, {
    description: 'billing address',
    name: 'billingAddress',
    nullable: true,
  })
  public billingAddress?: string | null;

  @Field(() => String, {
    description: 'full name',
    name: 'fullName',
    nullable: true,
  })
  public fullName!: string | null;

  @Field(() => String, {
    description: 'payment method',
    name: 'paymentMethod',
    nullable: true,
  })
  public paymentMethod?: string | null;

  public static mapToSupabase(
    createUserInput: CreateUserInput,
    userId: string,
  ): TablesInsert<'users'> {
    return {
      avatar_url: createUserInput.avatarUrl ?? null,
      billing_address: createUserInput.billingAddress ?? null,
      full_name: createUserInput.fullName ?? null,
      id: userId ?? null,
      payment_method: createUserInput.paymentMethod ?? null,
    };
  }
}
