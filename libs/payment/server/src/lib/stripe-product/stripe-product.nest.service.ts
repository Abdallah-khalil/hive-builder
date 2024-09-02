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
export class StripeProductService {
  public constructor(
    private readonly supabaseClient: SupabaseClient<HiveDatabase>,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  public async create(
    createProductInput: TablesInsert<'stripe_products'>,
  ): Promise<Tables<'stripe_products'>> {
    const { data, error }: PostgrestSingleResponse<Tables<'stripe_products'>> =
      await this.supabaseClient
        .from('stripe_products')
        .insert<TablesInsert<'stripe_products'>>(createProductInput)
        .select('*')
        .single();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data as Tables<'stripe_products'>;
  }

  public async findAll() {
    const {
      data,
      error,
    }: PostgrestSingleResponse<{ data: Tables<'stripe_products'> }[]> =
      await this.supabaseClient.from('stripe_products').select();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data;
  }

  public findOne(id: number) {
    return `This action returns a #${id} stripeProduct`;
  }

  public async update(id: string, product: TablesUpdate<'stripe_products'>) {
    const { data, error }: PostgrestSingleResponse<Tables<'stripe_products'>> =
      await this.supabaseClient
        .from('stripe_products')
        .update(product)
        .eq('id', id)
        .select()
        .single();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data;
  }
}
