import { SupabaseClientOptions, AuthUser } from '@supabase/supabase-js';
import { JwtFromRequestFunction } from 'passport-jwt';

export interface SupabaseAuthStrategyOptions {
  supabaseUrl: string;
  supabaseKey: string;
  supabaseOptions: SupabaseClientOptions<any>;
  extractor: JwtFromRequestFunction;
}

const UNAUTHORIZED = 'Unauthorized';
const SUPABASE_AUTH = 'SUPABASE_AUTH';

export { UNAUTHORIZED, SUPABASE_AUTH };

export type SupabaseAuthUser = AuthUser;
