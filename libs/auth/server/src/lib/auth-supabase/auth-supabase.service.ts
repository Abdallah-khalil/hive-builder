import { TablesInsert } from '@hive-builder/hive-db';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthResponse, SupabaseClient } from '@supabase/supabase-js';
import { CreateUserInput } from '../user/dto/create-user.input';
import { UserService } from '../user/user.nest.service';
import { SignupInput } from './dto/signup.input';

@Injectable()
export class AuthSupabaseService {
  public constructor(
    private readonly userService: UserService,
    private readonly supabaseClient: SupabaseClient,
  ) {}

  public async signup(signupInput: SignupInput) {
    try {
      const { error, data }: AuthResponse =
        await this.supabaseClient.auth.signUp({
          email: signupInput.email,
          password: signupInput.password,
          phone: signupInput.phone,
        });

      if (error) {
        console.log('supabase error', error);

        throw new HttpException(
          {
            error: 'Signup Error',
            status: HttpStatus.NOT_ACCEPTABLE,
          },
          HttpStatus.NOT_ACCEPTABLE,
          {
            cause: error,
          },
        );
      }

      if (data?.user !== null) {
        console.log('Supabase auth user has been added', data.user);

        const userToCreate: TablesInsert<'users'> =
          CreateUserInput.mapToSupabase(signupInput, data.user.id);

        console.log('userToCreate', userToCreate);
        await this.userService.create(userToCreate);
      }

      return data.session;
    } catch (error) {
      throw new HttpException(
        {
          error: 'Signup Error',
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
