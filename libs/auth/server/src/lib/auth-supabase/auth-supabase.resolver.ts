import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthSupabaseService } from './auth-supabase.service';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { AuthResponseType } from './entity/user-session.entity';

@Resolver()
export class AuthSupabaseResolver {
  public constructor(
    private readonly authSupabaseService: AuthSupabaseService,
  ) {}

  @Mutation(() => AuthResponseType)
  public async signup(@Args('signupInput') signupInput: SignupInput) {
    return this.authSupabaseService.signup(signupInput);
  }

  @Mutation(() => AuthResponseType)
  public async login(@Args('loginInput') loginInput: LoginInput) {
    return this.authSupabaseService.login(loginInput);
  }
}
