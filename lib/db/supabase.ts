export type SupabasePublicConfig = {
  url?: string;
  anonKey?: string;
};

export type ConfiguredSupabasePublicConfig = {
  url: string;
  anonKey: string;
};

export function getSupabasePublicConfig(): SupabasePublicConfig {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  };
}

export function isSupabasePublicConfigured() {
  const config = getSupabasePublicConfig();

  return Boolean(config.url && config.anonKey);
}

export function assertSupabasePublicConfigured(): ConfiguredSupabasePublicConfig {
  const config = getSupabasePublicConfig();

  if (!config.url || !config.anonKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  return {
    url: config.url,
    anonKey: config.anonKey
  };
}

export function getMissingSupabasePublicVariables() {
  const config = getSupabasePublicConfig();
  const missing: string[] = [];

  if (!config.url) {
    missing.push("NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!config.anonKey) {
    missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return missing;
}
