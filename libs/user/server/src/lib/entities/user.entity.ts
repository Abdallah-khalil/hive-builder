import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  public id!: number;

  @Field()
  public username!: string;

  @Field()
  public email!: string;

  public password!: string;
}
