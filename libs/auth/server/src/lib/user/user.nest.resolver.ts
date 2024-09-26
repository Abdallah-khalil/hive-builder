import { Tables } from '@hive-builder/hive-db';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Request, Response } from 'express';
import { GqlAuthGuard } from '../auth-supabase/guards/gql-auth.nest.guard';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.nest.service';

@Resolver(() => User)
export class UserResolver {
  public constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'users' })
  public async findAll(@Context() ctx: { req: Request; res: Response }) {
    return this.userService.findAll(ctx);
  }

  @Query(() => User, { name: 'user' })
  public async findOne(
    @Args('id', { type: () => String }) id: string,
    @Context() ctx: { req: Request; res: Response },
  ): Promise<Tables<'users'> | null> {
    return this.userService.findOne(id, ctx);
  }

  @Mutation(() => User)
  public async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Context() ctx: { req: Request; res: Response },
  ) {
    return this.userService.update(updateUserInput.id, updateUserInput, ctx);
  }

  @Mutation(() => User)
  public async removeUser(
    @Args('id', { type: () => String }) id: string,
    @Context() ctx: { req: Request; res: Response },
  ) {
    return this.userService.remove(id, ctx);
  }
}
