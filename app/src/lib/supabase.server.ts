// Server-only Supabase client using the SERVICE-ROLE key.
// This file must NEVER be imported from any client-side module.
// The .server.ts suffix prevents Vite from bundling this into the browser bundle.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase.types";

let _client: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in environment variables."
    );
  }
  if (!_client) {
    _client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _client;
}

/** Public anon client — safe for client-side order STATUS reads (RLS enforced). */
export function getSupabasePublic() {
  const url = process.env.SUPABASE_URL ?? import.meta.env.VITE_SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error("SUPABASE_URL / SUPABASE_ANON_KEY not configured.");
  }
  return createClient<Database>(url, anon);
}
