import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthSupabaseService } from './auth-supabase.service';
import { SignupInput } from './dto/signup.input';
import { UserSession } from './entity/user-session.entity';

@Resolver(() => UserSession)
export class AuthSupabaseResolver {
  public constructor(
    private readonly authSupabaseService: AuthSupabaseService,
  ) {}

  @Mutation(() => UserSession)
  public async signup(@Args('signupInput') signupInput: SignupInput) {
    return this.authSupabaseService.signup(signupInput);
  }
}
