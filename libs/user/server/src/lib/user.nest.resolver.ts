import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.nest.service';

@Resolver(() => User)
export class UserResolver {
  public constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  public createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

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
