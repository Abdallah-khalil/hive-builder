import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthResponse, SupabaseClient } from '@supabase/supabase-js';
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
      const supabaseAuthResponse: AuthResponse =
        await this.supabaseClient.auth.signUp({
          email: signupInput.email,
          password: signupInput.password,
          phone: signupInput.phone,
        });

      if (supabaseAuthResponse.data?.user) {
        await this.userService.create(
          {
            avatar_url: signupInput.avatar_url ?? '',
            billing_address: signupInput.billing_address ?? '',
            full_name: signupInput.full_name ?? '',
          },
          supabaseAuthResponse.data.user.id,
        );
      }

      return supabaseAuthResponse.data.session;
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
