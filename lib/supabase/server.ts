import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    throw new Error(
      `${name} is not set. Add Supabase env vars in Vercel → Settings → Environment Variables, then redeploy.`,
    );
  }
  return v;
}

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
    requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // no-op in Server Components; middleware handles refresh
          }
        },
      },
    },
  );
}

export function createServiceClient() {
  return createServerClient(
    requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
    requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
    {
      cookies: { getAll: () => [], setAll: () => {} },
    },
  );
}
