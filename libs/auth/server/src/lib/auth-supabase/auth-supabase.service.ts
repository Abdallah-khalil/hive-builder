import { ErrorHandlerService } from '@hive-builder/core-server';
import { Tables } from '@hive-builder/hive-db';
import { Injectable, Logger } from '@nestjs/common';
import {
  AuthResponse,
  AuthTokenResponsePassword,
  SupabaseClient,
} from '@supabase/supabase-js';
import { CreateUserInput } from '../user/dto/create-user.input';
import { UserService } from '../user/user.nest.service';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';

@Injectable()
export class AuthSupabaseService {
  public constructor(
    private readonly userService: UserService,
    private readonly supabaseClient: SupabaseClient,
    private readonly logger: Logger,
    private readonly errorHandler: ErrorHandlerService,
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
      this.errorHandler.handleError(error);
    }

    if (data?.user !== null) {
      this.logger.log('Supabase auth user has been added', data.user);

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

  public async login(loginInput: LoginInput) {
    const { error, data }: AuthTokenResponsePassword =
      await this.supabaseClient.auth.signInWithPassword({
        email: loginInput.email,
        password: loginInput.password,
      });

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    if (data?.user !== null) {
      this.logger.log('Supabase auth user Has Logged In ', data.user.email);

      const dbUser: Tables<'users'> = await this.userService.findOne(
        data.user.id,
      );

      this.logger.log('User Found in DB', JSON.stringify(dbUser));
      return {
        authSession: data.session,
        authUser: data.user,
        user: dbUser,
      };
    }

    return null;
  }
}
