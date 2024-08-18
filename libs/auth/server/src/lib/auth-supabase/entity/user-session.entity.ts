import { Field, ObjectType } from '@nestjs/graphql';
import { AuthUser } from '@supabase/supabase-js';

@ObjectType()
export class UserSession {
  @Field(() => String, {
    description: 'image url for the profile',
    name: 'avatarUrl',
    nullable: true,
  })
  public access_token!: string | null;

  @Field(() => String, {
    description: 'billing address',
    name: 'billingAddress',
    nullable: true,
  })
  public refresh_token!: string | null;

  @Field(() => String, {
    description: 'full name',
    name: 'fullName',
    nullable: true,
  })
  public user!: AuthUser;
}
