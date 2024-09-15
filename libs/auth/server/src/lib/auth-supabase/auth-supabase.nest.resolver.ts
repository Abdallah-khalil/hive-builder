import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { AuthSupabaseService } from './auth-supabase.nest.service';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { AuthResponseType } from './entity/user-session.entity';

@Resolver()
export class AuthSupabaseResolver {
  public constructor(
    private readonly authSupabaseService: AuthSupabaseService,
  ) {}

  @Mutation(() => AuthResponseType)
  public async signup(
    @Args('signupInput') signupInput: SignupInput,
    @Context() ctx: { req: Request; res: Response },
  ) {
    return this.authSupabaseService.signup(signupInput, ctx);
  }

  @Mutation(() => AuthResponseType)
  public async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() ctx: { req: Request; res: Response },
  ) {
    return this.authSupabaseService.login(loginInput, ctx);
  }
}
