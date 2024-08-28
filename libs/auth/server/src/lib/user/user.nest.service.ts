import { HiveDatabase, Tables, TablesInsert } from '@hive-builder/hive-db';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import {
  PostgrestError,
  PostgrestSingleResponse,
  SupabaseClient,
} from '@supabase/supabase-js';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  public constructor(
    private readonly supabaseClient: SupabaseClient<HiveDatabase>,
  ) {}

  public async create(
    createUserInput: TablesInsert<'users'>,
  ): Promise<Tables<'users'>> {
    const { data, error }: PostgrestSingleResponse<Tables<'users'>> =
      await this.supabaseClient
        .from('users')
        .insert<TablesInsert<'users'>>({
          avatar_url: createUserInput.avatar_url,
          billing_address: createUserInput.billing_address,
          full_name: createUserInput.full_name,
          id: createUserInput.id,
          payment_method: createUserInput.payment_method,
        })
        .select('*')
        .single();

    if (error != null) {
      this.handleError(error);
    }

    console.log('supabase create user ', data);
    return data as Tables<'users'>;
  }

  public async findAll() {
    const {
      data,
      error,
    }: PostgrestSingleResponse<{ data: Tables<'users'> }[]> =
      await this.supabaseClient.from('users').select();

    if (error != null) {
      this.handleError(error);
    }

    return data;
  }

  public async findOne(id: number) {
    const { data, error }: PostgrestSingleResponse<{ data: Tables<'users'> }> =
      await this.supabaseClient.from('users').select().eq('id', id).single();

    if (error != null) {
      this.handleError(error);
    }

    return data;
  }

  public async update(id: string, updateUserInput: UpdateUserInput) {
    const {
      data,
      error,
    }: PostgrestSingleResponse<{ data: Tables<'users'> }[]> =
      await this.supabaseClient
        .from('users')
        .update(updateUserInput)
        .eq('id', id)
        .select();

    if (error != null) {
      this.handleError(error);
    }

    return data;
  }

  public remove(id: number) {
    return this.supabaseClient.from('users').delete().eq('id', id);
  }

  private handleError(error: PostgrestError) {
    console.log('supabase create user error', error);
    throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
  }
}
