import {
  ErrorHandlerService,
  SupabaseServerNestService,
} from '@hive-builder/core-server';
import { Tables, TablesInsert, TablesUpdate } from '@hive-builder/hive-db';
import { Injectable } from '@nestjs/common';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { Request, Response } from 'express';

@Injectable()
export class ProductService {
  public constructor(
    private readonly supabaseClient: SupabaseServerNestService,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  public async create(
    createProductInput: TablesInsert<'stripe_products'>,
  ): Promise<Tables<'stripe_products'>> {
    const { data, error }: PostgrestSingleResponse<Tables<'stripe_products'>> =
      await this.supabaseClient
        .getSupabaseDefaultClient()

        .from('stripe_products')
        .insert<TablesInsert<'stripe_products'>>(createProductInput)
        .select('*')
        .single();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data as Tables<'stripe_products'>;
  }

  public async findAll(ctx: { req: Request; res: Response }) {
    const {
      data,
      error,
    }: PostgrestSingleResponse<{ data: Tables<'stripe_products'> }[]> =
      await this.supabaseClient
        .getSupabaseClient({ req: ctx.req })
        .from('stripe_products')
        .select();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data;
  }

  public async findOne(
    searchKey: keyof Tables<'stripe_products'>,
    searchValue: string | number,
    ctx: { req: Request; res: Response },
  ) {
    const { data, error }: PostgrestSingleResponse<Tables<'stripe_products'>> =
      await this.supabaseClient
        .getSupabaseClient({ req: ctx.req })
        .from('stripe_products')
        .select('*')
        .eq(searchKey, searchValue)
        .single();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data;
  }

  public async update(id: string, product: TablesUpdate<'stripe_products'>) {
    const { data, error }: PostgrestSingleResponse<Tables<'stripe_products'>> =
      await this.supabaseClient
        .getSupabaseDefaultClient()
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

  public remove(id: string) {
    return this.supabaseClient
      .getSupabaseDefaultClient()
      .from('stripe_products')
      .delete()
      .eq('id', id);
  }
}
