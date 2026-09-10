-- Run after schema.sql. Access is checked on every request against live membership.
-- The private dispatcher is privileged only to project/merge the shared JSON document.
create schema if not exists jobflow_private;
revoke all on schema jobflow_private from public, anon;
grant usage on schema jobflow_private to authenticated;

create table public.jobflow_access_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) between 1 and 100),
  permissions jsonb not null default '{}',
  updated_at timestamptz not null default now()
);
create unique index jobflow_group_name on public.jobflow_access_groups(lower(name));
alter table public.jobflow_access_groups enable row level security;
revoke all on public.jobflow_access_groups from public, anon, authenticated;
alter table public.jobflow_members add column status text not null default 'active' check(status in ('active','inactive'));
alter table public.jobflow_members add column staff_id text unique;
alter table public.jobflow_members add column group_id uuid references public.jobflow_access_groups(id) on delete restrict;
alter table public.jobflow_members add column overrides jsonb not null default '{}';
alter table public.jobflow_members add column access_version integer not null default 1;
create index jobflow_members_group on public.jobflow_members(group_id);
create table jobflow_private.access_history (
  id bigint generated always as identity primary key,
  actor uuid not null, action text not null, target text,
  previous jsonb, current_value jsonb, created_at timestamptz not null default now()
);
alter table jobflow_private.access_history enable row level security;
revoke all on jobflow_private.access_history from public,anon,authenticated;

create function jobflow_private.defaults(level integer default 0) returns jsonb
language sql immutable set search_path='' as $$
 select jsonb_object_agg(k,to_jsonb(level)) || '{"jobManager":"assigned"}'::jsonb
 from unnest(array['clients','jobs','completedJobs','archivedJobs','completion','costs','documents','billings','reports','financials','milestones','phases','notes','schedule','staff','templates','boardViews']) k;
$$;
create function jobflow_private.valid_permissions(p jsonb) returns boolean
language sql immutable set search_path='' as $$
 select jsonb_typeof(p)='object' and not exists (
 select 1 from jsonb_each(p) e where not (jobflow_private.defaults() ? e.key)
 or (e.key='jobManager' and e.value not in ('"assigned"'::jsonb,'"all"'::jsonb))
 or (e.key<>'jobManager' and e.value not in ('0'::jsonb,'1'::jsonb,'2'::jsonb,'3'::jsonb)));
$$;
alter table public.jobflow_access_groups add constraint valid_group_permissions check(jobflow_private.valid_permissions(permissions));
alter table public.jobflow_members add constraint valid_member_permissions check(jobflow_private.valid_permissions(overrides));
-- Preserve any pre-existing non-owner roles as explicit permissions.
update public.jobflow_members set overrides=jobflow_private.defaults(case role when 'editor' then 2 else 1 end)||'{"jobManager":"all"}' where role<>'admin';
insert into public.jobflow_access_groups(name,permissions) values
 ('Manager',jobflow_private.defaults(3)||'{"jobManager":"all","staff":1,"templates":1,"boardViews":1,"costs":2,"billings":2,"financials":1,"reports":1,"clients":2,"completion":2}'),
 ('Team member',jobflow_private.defaults(0)||'{"jobs":2,"completedJobs":1,"completion":2,"documents":2,"reports":1,"milestones":1,"phases":1,"notes":2,"schedule":1,"jobManager":"assigned"}'),
 ('Read only',jobflow_private.defaults(1)||'{"jobManager":"all"}');

create function jobflow_private.allowed_job(j jsonb,p jsonb,staff jsonb,mail text) returns boolean
language sql immutable set search_path='' as $$
 select coalesce((p->>'jobs')::int,0)>0
 and (j->>'status'<>'Complete' or coalesce((p->>'completedJobs')::int,0)>0)
 and (j->>'status'<>'Cancelled' or coalesce((p->>'archivedJobs')::int,0)>0)
 and (p->>'jobManager'='all' or j->>'owner'=mail
 or (staff is not null and (j->>'owner'=staff->>'shortName'
 or coalesce(j->'teamMemberIds','[]') ? (staff->>'id')
 or coalesce(j->'team','[]') ? (staff->>'shortName'))));
