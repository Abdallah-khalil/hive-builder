import { Injectable } from '@nestjs/common';
import { CreateStripeSubscriptionInput } from './dto/create-stripe-subscription.input';
import { UpdateStripeSubscriptionInput } from './dto/update-stripe-subscription.input';

@Injectable()
export class StripeSubscriptionService {
  create(createStripeSubscriptionInput: CreateStripeSubscriptionInput) {
    return 'This action adds a new stripeSubscription';
  }

  findAll() {
    return `This action returns all stripeSubscription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripeSubscription`;
  }

  update(
    id: number,
    updateStripeSubscriptionInput: UpdateStripeSubscriptionInput,
  ) {
    return `This action updates a #${id} stripeSubscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} stripeSubscription`;
  }
}
