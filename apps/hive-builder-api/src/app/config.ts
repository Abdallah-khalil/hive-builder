export interface ConfigProps {
  supabaseKey: string;
  supabaseUrl: string;
  supabaseJwtSecret?: string;
}

export const config: () => ConfigProps = (): ConfigProps => ({
  supabaseJwtSecret: process.env.SUPABASE_JWT_SECRET ?? '',
  supabaseKey: process.env.SUPABASE_KEY ?? '',
  supabaseUrl: process.env.SUPABASE_URL ?? '',
});
