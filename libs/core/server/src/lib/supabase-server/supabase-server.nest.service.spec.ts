import { Test, TestingModule } from '@nestjs/testing';
import { SupabaseServerNestService } from './supabase-server.nest.service';

describe('SupabaseServerNestService', () => {
  let service: SupabaseServerNestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupabaseServerNestService],
    }).compile();

    service = module.get<SupabaseServerNestService>(SupabaseServerNestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
