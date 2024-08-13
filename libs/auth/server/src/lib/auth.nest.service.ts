import { Injectable } from '@nestjs/common';

import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';

@Injectable()
export class AuthService {
  public create(createAuthInput: CreateAuthInput) {
    return 'This action adds a new auth';
  }

  public findAll() {
    return `This action returns all auth`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  public update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  public remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