$$;

create function jobflow_private.project(w jsonb,p jsonb,staff jsonb,mail text) returns jsonb
language plpgsql set search_path='' as $$
declare r jsonb:=w; jobs jsonb:='[]'; j jsonb; ids jsonb; members jsonb:='[]'; m jsonb; projects jsonb; k text;
begin
 for j in select value from jsonb_array_elements(w->'jobs') loop
  if not jobflow_private.allowed_job(j,p,staff,mail) then continue; end if;
  if (p->>'documents')::int=0 then j:=jsonb_set(j,'{documents}','[]'); end if;
  if (p->>'notes')::int=0 then j:=jsonb_set(j,'{notes}','[]'); end if;
  if (p->>'milestones')::int=0 then j:=jsonb_set(j,'{milestones}','[]'); end if;
  if (p->>'phases')::int=0 then j:=j||'{"tasks":[],"templateSnapshot":null}'; end if;
  if (p->>'clients')::int=0 then j:=j||'{"contact":"","orderNo":""}'; end if;
  if least((p->>'costs')::int,(p->>'financials')::int)=0 then j:=j||'{"spent":0,"costRate":0}'; end if;
  if least((p->>'billings')::int,(p->>'financials')::int)=0 then j:=j||'{"budget":0,"billed":0}'; end if;
  -- History can contain old values from otherwise restricted sections.
  j:=jsonb_set(j,'{history}','[]'); jobs:=jobs||jsonb_build_array(j);
 end loop;
 select coalesce(jsonb_agg(value->>'id'),'[]') into ids from jsonb_array_elements(jobs);
 r:=jsonb_set(r,'{jobs}',jobs);
 select coalesce(jsonb_agg(x.value||jsonb_build_object('items',(
  select coalesce(jsonb_agg(i.value),'[]') from jsonb_array_elements(x.value->'items') i
  where case when i.value->>'type'='milestone' then (p->>'milestones')::int>0 else (p->>'phases')::int>0 end
 ))),'[]') into projects from jsonb_array_elements(w->'timeline'->'projects') x where ids ? (x.value->>'jobId');
 r:=jsonb_set(r,'{timeline,projects}',projects);
 for m in select value from jsonb_array_elements(w->'capacity'->'members') loop
  if (p->>'staff')::int=0 then
   -- Names/IDs remain as an assignment directory; private staff details do not.
   m:=jsonb_build_object('id',m->'id','name',m->'name','shortName',m->'shortName','fullName',m->'shortName','code',m->'code','rank','','role','','department','','team','','email','','status','active','weeklyHours',40,'targetUtilization',80,'workDays','[1,1,1,1,1]'::jsonb,'allocations',m->'allocations','leaves','[]'::jsonb);
  end if;
  m:=jsonb_set(m,'{allocations}',(select coalesce(jsonb_agg(a.value),'[]') from jsonb_array_elements(coalesce(m->'allocations','[]')) a where ids ? (a.value->>'jobId') and (p->>'schedule')::int>0));
  members:=members||jsonb_build_array(m);
 end loop;
 r:=jsonb_set(r,'{capacity,members}',members);
 r:=jsonb_set(r,'{capacity,unassigned}',(select coalesce(jsonb_agg(a.value),'[]') from jsonb_array_elements(coalesce(w->'capacity'->'unassigned','[]')) a where ids ? (a.value->>'jobId') and (p->>'schedule')::int>0));
 r:=jsonb_set(r,'{times}',(select coalesce(jsonb_agg(a.value),'[]') from jsonb_array_elements(coalesce(w->'times','[]')) a where ids ? (a.value->>'jobId') and (p->>'schedule')::int>0));
 r:=r||'{"quotes":[],"invoices":[],"recurring":[]}';
 -- Templates and board definitions are needed to interpret jobs, but are read-only unless granted.
 return r;
