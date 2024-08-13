import {
  NestSupabaseConfig,
  NestSupabaseConfigFactory,
} from '../models/supabase-config';

export function createNestSupabaseConfigFactory(
  nestSupabaseConfigFactory: NestSupabaseConfigFactory,
): NestSupabaseConfig | Promise<NestSupabaseConfig> {
  return nestSupabaseConfigFactory.createNestSupabaseConfig();
}
