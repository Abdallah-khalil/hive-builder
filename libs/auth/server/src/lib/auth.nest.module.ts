import { Module } from '@nestjs/common';

import { AuthResolver } from './auth.nest.resolver';
import { AuthService } from './auth.nest.service';

@Module({
  controllers: [],
  exports: [],
  imports: [],
  providers: [AuthResolver, AuthService],
})
export class AuthServerModule {}
