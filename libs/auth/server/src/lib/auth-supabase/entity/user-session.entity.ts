import { Field, ObjectType } from '@nestjs/graphql';
import { AuthUser } from '@supabase/supabase-js';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class UserSession {
  @Field(() => String, {
    description: 'image url for the profile',
    name: 'accessToken',
    nullable: true,
  })
  public access_token!: string | null;

  @Field(() => String, {
    description: 'billing address',
    name: 'refreshToken',
    nullable: true,
  })
  public refresh_token!: string | null;

  @Field(() => User, {
    description: 'full name',
    name: 'user',
    nullable: true,
  })
  public user!: AuthUser;
}
