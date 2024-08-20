import { Abstract, ModuleMetadata, Type } from '@nestjs/common';
import { SupabaseClientOptions } from '@supabase/supabase-js';

export interface SupabaseConfig<
  TDatabase = unknown,
  TSchemaName extends string &
    keyof TDatabase = 'public' extends keyof TDatabase
    ? 'public'
    : string & keyof TDatabase,
> {
  supabaseUrl: string;
  supabaseKey: string;
  options?: SupabaseClientOptions<TSchemaName>;
}

export interface NameSupabaseConfigPair {
  name: string;
  supabaseConfig: SupabaseConfig;
}

export interface NestSupabaseConfigFactory {
  createNestSupabaseConfig: () =>
    | NestSupabaseConfig
    | Promise<NestSupabaseConfig>;
}

export interface NestSupabaseConfigClassAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useClass: Type<NestSupabaseConfigFactory>;
}

export interface NestSupabaseConfigFactoryAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  inject?: (string | symbol | Function | Type<unknown> | Abstract<unknown>)[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFactory: (...args: any[]) => NestSupabaseConfig;
}

export class SupabaseCoreModuleInjectionSymbols {
  public static SUPABASE_CONFIG: symbol = Symbol();
  public static SUPABASE_CONFIG_FACTORY: symbol = Symbol();
}

export function isNestSupabaseConfigFactoryAsyncOptions(
  value: NestSupabaseConfigAsync,
): value is NestSupabaseConfigFactoryAsyncOptions {
  return (
    (value as NestSupabaseConfigFactoryAsyncOptions).useFactory !== undefined
  );
}

export type NestSupabaseConfig = SupabaseConfig | NameSupabaseConfigPair[];
export type NestSupabaseConfigAsync =
  | NestSupabaseConfigFactoryAsyncOptions
  | NestSupabaseConfigClassAsyncOptions;
