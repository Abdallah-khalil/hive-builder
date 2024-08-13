import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { createNestSupabaseConfigFactory } from './create-supabase-config';
import { SupabaseCoreProvider } from './supabase-core.provider';
import {
  isNestSupabaseConfigFactoryAsyncOptions,
  NestSupabaseConfig,
  NestSupabaseConfigAsync,
  SupabaseCoreModuleInjectionSymbols,
} from '../models/supabase-config';

@Global()
@Module({})
export class SupabaseCoreModule {
  public static forRoot(nestSupabaseConfig: NestSupabaseConfig): DynamicModule {
    return {
      exports: [SupabaseCoreProvider],
      module: SupabaseCoreModule,
      providers: [
        {
          provide: SupabaseCoreModuleInjectionSymbols.SUPABASE_CONFIG,
          useValue: nestSupabaseConfig,
        },
        SupabaseCoreProvider,
      ],
    };
  }

  public static forRootAsync(
    nestSupabaseConfigAsync: NestSupabaseConfigAsync,
  ): DynamicModule {
    const moduleProviders: Provider[] = [SupabaseCoreProvider];

    if (isNestSupabaseConfigFactoryAsyncOptions(nestSupabaseConfigAsync)) {
      moduleProviders.push({
        inject: nestSupabaseConfigAsync.inject ?? [],
        provide: SupabaseCoreModuleInjectionSymbols.SUPABASE_CONFIG,
        useFactory: nestSupabaseConfigAsync.useFactory,
      });
    } else {
      moduleProviders.push({
        provide: SupabaseCoreModuleInjectionSymbols.SUPABASE_CONFIG_FACTORY,
        useClass: nestSupabaseConfigAsync.useClass,
      });

      moduleProviders.push({
        inject: [SupabaseCoreModuleInjectionSymbols.SUPABASE_CONFIG_FACTORY],
        provide: SupabaseCoreModuleInjectionSymbols.SUPABASE_CONFIG,
        useFactory: createNestSupabaseConfigFactory,
      });
    }

    return {
      exports: [SupabaseCoreProvider],
      imports: nestSupabaseConfigAsync.imports ?? [],
      module: SupabaseCoreModule,
      providers: moduleProviders,
    };
  }
}
