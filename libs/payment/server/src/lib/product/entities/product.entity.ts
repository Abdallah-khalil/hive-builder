import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => String, {
    description: 'Product Name',
    name: 'name',
    nullable: true,
  })
  public name!: string | null;

  @Field(() => Boolean, {
    description: 'active',
    name: 'active',
    nullable: true,
  })
  public active!: string | null;

  @Field(() => String, {
    description: 'id',
    name: 'id',
    nullable: true,
  })
  public id!: string | null;

  @Field(() => String, {
    description: 'description',
    name: 'description',
    nullable: true,
  })
  public description!: string | null;

  @Field(() => String, {
    description: 'metadata',
    name: 'metadata',
    nullable: true,
  })
  public metadata!: string | null;

  @Field(() => String, {
    description: 'image',
    name: 'image',
    nullable: true,
  })
  public image!: string | null;

  @Field(() => String, {
    description: 'stripe_product_id',
    name: 'stripeProductId',
    nullable: true,
  })
  public stripe_product_id!: string | null;
}
