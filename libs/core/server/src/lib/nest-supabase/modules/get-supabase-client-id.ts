import { Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

export function getSupabaseClientId(
  clientName?: string
): string | typeof SupabaseClient {
  return clientName !== undefined
    ? `supabase_client_${clientName}`
    : SupabaseClient;
}

export const injectSupabaseClient: (
  clientName?: string
) => ParameterDecorator = (clientName?: string): ParameterDecorator =>
  Inject(getSupabaseClientId(clientName));
