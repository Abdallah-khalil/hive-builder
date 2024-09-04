import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StripeSubscriptionService } from './stripe-subscription.service';
import { StripeSubscription } from './entities/stripe-subscription.entity';
import { CreateStripeSubscriptionInput } from './dto/create-stripe-subscription.input';
import { UpdateStripeSubscriptionInput } from './dto/update-stripe-subscription.input';

@Resolver(() => StripeSubscription)
export class StripeSubscriptionResolver {
  constructor(
    private readonly stripeSubscriptionService: StripeSubscriptionService,
  ) {}

  @Mutation(() => StripeSubscription)
  createStripeSubscription(
    @Args('createStripeSubscriptionInput')
    createStripeSubscriptionInput: CreateStripeSubscriptionInput,
  ) {
    return this.stripeSubscriptionService.create(createStripeSubscriptionInput);
  }

  @Query(() => [StripeSubscription], { name: 'stripeSubscription' })
  findAll() {
    return this.stripeSubscriptionService.findAll();
  }

  @Query(() => StripeSubscription, { name: 'stripeSubscription' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.stripeSubscriptionService.findOne(id);
  }

  @Mutation(() => StripeSubscription)
  updateStripeSubscription(
    @Args('updateStripeSubscriptionInput')
    updateStripeSubscriptionInput: UpdateStripeSubscriptionInput,
  ) {
    return this.stripeSubscriptionService.update(
      updateStripeSubscriptionInput.id,
      updateStripeSubscriptionInput,
    );
  }

  @Mutation(() => StripeSubscription)
  removeStripeSubscription(@Args('id', { type: () => Int }) id: number) {
    return this.stripeSubscriptionService.remove(id);
  }
}
