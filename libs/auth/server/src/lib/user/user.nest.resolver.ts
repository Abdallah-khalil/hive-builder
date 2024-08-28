import { Tables } from '@hive-builder/hive-db';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '../auth-supabase/guards/gql-auth.nest.guard';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.nest.service';

@Resolver(() => User)
export class UserResolver {
  public constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'users' })
  public async findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  public async findOne(@Args('id', { type: () => Int }) id: number): Promise<{
    data: Tables<'users'>;
  } | null> {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  public async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  public removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
