import { HiveDatabase, Tables, TablesInsert } from '@hive-builder/hive-db';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  public constructor(
    private readonly supabaseClient: SupabaseClient<HiveDatabase>,
  ) {}
  public async create(createUserInput: TablesInsert<'users'>) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const {
        data,
        error,
      }: PostgrestSingleResponse<{ data: Tables<'users'> }[]> =
        await this.supabaseClient
          .from('users')
          .insert<TablesInsert<'users'>>({
            avatar_url: createUserInput.avatar_url,
            billing_address: createUserInput.billing_address,
            full_name: createUserInput.full_name,
            id: createUserInput.id,
            payment_method: createUserInput.payment_method,
          })
          .select();

      if (error != null) {
        console.log('supabase create user error', error);
        throw new HttpException(
          {
            error: 'Error Creating User',
            status: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: error,
          },
        );
      } else {
        console.log('supabase create user ', data);
        return data;
      }
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error Creating User',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  public findAll() {
    try {
      return this.supabaseClient.from('users').select();
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error Fetching Users',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  public findOne(id: number) {
    try {
      return this.supabaseClient.from('users').select().eq('id', id);
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error Fetching User',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  public update(id: string, updateUserInput: UpdateUserInput) {
    try {
      return this.supabaseClient
        .from('users')
        .update(updateUserInput)
        .eq('id', id);
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error Updating User',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  public remove(id: number) {
    try {
      return this.supabaseClient.from('users').delete().eq('id', id);
    } catch (error) {
      throw new HttpException(
        {
          error: 'Error Removing User',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
