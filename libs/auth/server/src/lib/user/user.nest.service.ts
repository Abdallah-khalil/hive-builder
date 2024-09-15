import {
  ErrorHandlerService,
  SupabaseServerNestService,
} from '@hive-builder/core-server';
import { Tables, TablesInsert } from '@hive-builder/hive-db';
import { Injectable } from '@nestjs/common';

import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { Request, Response } from 'express';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  public constructor(
    private readonly supabaseClient: SupabaseServerNestService,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  public async create(
    createUserInput: TablesInsert<'users'>,
    ctx: { req: Request; res: Response },
  ): Promise<Tables<'users'>> {
    const { data, error }: PostgrestSingleResponse<Tables<'users'>> =
      await this.supabaseClient
        .getSupabaseClient({ req: ctx.req })
        .from('users')
        .insert<TablesInsert<'users'>>(createUserInput)
        .select()
        .single();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data as Tables<'users'>;
  }

  public async findAll(ctx: { req: Request; res: Response }) {
    const {
      data,
      error,
    }: PostgrestSingleResponse<{ data: Tables<'users'> }[]> =
      await this.supabaseClient
        .getSupabaseClient({ req: ctx.req })
        .from('users')
        .select();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data;
  }

  public async findOne(id: string, ctx: { req: Request; res: Response }) {
    const { data, error }: PostgrestSingleResponse<Tables<'users'>> =
      await this.supabaseClient
        .getSupabaseClient({ req: ctx.req })
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

    console.log(data);
    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data as Tables<'users'>;
  }

  public async update(
    id: string,
    updateUserInput: UpdateUserInput,
    ctx: { req: Request; res: Response },
  ) {
    const { data, error }: PostgrestSingleResponse<Tables<'users'>> =
      await this.supabaseClient
        .getSupabaseClient({ req: ctx.req })
        .from('users')
        .update(updateUserInput)
        .eq('id', id)
        .select()
        .single();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data;
  }

  public async remove(id: string, ctx: { req: Request; res: Response }) {
    const { data, error }: PostgrestSingleResponse<Tables<'users'>> =
      await this.supabaseClient
        .getSupabaseClient({ req: ctx.req })
        .from('users')
        .delete()
        .eq('id', id)
        .select()
        .single();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data;
  }
}
