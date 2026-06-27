export const THESIS_FILES_BUCKET = "thesis-files";
export const THESIS_FILES_TABLE = "thesis_files";
export const THESIS_SOURCES_TABLE = "thesis_sources";

export const thesisDatabaseSchemaSql = `
create table if not exists public.thesis_files (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text not null,
  file_type text not null,
  status text not null default 'pending',
  notes text,
  storage_path text not null,
  size_bytes bigint,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.thesis_sources (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  source_type text not null,
  status text not null default 'pending',
  expected_use text,
  related_deliverable text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.thesis_files enable row level security;
alter table public.thesis_sources enable row level security;

create policy "Users can read own thesis files"
on public.thesis_files for select
using (auth.uid() = user_id);

create policy "Users can insert own thesis files"
on public.thesis_files for insert
with check (auth.uid() = user_id);

create policy "Users can update own thesis files"
on public.thesis_files for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own thesis files"
on public.thesis_files for delete
using (auth.uid() = user_id);

create policy "Users can read own thesis sources"
on public.thesis_sources for select
using (auth.uid() = user_id);

create policy "Users can insert own thesis sources"
on public.thesis_sources for insert
with check (auth.uid() = user_id);

create policy "Users can update own thesis sources"
on public.thesis_sources for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own thesis sources"
on public.thesis_sources for delete
using (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('thesis-files', 'thesis-files', false)
on conflict (id) do nothing;

create policy "Users can read own thesis storage objects"
on storage.objects for select
using (
  bucket_id = 'thesis-files'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can upload own thesis storage objects"
on storage.objects for insert
with check (
  bucket_id = 'thesis-files'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can update own thesis storage objects"
on storage.objects for update
using (
  bucket_id = 'thesis-files'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'thesis-files'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can delete own thesis storage objects"
on storage.objects for delete
using (
  bucket_id = 'thesis-files'
  and (storage.foldername(name))[1] = auth.uid()::text
);
`.trim();
