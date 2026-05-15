# Supabase setup (3 min)

## 1. Create the project

1. Go to https://supabase.com → **New project**
2. Name it `notesly`, pick a region close to your users (US East / Mumbai)
3. Database password — pick anything strong, you won't need it for app code
4. Wait ~1 min for it to spin up

## 2. Run the SQL migration

1. Sidebar: **SQL Editor** → **New query**
2. Open [supabase/migrations/0001_init.sql](supabase/migrations/0001_init.sql), copy all of it
3. Paste into the SQL editor → **Run**
4. Expect "Success. No rows returned." — that means tables + RLS + signup trigger are set up.

## 3. Disable email confirmation

This makes signup instant — no verification email, no rate limits.

1. Sidebar: **Authentication → Providers → Email**
2. Toggle **Confirm email** → **OFF**
3. Click **Save**

## 4. Grab the three keys

1. Sidebar (gear icon at bottom): **Project Settings → API**
2. If you see two tabs, use the **"Legacy anon, service_role API keys"** tab.
3. Copy:
   - **Project URL** → for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret key** (click reveal) → for `SUPABASE_SERVICE_ROLE_KEY`

⚠️ `service_role` bypasses all security — keep it server-only, never paste publicly.

## 5. Add them to Vercel

1. Vercel → your project → **Settings → Environment Variables**
2. Add each. Check **Production**, **Preview**, and **Development** for all three.
3. Save.
4. **Deployments** → top deployment → **⋯ → Redeploy** (uncheck "Use existing Build Cache" if shown).

After ~90s the site comes back up. `/login` → tab is "create account" by default → email + password + confirm → instant access.
