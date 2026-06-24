export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: "owner" | "admin" | "member" | "client";
};

export async function getCurrentUser(): Promise<AuthUser | null> {
  // Future integration point: read the Supabase Auth session here.
  return null;
}

export function isAuthProtectionEnabled() {
  return process.env.AUTH_PROTECTION_ENABLED === "true";
}
