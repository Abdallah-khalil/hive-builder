import { Test, TestingModule } from '@nestjs/testing';
import { AuthSupabaseService } from './auth-supabase.nest.service';

describe('AuthSupabaseService', () => {
  let service: AuthSupabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthSupabaseService],
    }).compile();

    service = module.get<AuthSupabaseService>(AuthSupabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