end;
$$;

-- Merge an ID-addressed list. Unseen IDs cannot overwrite stored records; deletion requires Full Access.
create function jobflow_private.merge_list(old_list jsonb,new_list jsonb,level integer) returns jsonb
language plpgsql set search_path='' as $$
declare r jsonb:='[]'; x jsonb; n jsonb;
begin
 if level<2 then return coalesce(old_list,'[]'); end if;
 if jsonb_typeof(new_list) is distinct from 'array' then raise exception 'Invalid list'; end if;
 if exists(select 1 from jsonb_array_elements(new_list) v where coalesce(v.value->>'id','')='')
 or (select count(*) from jsonb_array_elements(new_list))<>(select count(distinct value->>'id') from jsonb_array_elements(new_list)) then raise exception 'Missing or duplicate record ID'; end if;
 for x in select value from jsonb_array_elements(coalesce(old_list,'[]')) loop
  select value into n from jsonb_array_elements(new_list) where value->>'id'=x->>'id';
  if n is not null then r:=r||jsonb_build_array(n); elsif level<3 then r:=r||jsonb_build_array(x); end if;
 end loop;
 for n in select value from jsonb_array_elements(new_list) loop
  if not exists(select 1 from jsonb_array_elements(coalesce(old_list,'[]')) x where x.value->>'id'=n->>'id') then r:=r||jsonb_build_array(n); end if;
 end loop;
 return r;
end;
$$;

-- Completion is separate from editing work structure, including nested checklists.
create function jobflow_private.merge_work(o jsonb,n jsonb,edit_level integer,complete_level integer) returns jsonb
language plpgsql set search_path='' as $$
declare r jsonb:=o; k text; children jsonb; child jsonb; prev jsonb;
begin
 if edit_level>=2 then r:=n; end if;
 foreach k in array array['progress','status','completed'] loop
  if complete_level>=2 and n ? k then r:=jsonb_set(r,array[k],n->k);
  elsif o ? k then r:=jsonb_set(r,array[k],o->k);
  elsif k='status' then r:=r||'{"status":"Planned"}'; elsif k='progress' then r:=r||'{"progress":0}'; else r:=r||'{"completed":false}'; end if;
 end loop;
 foreach k in array array['subtasks','checklist'] loop
  if o ? k or n ? k then
   children:='[]';
   for child in select value from jsonb_array_elements(jobflow_private.merge_list(o->k,coalesce(n->k,'[]'),edit_level)) loop
    select value into prev from jsonb_array_elements(coalesce(o->k,'[]')) where value->>'id'=child->>'id';
    if edit_level<2 then select value into child from jsonb_array_elements(coalesce(n->k,'[]')) where value->>'id'=prev->>'id'; child:=coalesce(child,prev); end if;
    children:=children||jsonb_build_array(jobflow_private.merge_work(coalesce(prev,'{}'),child,edit_level,complete_level));
   end loop;
   r:=jsonb_set(r,array[k],children);
  end if;
 end loop;
 return r;
end;
$$;

create function jobflow_private.merge_scoped(o jsonb,n jsonb,ids jsonb,level integer) returns jsonb
language plpgsql set search_path='' as $$
declare visible jsonb; hidden jsonb; incoming jsonb;
begin
 select coalesce(jsonb_agg(value),'[]') into visible from jsonb_array_elements(coalesce(o,'[]')) where ids ? (value->>'jobId');
 select coalesce(jsonb_agg(value),'[]') into hidden from jsonb_array_elements(coalesce(o,'[]')) where not (ids ? (value->>'jobId'));
 select coalesce(jsonb_agg(value),'[]') into incoming from jsonb_array_elements(coalesce(n,'[]')) where ids ? (value->>'jobId');
 if exists(select 1 from jsonb_array_elements(incoming) a join jsonb_array_elements(hidden) b on a.value->>'id'=b.value->>'id') then raise exception 'Record is outside your job scope' using errcode='42501'; end if;
 return hidden||jobflow_private.merge_list(visible,incoming,level);
