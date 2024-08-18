import { HiveDatabase } from '@hive-builder/hive-db';
import { Inject, Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import {
  NestSupabaseConfig,
  SupabaseCoreModuleInjectionSymbols,
} from '../models/supabase-config';

const DEFAULT_CLIENT: string = 'default';

@Injectable()
export class SupabaseCoreProvider {
  private readonly supabaseClients: Map<string, SupabaseClient> = new Map();

  public constructor(
    @Inject(SupabaseCoreModuleInjectionSymbols.SUPABASE_CONFIG)
    nestSupbaseConfig: NestSupabaseConfig,
  ) {
    if (Array.isArray(nestSupbaseConfig)) {
      for (const nameSupabaseConfigPair of nestSupbaseConfig) {
        this.supabaseClients.set(
          nameSupabaseConfigPair.name,
          createClient<HiveDatabase>(
            nameSupabaseConfigPair.supabaseConfig.supabaseUrl,
            nameSupabaseConfigPair.supabaseConfig.supabaseKey,
            nameSupabaseConfigPair.supabaseConfig.options,
          ),
        );
      }
    } else {
      this.supabaseClients.set(
        DEFAULT_CLIENT,
        createClient<HiveDatabase>(
          nestSupbaseConfig.supabaseUrl,
          nestSupbaseConfig.supabaseKey,
          nestSupbaseConfig.options,
        ),
      );
    }
  }

  public getClient(clientName?: string): SupabaseClient {
    const supabaseClient: SupabaseClient | undefined = this.supabaseClients.get(
      clientName ?? DEFAULT_CLIENT,
    );

    if (supabaseClient === undefined) {
      let errorDescription: string;

      if (clientName === undefined) {
        errorDescription = 'SupabaseClient does not exist.';
      } else {
        errorDescription = `No SupabaseClient with name "${clientName}" was found.`;
      }

      throw new Error(errorDescription);
    }

    return supabaseClient;
  }
}
