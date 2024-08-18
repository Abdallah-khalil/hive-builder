import { HiveDatabase } from '@hive-builder/hive-db';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { SupabaseClient } from '@supabase/supabase-js';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  public constructor(
    private readonly supabaseClient: SupabaseClient<HiveDatabase>,
  ) {}
  public async create(createUserInput: CreateUserInput, userId: string) {
    try {
      return this.supabaseClient
        .from('users')
        .insert({ ...createUserInput, id: userId })
        .select();
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