end;
$$;

create function jobflow_private.merge_workspace(w jsonb,n jsonb,p jsonb,staff jsonb,mail text) returns jsonb
language plpgsql set search_path='' as $$
declare r jsonb:=w; jobs jsonb:='[]'; j jsonb; incoming jsonb; result_job jsonb; k text; level integer; ids jsonb; editable_ids jsonb; projects jsonb:='[]'; pr jsonb; np jsonb; items jsonb; it jsonb; ni jsonb; result_items jsonb; members jsonb:='[]'; m jsonb; nm jsonb; allocations jsonb; merged_jobs jsonb:='[]'; merged_item jsonb;
begin
 if jsonb_typeof(n->'jobs') is distinct from 'array' then raise exception 'Invalid jobs'; end if;
 if (select count(*) from jsonb_array_elements(n->'jobs'))<>(select count(distinct value->>'id') from jsonb_array_elements(n->'jobs')) then raise exception 'Duplicate job IDs'; end if;
 for incoming in select value from jsonb_array_elements(n->'jobs') loop
  select value into j from jsonb_array_elements(w->'jobs') where value->>'id'=incoming->>'id';
  if j is not null and not jobflow_private.allowed_job(j,p,staff,mail) then raise exception 'Job access denied' using errcode='42501'; end if;
  if j is null and ((p->>'jobs')::int<2 or not jobflow_private.allowed_job(incoming,p,staff,mail)) then raise exception 'Cannot create this job' using errcode='42501'; end if;
 end loop;
 for j in select value from jsonb_array_elements(w->'jobs') union all select value from jsonb_array_elements(n->'jobs') a where not exists(select 1 from jsonb_array_elements(w->'jobs') b where a.value->>'id'=b.value->>'id') loop
  select value into incoming from jsonb_array_elements(n->'jobs') where value->>'id'=j->>'id';
  if not jobflow_private.allowed_job(j,p,staff,mail) then jobs:=jobs||jsonb_build_array(j); continue; end if;
  level:=least((p->>'jobs')::int,case j->>'status' when 'Complete' then (p->>'completedJobs')::int when 'Cancelled' then (p->>'archivedJobs')::int else 3 end);
  if incoming is null then if level<3 then jobs:=jobs||jsonb_build_array(j); end if; continue; end if;
  -- New records start without protected data; apply exactly the same field rules as updates.
  if not exists(select 1 from jsonb_array_elements(w->'jobs') x where x.value->>'id'=j->>'id') then
   j:=jsonb_build_object('id',j->'id','documents','[]'::jsonb,'notes','[]'::jsonb,'tasks','[]'::jsonb,'milestones','[]'::jsonb,'budget',0,'spent',0,'billed',0,'history','[]'::jsonb,'status','Planning','progress',0);
  end if;
  result_job:=j;
  if level>=2 then result_job:=result_job||(incoming-array['documents','notes','tasks','milestones','budget','spent','billed','costRate','history','contact','orderNo','progress']); end if;
  if level>=2 and incoming->>'status'='Complete' and (p->>'completion')::int<2 then result_job:=jsonb_set(result_job,'{status}',j->'status'); end if;
  if (p->>'clients')::int>=2 then foreach k in array array['contact','orderNo'] loop if incoming ? k then result_job:=jsonb_set(result_job,array[k],incoming->k); end if; end loop; end if;
  foreach k in array array['documents','notes'] loop result_job:=jsonb_set(result_job,array[k],jobflow_private.merge_list(j->k,coalesce(incoming->k,'[]'),least(level, (p->>k)::int))); end loop;
  if least(level,(p->>'costs')::int)>=2 and (p->>'financials')::int>0 then result_job:=result_job||jsonb_build_object('spent',coalesce(incoming->'spent','0'),'costRate',coalesce(incoming->'costRate','0')); end if;
  if least(level,(p->>'billings')::int)>=2 and (p->>'financials')::int>0 then result_job:=result_job||jsonb_build_object('budget',coalesce(incoming->'budget','0'),'billed',coalesce(incoming->'billed','0')); end if;
  -- Cached arrays and progress are rebuilt from authorized project items below.
  jobs:=jobs||jsonb_build_array(result_job);
 end loop;
 select coalesce(jsonb_agg(value->>'id'),'[]') into ids from jsonb_array_elements(jobs);
 for pr in select value from jsonb_array_elements(w->'timeline'->'projects') union all select value from jsonb_array_elements(n->'timeline'->'projects') a where not exists(select 1 from jsonb_array_elements(w->'timeline'->'projects') b where a.value->>'jobId'=b.value->>'jobId') loop
  if not (ids ? (pr->>'jobId')) then continue; end if;
  select value into j from jsonb_array_elements(jobs) where value->>'id'=pr->>'jobId';
  select value into np from jsonb_array_elements(n->'timeline'->'projects') where value->>'jobId'=pr->>'jobId';
  if np is null or not jobflow_private.allowed_job(j,p,staff,mail) then projects:=projects||jsonb_build_array(pr); continue; end if;
  if not exists(select 1 from jsonb_array_elements(w->'timeline'->'projects') x where x.value->>'jobId'=pr->>'jobId') then pr:=pr||'{"items":[]}'; end if;
  result_items:='[]';
  foreach k in array array['phases','milestones'] loop
   select coalesce(jsonb_agg(value),'[]') into items from jsonb_array_elements(pr->'items') where (value->>'type'='milestone')=(k='milestones');
   select coalesce(jsonb_agg(value),'[]') into allocations from jsonb_array_elements(np->'items') where (value->>'type'='milestone')=(k='milestones');
   level:=least((p->>'jobs')::int,(p->>k)::int,case j->>'status' when 'Complete' then (p->>'completedJobs')::int when 'Cancelled' then (p->>'archivedJobs')::int else 3 end);
   for it in select value from jsonb_array_elements(jobflow_private.merge_list(items,allocations,level)) loop
    select value into ni from jsonb_array_elements(allocations) where value->>'id'=it->>'id';
    select value into incoming from jsonb_array_elements(items) where value->>'id'=it->>'id';
    merged_item:=jobflow_private.merge_work(coalesce(incoming,'{}'),coalesce(ni,it),level,case when (p->>k)::int=0 then 0 else least((p->>'jobs')::int,(p->>'completion')::int,case j->>'status' when 'Complete' then (p->>'completedJobs')::int when 'Cancelled' then (p->>'archivedJobs')::int else 3 end) end);
    if (p->>'schedule')::int>=2 and (p->>k)::int>0 and ni is not null and incoming is not null and (p->>'jobs')::int>=2 then
      merged_item:=merged_item||(select coalesce(jsonb_object_agg(key,value),'{}') from jsonb_each(ni) where key in ('start','duration','due','dependency'));
    end if;
    result_items:=result_items||jsonb_build_array(merged_item);
   end loop;
  end loop;
  projects:=projects||jsonb_build_array(pr||jsonb_build_object('items',result_items));
 end loop;
 r:=jsonb_set(r,'{timeline,projects}',projects);
 for j in select value from jsonb_array_elements(jobs) loop
  if not jobflow_private.allowed_job(j,p,staff,mail) then merged_jobs:=merged_jobs||jsonb_build_array(j); continue; end if;
  select value into pr from jsonb_array_elements(projects) where value->>'jobId'=j->>'id';
  if pr is not null then
   j:=jsonb_set(j,'{tasks}',(select coalesce(jsonb_agg(jsonb_build_array(value->>'name',coalesce((value->>'progress')::numeric,0)=100,coalesce(value->>'estimatedHours','8')||'h',value->>'id')),'[]') from jsonb_array_elements(pr->'items') where value->>'type'='task'));
   j:=jsonb_set(j,'{milestones}',(select coalesce(jsonb_agg(jsonb_build_array(value->>'name',to_char(date '2026-09-01'+(value->>'start')::int,'YYYY-MM-DD'),value->>'id')),'[]') from jsonb_array_elements(pr->'items') where value->>'type'='milestone'));
  end if;
  if pr is not null then
    j:=jsonb_set(j,'{progress}',to_jsonb(coalesce((select round(avg((value->>'progress')::numeric)) from jsonb_array_elements(pr->'items') where value->>'type'='task'),0)));
  end if;
  merged_jobs:=merged_jobs||jsonb_build_array(j);
 end loop;
 -- Use merged jobs (including creations/deletions) with the rebuilt cache fields.
 r:=jsonb_set(r,'{jobs}',merged_jobs);
 select coalesce(jsonb_agg(value->>'id'),'[]') into editable_ids from jsonb_array_elements(w->'jobs')
 where jobflow_private.allowed_job(value,p,staff,mail) and (p->>'jobs')::int>=2
 and (value->>'status'<>'Complete' or (p->>'completedJobs')::int>=2)
 and (value->>'status'<>'Cancelled' or (p->>'archivedJobs')::int>=2);
 if (p->>'schedule')::int>=2 then
  for m in select value from jsonb_array_elements(w->'capacity'->'members') loop
   select value into nm from jsonb_array_elements(n->'capacity'->'members') where value->>'id'=m->>'id';
   if nm is not null then
    allocations:=jobflow_private.merge_scoped(m->'allocations',coalesce(nm->'allocations','[]'),editable_ids,(p->>'schedule')::int);
    m:=jsonb_set(m,'{allocations}',allocations);
   end if;
   members:=members||jsonb_build_array(m);
  end loop;
  r:=jsonb_set(r,'{capacity,members}',members);
  r:=jsonb_set(r,'{times}',jobflow_private.merge_scoped(coalesce(w->'times','[]'),coalesce(n->'times','[]'),editable_ids,(p->>'schedule')::int));
  r:=jsonb_set(r,'{capacity,unassigned}',jobflow_private.merge_scoped(coalesce(w->'capacity'->'unassigned','[]'),coalesce(n->'capacity'->'unassigned','[]'),editable_ids,(p->>'schedule')::int));
 end if;
 -- Settings and staff administration are reserved to account owners; group rights here are view-only.
 return r;
