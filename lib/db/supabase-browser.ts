"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { assertSupabasePublicConfigured } from "@/lib/db/supabase";

let browserClient: SupabaseClient | null = null;

export function createSupabaseBrowserClient() {
  if (browserClient) {
    return browserClient;
  }

  const config = assertSupabasePublicConfigured();

  browserClient = createClient(config.url, config.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  });

  return browserClient;
}
