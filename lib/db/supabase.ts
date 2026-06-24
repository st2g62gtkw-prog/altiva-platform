export type SupabaseEnvironment = {
  url?: string;
  anonKey?: string;
  serviceRoleKey?: string;
};

export function getSupabaseEnvironment(): SupabaseEnvironment {
  return {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  };
}

export function assertSupabaseConfigured() {
  const env = getSupabaseEnvironment();

  if (!env.url || !env.anonKey) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY before enabling database features."
    );
  }

  return env;
}

export async function createSupabaseClientPlaceholder() {
  // Future integration point:
  // 1. Install @supabase/supabase-js.
  // 2. Create a browser/server client depending on the route.
  // 3. Replace mock data reads with typed Supabase queries.
  assertSupabaseConfigured();
  throw new Error("Supabase client is prepared but not implemented yet.");
}
