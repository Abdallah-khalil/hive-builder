import { Args, Context, Query, Resolver } from '@nestjs/graphql';

import { Request, Response } from 'express';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionService } from './subscription.nest.service';

@Resolver(() => Subscription)
export class SubscriptionResolver {
  public constructor(
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Query(() => [Subscription], { name: 'subscriptions' })
  public async findAll(@Context() ctx: { req: Request; res: Response }) {
    return this.subscriptionService.findAll(ctx);
  }

  @Query(() => Subscription, { name: 'subscription' })
  public async findOne(
    @Args('id', { type: () => String }) id: string,
    @Context() ctx: { req: Request; res: Response },
  ) {
    return this.subscriptionService.findOne('id', id, ctx);
  }
}
