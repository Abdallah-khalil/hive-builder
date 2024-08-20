import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.nest.service';

@Resolver(() => User)
export class UserResolver {
  public constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'user' })
  public findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  public findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  public updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  public removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
