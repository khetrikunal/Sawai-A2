// Thin typed wrappers around the Supabase client that bypass the broken
// `never` inference from complex Database generic types.
// All runtime behaviour is identical — only TypeScript inference changes.
import { getSupabaseAdmin } from "./supabase.server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRecord = Record<string, any>;

/**
 * Returns a Supabase table query builder that accepts plain objects for
 * insert/update/upsert without triggering `never` inference errors.
 *
 * Use this ONLY for write operations (insert / update / upsert).
 * For SELECT-only queries, use `getSupabaseAdmin().from(table)` directly.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dbTable(table: string): ReturnType<typeof getSupabaseAdmin>["from"] extends (...args: any[]) => any ? any : never {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (getSupabaseAdmin() as any).from(table) as any;
}

export { getSupabaseAdmin };