end;
$$;

create function jobflow_private.api(action text,args jsonb) returns jsonb
language plpgsql security definer set search_path='' as $$
declare mail text:=lower(auth.jwt()->>'email'); m public.jobflow_members; w public.jobflow_workspace; p jsonb; s jsonb; g public.jobflow_access_groups; target public.jobflow_members; result jsonb; before_value jsonb; member_email text; perms jsonb; gid uuid; j jsonb; old_job jsonb; audited jsonb:='[]';
begin
 if auth.uid() is null or coalesce(auth.jwt()->>'is_anonymous','false')<>'false' then raise exception 'Sign in required' using errcode='42501'; end if;
 -- Serialize ACL changes and workspace saves so a revoked permission cannot race a write.
 perform pg_advisory_xact_lock(71423011);
 select * into m from public.jobflow_members where email=mail;
 if m.email is null or m.status<>'active' then raise exception 'Access not granted or inactive' using errcode='42501'; end if;
 select * into w from public.jobflow_workspace where id='main';
 select value into s from jsonb_array_elements(w.payload->'capacity'->'members') where value->>'id'=m.staff_id or (m.staff_id is null and lower(value->>'email')=mail) limit 1;
 if m.staff_id is not null and (s is null or coalesce(s->>'status','active')<>'active' or lower(s->>'email') is distinct from mail) then raise exception 'Staff profile inactive or email changed' using errcode='42501'; end if;
 select * into g from public.jobflow_access_groups where id=m.group_id;
 p:=case when m.role='admin' then jobflow_private.defaults(3)||'{"jobManager":"all"}' else jobflow_private.defaults(0)||coalesce(g.permissions,'{}')||m.overrides end;
 result:=jsonb_build_object('email',mail,'role',m.role,'staffId',s->>'id','permissions',p,'accessVersion',m.access_version,'revision',w.revision);
 if action='status' then return result; end if;
 if action='load' then
  result:=result||jsonb_build_object('payload',case when m.role='admin' then w.payload else jobflow_private.project(w.payload,p,s,mail) end);
  if m.role='admin' then result:=result||jsonb_build_object('groups',(select coalesce(jsonb_agg(to_jsonb(x) order by name),'[]') from public.jobflow_access_groups x),'members',(select coalesce(jsonb_agg(to_jsonb(x) order by email),'[]') from public.jobflow_members x)); end if;
  return result;
 end if;
 if action='save' then
  if (args->>'revision')::int is distinct from w.revision or (args->>'accessVersion')::int is distinct from m.access_version then raise exception 'Data or permissions changed. Reload first.' using errcode='40001'; end if;
  if m.role<>'admin' and not exists(select 1 from jsonb_each(p) where key<>'jobManager' and value in ('2'::jsonb,'3'::jsonb)) then raise exception 'Read-only account' using errcode='42501'; end if;
  result:=case when m.role='admin' then args->'payload' else jobflow_private.merge_workspace(w.payload,args->'payload',p,s,mail) end;
  if m.role<>'admin' then
   for j in select value from jsonb_array_elements(result->'jobs') loop
    select value into old_job from jsonb_array_elements(w.payload->'jobs') where value->>'id'=j->>'id';
    if j is distinct from old_job or (select value->'items' from jsonb_array_elements(result->'timeline'->'projects') where value->>'jobId'=j->>'id') is distinct from (select value->'items' from jsonb_array_elements(w.payload->'timeline'->'projects') where value->>'jobId'=j->>'id') then
     j:=jsonb_set(j,'{history}',jsonb_build_array(jsonb_build_object('id',gen_random_uuid(),'timestamp',extract(epoch from now())*1000,'date',now(),'actor',mail,'source','job','action','Updated job','oldValue',old_job->>'status','newValue',j->>'status','text',mail||' updated authorized job fields.'))||coalesce(old_job->'history','[]'));
    end if;
    audited:=audited||jsonb_build_array(j);
   end loop;
   result:=jsonb_set(result,'{jobs}',audited);
  end if;
  -- Active is the default; existing emails are preserved and new ones may be blank.
  if exists(select 1 from jsonb_array_elements(result->'capacity'->'members') a where coalesce(a.value->>'status','active') not in ('active','inactive')) then raise exception 'Invalid staff status'; end if;
  if exists(select 1 from jsonb_array_elements(result->'capacity'->'members') a where coalesce(a.value->>'email','')<>'' group by lower(a.value->>'email') having count(*)>1) then raise exception 'Staff emails must be unique'; end if;
  if m.staff_id is not null and m.role='admin' and not exists(select 1 from jsonb_array_elements(result->'capacity'->'members') a where a.value->>'id'=m.staff_id and coalesce(a.value->>'status','active')='active' and lower(a.value->>'email')=mail) then raise exception 'Cannot disable or unlink your own Account Owner profile'; end if;
  update public.jobflow_workspace set payload=result,revision=w.revision+1 where id='main' returning * into w;
  return jsonb_build_object('revision',w.revision,'updated_at',w.updated_at,'payload',case when m.role='admin' then w.payload else jobflow_private.project(w.payload,p,s,mail) end);
 end if;
 if m.role<>'admin' then raise exception 'Only account owners can manage access' using errcode='42501'; end if;
 if (args->>'revision')::int is distinct from w.revision then raise exception 'Data changed. Reload first.' using errcode='40001'; end if;
 if action='save_group' then
  perms:=args->'permissions'; if not coalesce(jobflow_private.valid_permissions(perms),false) then raise exception 'Invalid permissions'; end if;
  gid:=nullif(args->>'id','')::uuid;
  select to_jsonb(x) into before_value from public.jobflow_access_groups x where id=gid;
  if gid is null then insert into public.jobflow_access_groups(name,permissions) values(trim(args->>'name'),perms) returning id into gid;
  else update public.jobflow_access_groups set name=trim(args->>'name'),permissions=perms,updated_at=now() where id=gid; if not found then raise exception 'Group not found'; end if; end if;
  update public.jobflow_members set access_version=access_version+1 where group_id=gid;
  result:=jsonb_build_object('id',gid,'name',args->>'name','permissions',perms);
 elsif action='delete_group' then
  gid:=(args->>'id')::uuid;
  if exists(select 1 from public.jobflow_members where group_id=gid) then raise exception 'Group is assigned to users. Reassign them before deleting.'; end if;
  select to_jsonb(x) into before_value from public.jobflow_access_groups x where id=gid;
  delete from public.jobflow_access_groups where id=gid; result:='{}';
 elsif action='save_member' then
  select * into target from public.jobflow_members where email=args->>'originalEmail';
  before_value:=to_jsonb(target);
  if target.role='admin' and target.email=mail then raise exception 'You cannot change your own account-owner access'; end if;
  select value into s from jsonb_array_elements(w.payload->'capacity'->'members') where value->>'id'=args->>'staffId';
  member_email:=lower(trim(s->>'email'));
  if s is null or coalesce(member_email,'')='' or member_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then raise exception 'Set a valid email in Staff Master first'; end if;
  if exists(select 1 from public.jobflow_members x where x.email=member_email and x.email is distinct from target.email) then raise exception 'Email already has access'; end if;
  perms:=coalesce(args->'overrides','{}'); if not jobflow_private.valid_permissions(perms) then raise exception 'Invalid permissions'; end if;
  if target.email is not null then delete from public.jobflow_members where email=target.email; end if;
  insert into public.jobflow_members(email,role,status,staff_id,group_id,overrides,access_version)
  values(member_email,case when args->>'role'='admin' then 'admin' else 'editor' end,coalesce(args->>'status','active'),s->>'id',nullif(args->>'groupId','')::uuid,perms,coalesce(target.access_version,0)+1);
  result:=jsonb_build_object('email',member_email,'role',args->>'role','status',args->>'status','groupId',args->>'groupId','overrides',perms);
 else raise exception 'Unknown operation'; end if;
 insert into jobflow_private.access_history(actor,action,target,previous,current_value) values(auth.uid(),action,coalesce(member_email,gid::text),before_value,result);
 update public.jobflow_workspace set revision=w.revision+1 where id='main' returning revision into w.revision;
 return result||jsonb_build_object('revision',w.revision);
end;
$$;

revoke all on all functions in schema jobflow_private from public,anon,authenticated;
grant execute on function jobflow_private.api(text,jsonb) to authenticated;
create function public.jobflow_access(action text,args jsonb default '{}') returns jsonb
language sql security invoker set search_path='' as $$ select jobflow_private.api(action,args); $$;
revoke all on function public.jobflow_access(text,jsonb) from public,anon;
grant execute on function public.jobflow_access(text,jsonb) to authenticated;
-- Direct access to the unfiltered document is closed; every browser goes through the checked API.
revoke all on public.jobflow_workspace from authenticated;
revoke update(payload,revision) on public.jobflow_workspace from authenticated;
revoke all on public.jobflow_members from authenticated;
update public.jobflow_workspace set payload=jsonb_set(payload,'{capacity,members}',(select jsonb_agg(value||jsonb_build_object('status',coalesce(value->>'status','active'),'email',coalesce(value->>'email',''))) from jsonb_array_elements(payload->'capacity'->'members'))),revision=revision+1 where id='main';
