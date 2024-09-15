import {
  ErrorHandlerService,
  SupabaseServerNestService,
} from '@hive-builder/core-server';
import { Tables, TablesInsert, TablesUpdate } from '@hive-builder/hive-db';
import { Injectable } from '@nestjs/common';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { Request, Response } from 'express';

@Injectable()
export class SubscriptionService {
  public constructor(
    private readonly supabaseClient: SupabaseServerNestService,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  public async create(
    createSubscriptionInput: TablesInsert<'subscriptions'>,
  ): Promise<Tables<'subscriptions'>> {
    const { data, error }: PostgrestSingleResponse<Tables<'subscriptions'>> =
      await this.supabaseClient
        .getSupabaseDefaultClient()
        .from('subscriptions')
        .insert<TablesInsert<'subscriptions'>>(createSubscriptionInput)
        .select('*')
        .single();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data as Tables<'subscriptions'>;
  }

  public async findAll(ctx: { req: Request; res: Response }) {
    const {
      data,
      error,
    }: PostgrestSingleResponse<{ data: Tables<'subscriptions'> }[]> =
      await this.supabaseClient
        .getSupabaseClient({ req: ctx.req })
        .from('subscriptions')
        .select();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data;
  }

  public async findOne(
    searchKey: keyof Tables<'subscriptions'>,
    searchValue: string | number,
    ctx: { req: Request; res: Response },
  ) {
    const { data, error }: PostgrestSingleResponse<Tables<'subscriptions'>> =
      await this.supabaseClient
        .getSupabaseClient({ req: ctx.req })
        .from('subscriptions')
        .select('*')
        .eq(searchKey, searchValue)
        .single();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data;
  }

  public async update(id: string, subscription: TablesUpdate<'subscriptions'>) {
    const { data, error }: PostgrestSingleResponse<Tables<'subscriptions'>> =
      await this.supabaseClient
        .getSupabaseDefaultClient()
        .from('subscriptions')
        .update(subscription)
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
      .from('subscriptions')
      .delete()
      .eq('id', id);
  }
}
