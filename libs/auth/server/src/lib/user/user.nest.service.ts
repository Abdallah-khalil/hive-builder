import { ErrorHandlerService } from '@hive-builder/core-server';
import { HiveDatabase, Tables, TablesInsert } from '@hive-builder/hive-db';
import { Injectable } from '@nestjs/common';

import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  public constructor(
    private readonly supabaseClient: SupabaseClient<HiveDatabase>,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  public async create(
    createUserInput: TablesInsert<'users'>,
  ): Promise<Tables<'users'>> {
    const { data, error }: PostgrestSingleResponse<Tables<'users'>> =
      await this.supabaseClient
        .from('users')
        .insert<TablesInsert<'users'>>(createUserInput)
        .select('*')
        .single();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data as Tables<'users'>;
  }

  public async findAll() {
    const {
      data,
      error,
    }: PostgrestSingleResponse<{ data: Tables<'users'> }[]> =
      await this.supabaseClient.from('users').select();

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data;
  }

  public async findOne(id: string) {
    const { data, error }: PostgrestSingleResponse<Tables<'users'>> =
      await this.supabaseClient.from('users').select('*').eq('id', id).single();

    console.log(data);
    if (error != null) {
      this.errorHandler.handleError(error);
    }

    return data as Tables<'users'>;
  }

  public async update(id: string, updateUserInput: UpdateUserInput) {
    const { data, error }: PostgrestSingleResponse<Tables<'users'>> =
      await this.supabaseClient
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

  public remove(id: number) {
    return this.supabaseClient.from('users').delete().eq('id', id);
  }
}
