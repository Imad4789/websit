create table if not exists public.cms_data (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.registrations (
  id text primary key,
  full_name text not null,
  phone text not null,
  parent_phone text not null,
  academic_level text not null,
  selected_subject text not null,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id text primary key,
  full_name text not null,
  phone text,
  email text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.cms_data enable row level security;
alter table public.registrations enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "CMS data can be read" on public.cms_data;
drop policy if exists "CMS data can be inserted" on public.cms_data;
drop policy if exists "CMS data can be updated" on public.cms_data;
drop policy if exists "No public access to registrations" on public.registrations;
drop policy if exists "No public access to contact messages" on public.contact_messages;

create policy "CMS data can be read"
  on public.cms_data
  for select
  to anon, authenticated
  using (id = 'site');

create policy "CMS data can be inserted"
  on public.cms_data
  for insert
  to anon, authenticated
  with check (id = 'site');

create policy "CMS data can be updated"
  on public.cms_data
  for update
  to anon, authenticated
  using (id = 'site')
  with check (id = 'site');

do $$
begin
  alter publication supabase_realtime add table public.cms_data;
exception
  when duplicate_object then null;
end $$;

create policy "No public access to registrations"
  on public.registrations
  for all
  using (false)
  with check (false);

create policy "No public access to contact messages"
  on public.contact_messages
  for all
  using (false)
  with check (false);

create index if not exists registrations_created_at_idx on public.registrations (created_at desc);
create index if not exists registrations_level_idx on public.registrations (academic_level);
create index if not exists registrations_subject_idx on public.registrations (selected_subject);
create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);
