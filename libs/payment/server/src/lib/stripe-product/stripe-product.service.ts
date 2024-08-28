import { Injectable } from '@nestjs/common';

@Injectable()
export class StripeProductService {
  public findAll() {
    return `This action returns all stripeProduct`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} stripeProduct`;
  }
}
