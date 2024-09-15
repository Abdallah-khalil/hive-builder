import {
  ErrorHandlerService,
  SupabaseServerNestService,
} from '@hive-builder/core-server';
import { Tables, TablesInsert, TablesUpdate } from '@hive-builder/hive-db';
import { Injectable } from '@nestjs/common';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { Request, Response } from 'express';

@Injectable()
export class ProductPriceService {
  public constructor(
    private readonly supabaseClient: SupabaseServerNestService,
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
        .getSupabaseDefaultClient()
        .from('stripe_product_prices')
        .insert<TablesInsert<'stripe_product_prices'>>(createProductPriceInput)
        .select('*')
        .single();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data as Tables<'stripe_product_prices'>;
  }

  public async findAll(ctx: { req: Request; res: Response }) {
    const {
      data,
      error,
    }: PostgrestSingleResponse<{ data: Tables<'stripe_product_prices'> }[]> =
      await this.supabaseClient
        .getSupabaseClient({ req: ctx.req })
        .from('stripe_product_prices')
        .select();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data;
  }

  public async findOne(
    searchKey: keyof Tables<'stripe_product_prices'>,
    searchValue: string | number,
    ctx: { req: Request; res: Response },
  ) {
    const {
      data,
      error,
    }: PostgrestSingleResponse<Tables<'stripe_product_prices'>> =
      await this.supabaseClient
        .getSupabaseClient({ req: ctx.req })
        .from('stripe_product_prices')
        .select('*')
        .eq(searchKey, searchValue)
        .single();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data;
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
        .getSupabaseDefaultClient()
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
      .getSupabaseDefaultClient()
      .from('stripe_product_prices')
      .delete()
      .eq('id', id);
  }
}
