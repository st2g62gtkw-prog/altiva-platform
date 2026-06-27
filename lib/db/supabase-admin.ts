import { createClient } from "@supabase/supabase-js";

import { assertSupabasePublicConfigured } from "@/lib/db/supabase";

export function getSupabaseServiceRoleKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY;
}

export function createSupabaseServiceRoleClient() {
  if (typeof window !== "undefined") {
    throw new Error("The Supabase service role client must only be created on the server.");
  }

  const publicConfig = assertSupabasePublicConfigured();
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!serviceRoleKey) {
    throw new Error("Set SUPABASE_SERVICE_ROLE_KEY before using server-side Supabase admin access.");
  }

  return createClient(publicConfig.url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
