export interface ConfigProps {
  supabaseKey: string;
  supabaseServiceKey: string;
  supabaseUrl: string;
  supabaseJwtSecret?: string;
}

export const config: () => ConfigProps = (): ConfigProps => ({
  supabaseJwtSecret: process.env.SUPABASE_JWT_SECRET ?? '',
  supabaseKey: process.env.SUPABASE_KEY ?? '',
  supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY ?? '',
  supabaseUrl: process.env.SUPABASE_URL ?? '',
});
