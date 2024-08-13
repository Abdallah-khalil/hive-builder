import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { AuthService } from './auth.nest.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';

// eslint-disable-next-line @typescript-eslint/typedef, @typescript-eslint/naming-convention
declare const Auth = '';

@Resolver(() => Auth)
export class AuthResolver {
  public constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  public createAuth(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return this.authService.create(createAuthInput);
  }

  @Query(() => [Auth], { name: 'auth' })
  public findAll() {
    return this.authService.findAll();
  }

  @Query(() => Auth, { name: 'auth' })
  public findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authService.findOne(id);
  }

  @Mutation(() => Auth)
  public updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
    return this.authService.update(updateAuthInput.id, updateAuthInput);
  }

  @Mutation(() => Auth)
  public removeAuth(@Args('id', { type: () => Int }) id: number) {
    return this.authService.remove(id);
  }
}
