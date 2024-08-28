import { Tables } from '@hive-builder/hive-db';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AuthError, AuthResponse, SupabaseClient } from '@supabase/supabase-js';
import { CreateUserInput } from '../user/dto/create-user.input';
import { UserService } from '../user/user.nest.service';
import { SignupInput } from './dto/signup.input';

@Injectable()
export class AuthSupabaseService {
  public constructor(
    private readonly userService: UserService,
    private readonly supabaseClient: SupabaseClient,
    private readonly logger: Logger,
  ) {}

  public async signup(signupInput: SignupInput) {
    const { error, data }: AuthResponse = await this.supabaseClient.auth.signUp(
      {
        email: signupInput.email,
        password: signupInput.password,
        phone: signupInput.phone,
      },
    );

    if (error != null) {
      this.handleError(error);
    }

    if (data?.user !== null) {
      console.log('Supabase auth user has been added', data.user);

      const dbUser: Tables<'users'> = await this.userService.create(
        CreateUserInput.mapToSupabase(signupInput, data.user.id),
      );

      this.logger.log('User created', JSON.stringify(dbUser));
      return {
        authSession: data.session,
        authUser: data.user,
        user: dbUser,
      };
    }

    return null;
  }

  private handleError(error: AuthError) {
    this.logger.error('supabase create user error', error);
    throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
  }
}
