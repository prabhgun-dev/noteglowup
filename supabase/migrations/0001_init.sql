-- Notesly initial schema
-- Run this in Supabase → SQL Editor → New query → paste → Run.

-- profiles: one row per user, holds plan info
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  plan text not null default 'free',
  created_at timestamptz not null default now()
);

-- conversions: every successful upload/convert is saved here
create table if not exists public.conversions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  subject text,
  notes_markdown text not null,
  flashcards jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists conversions_user_created_idx
  on public.conversions(user_id, created_at desc);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.conversions enable row level security;

drop policy if exists "profiles read own" on public.profiles;
create policy "profiles read own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "conversions read own" on public.conversions;
create policy "conversions read own"
  on public.conversions for select
  using (auth.uid() = user_id);

drop policy if exists "conversions insert own" on public.conversions;
create policy "conversions insert own"
  on public.conversions for insert
  with check (auth.uid() = user_id);

drop policy if exists "conversions delete own" on public.conversions;
create policy "conversions delete own"
  on public.conversions for delete
  using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
