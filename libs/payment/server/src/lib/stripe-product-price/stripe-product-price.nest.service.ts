import { ErrorHandlerService } from '@hive-builder/core-server';
import {
  HiveDatabase,
  Tables,
  TablesInsert,
  TablesUpdate,
} from '@hive-builder/hive-db';
import { Injectable } from '@nestjs/common';
import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class StripeProductPriceService {
  public constructor(
    private readonly supabaseClient: SupabaseClient<HiveDatabase>,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  public async create(
    createProductPriceInput: TablesInsert<'stripe_product_prices'>,
  ): Promise<Tables<'stripe_product_prices'>> {
    const {
      data,
      error,
    }: PostgrestSingleResponse<Tables<'stripe_product_prices'>> =
      await this.supabaseClient
        .from('stripe_product_prices')
        .insert<TablesInsert<'stripe_product_prices'>>(createProductPriceInput)
        .select('*')
        .single();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data as Tables<'stripe_product_prices'>;
  }

  public async findAll() {
    const {
      data,
      error,
    }: PostgrestSingleResponse<{ data: Tables<'stripe_product_prices'> }[]> =
      await this.supabaseClient.from('stripe_product_prices').select();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data;
  }

  public findOne(id: number) {
    return `This action returns a #${id} stripeProduct`;
  }

  public async update(
    id: string,
    productPrice: TablesUpdate<'stripe_product_prices'>,
  ) {
    const {
      data,
      error,
    }: PostgrestSingleResponse<Tables<'stripe_product_prices'>> =
      await this.supabaseClient
        .from('stripe_product_prices')
        .update(productPrice)
        .eq('id', id)
        .select()
        .single();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data;
  }

  public remove(id: string) {
    return this.supabaseClient
      .from('stripe_product_prices')
      .delete()
      .eq('id', id);
  }
}
