import { Test, TestingModule } from '@nestjs/testing';
import { AuthSupabaseResolver } from './auth-supabase.nest.resolver';
import { AuthSupabaseService } from './auth-supabase.nest.service';

describe('AuthSupabaseResolver', () => {
  let resolver: AuthSupabaseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthSupabaseResolver, AuthSupabaseService],
    }).compile();

    resolver = module.get<AuthSupabaseResolver>(AuthSupabaseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
