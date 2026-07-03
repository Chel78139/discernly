import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Server-side client using the service role key. Only import this from
// server components / route handlers — never bundle it into client code.
export function getSupabaseServerClient() {
  if (!url || !serviceKey) {
    throw new Error(
      "Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, or set DATA_BACKEND=local.",
    );
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
