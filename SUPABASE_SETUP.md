# Supabase setup (5 min)

## 1. Create the project

1. Go to https://supabase.com → **New project**
2. Name it `notesly`, pick a region close to your users (Mumbai / Singapore for India)
3. Database password — pick anything strong, you won't need it for app code
4. Wait ~1 min for it to spin up

## 2. Run the SQL migration

1. In your Supabase project → **SQL Editor** → **New query**
2. Open the file [supabase/migrations/0001_init.sql](supabase/migrations/0001_init.sql) in your repo
3. Copy all of it → paste into the SQL editor → click **Run**
4. You should see "Success. No rows returned." — that means it created the tables, RLS policies, and signup trigger.

## 3. Configure auth

1. **Authentication → Providers → Email** — already enabled by default
2. **Authentication → URL Configuration**:
   - Site URL: `https://noteglowup.vercel.app` (or your final domain)
   - Redirect URLs: add `https://noteglowup.vercel.app/auth/callback`
   - Also add `http://localhost:3000/auth/callback` if you want to test locally

## 4. Grab the three keys

1. **Project Settings → API**
2. Copy these three values:
   - **Project URL** → for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret key** → for `SUPABASE_SERVICE_ROLE_KEY`

## 5. Add them to Vercel

1. Vercel → your project → **Settings → Environment Variables**
2. Add all three (apply to **Production** + **Preview** + **Development**)
3. Hit **Save**
4. Go to **Deployments** → click the latest deployment → **⋯ menu → Redeploy** so it picks up the new env vars

## You're done.

After redeploy:
- Visiting `/app` redirects to `/login` if you're not signed in
- Magic link arrives in your inbox in ~10s
- After clicking the link, you land on `/app` with a real quota badge
- Every conversion is saved to `conversions` table — see them at `/app/history`

## Troubleshooting

- **Magic link email not arriving?** Check spam. Supabase free tier sends from `noreply@mail.app.supabase.io` — sender reputation is decent but not perfect. For production, set up your own SMTP under Authentication → Email Templates → SMTP Settings.
- **"row violates security policy" error in DB?** RLS is blocking. Make sure the migration ran fully (re-run if needed).
- **Magic link redirects but session not set?** The Site URL / Redirect URLs in Supabase don't match. Match them exactly to your Vercel URL.
