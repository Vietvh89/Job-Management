-- JobFlow shared workspace. Apply once through Supabase migrations.
-- The membership list is administered only through the Supabase dashboard/SQL.
create table public.jobflow_members (
  email text primary key check (email = lower(email)),
  role text not null check (role in ('admin','editor','viewer')),
  created_at timestamptz not null default now()
);
alter table public.jobflow_members enable row level security;
revoke all on public.jobflow_members from anon, authenticated;
grant select on public.jobflow_members to authenticated;
create policy member_reads_own_access on public.jobflow_members for select to authenticated
using ((select auth.uid()) is not null and email = lower((select auth.jwt())->>'email')
  and coalesce((select auth.jwt())->>'is_anonymous','false') = 'false');

create table public.jobflow_workspace (
  id text primary key check (id = 'main'),
  payload jsonb not null check (
    jsonb_typeof(payload) = 'object' and
    jsonb_typeof(payload->'jobs') = 'array' and
    jsonb_typeof(payload->'capacity') = 'object' and
    jsonb_typeof(payload->'timeline') = 'object' and
    payload ?& array['jobs','capacity','timeline'] and
    octet_length(payload::text) <= 8388608
  ),
  revision integer not null default 1 check (revision > 0),
  updated_at timestamptz not null default now(),
  updated_by uuid
);
alter table public.jobflow_workspace enable row level security;
revoke all on public.jobflow_workspace from anon, authenticated;
grant select on public.jobflow_workspace to authenticated;
grant update(payload, revision) on public.jobflow_workspace to authenticated;
create policy members_read_workspace on public.jobflow_workspace for select to authenticated
using ((select auth.uid()) is not null
  and coalesce((select auth.jwt())->>'is_anonymous','false') = 'false'
  and exists (select 1 from public.jobflow_members m
    where m.email = lower((select auth.jwt())->>'email')));
create policy editors_update_workspace on public.jobflow_workspace for update to authenticated
using ((select auth.uid()) is not null
  and coalesce((select auth.jwt())->>'is_anonymous','false') = 'false'
  and exists (select 1 from public.jobflow_members m
    where m.email = lower((select auth.jwt())->>'email') and m.role in ('admin','editor')))
with check ((select auth.uid()) is not null
  and coalesce((select auth.jwt())->>'is_anonymous','false') = 'false'
  and exists (select 1 from public.jobflow_members m
    where m.email = lower((select auth.jwt())->>'email') and m.role in ('admin','editor')));

create function public.jobflow_stamp_update() returns trigger
language plpgsql security invoker set search_path = '' as $$
begin
  if new.revision <> old.revision + 1 then
    raise exception 'Revision must increment by one' using errcode = '40001';
  end if;
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end;
$$;
revoke all on function public.jobflow_stamp_update() from public, anon, authenticated;
create trigger jobflow_stamp_update before update on public.jobflow_workspace
for each row execute function public.jobflow_stamp_update();

insert into public.jobflow_members(email,role) values ('viet.vu@crowe.vn','admin');
