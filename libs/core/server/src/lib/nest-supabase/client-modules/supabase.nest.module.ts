import { DynamicModule, Module } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

import {
  NestSupabaseConfig,
  NestSupabaseConfigAsync,
} from '../models/supabase-config';
import { getSupabaseClientId } from './get-supabase-client-id';
import { SupabaseCoreModule } from './supabase-core.nest.module';
import { SupabaseCoreProvider } from './supabase-core.provider';

@Module({})
export class SupabaseNestModule {
  public static forRoot(nestSupabaseConfig: NestSupabaseConfig): DynamicModule {
    return {
      imports: [SupabaseCoreModule.forRoot(nestSupabaseConfig)],
      module: SupabaseNestModule,
    };
  }

  public static forRootAsync(
    nestSupabaseConfigAsync: NestSupabaseConfigAsync,
  ): DynamicModule {
    return {
      imports: [SupabaseCoreModule.forRootAsync(nestSupabaseConfigAsync)],
      module: SupabaseNestModule,
    };
  }

  public static injectClient(...clientNames: string[]): DynamicModule {
    const initialDynamicModule: DynamicModule = {
      exports: [],
      module: SupabaseNestModule,
      providers: [],
    };

    const resolvedClientNames: (string | undefined)[] = [...clientNames];

    if (resolvedClientNames.length === 0) {
      resolvedClientNames.push(undefined);
    }

    const supabaseModule: DynamicModule =
      resolvedClientNames.reduce<DynamicModule>(
        (
          dynamicModule: DynamicModule,
          clientName: string | undefined,
        ): DynamicModule => {
          const supabaseClientId: string | typeof SupabaseClient =
            getSupabaseClientId(clientName);

          dynamicModule.exports?.push(supabaseClientId);
          dynamicModule.providers?.push({
            inject: [SupabaseCoreProvider],
            provide: supabaseClientId,
            useFactory: (supabaseCoreModuleProvider: SupabaseCoreProvider) =>
              supabaseCoreModuleProvider.getClient(clientName),
          });

          return dynamicModule;
        },
        initialDynamicModule,
      );

    return supabaseModule;
  }
}
