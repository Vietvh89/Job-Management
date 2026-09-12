-- Persist each non-owner user's To-do data without exposing another user's personal lists/tasks.
-- Account owners continue to save the complete workspace document through jobflow_access('save').

alter function jobflow_private.project(jsonb,jsonb,jsonb,text) rename to project_without_todo;
alter function jobflow_private.merge_workspace(jsonb,jsonb,jsonb,jsonb,text) rename to merge_workspace_without_todo;

create function jobflow_private.project(w jsonb,p jsonb,staff jsonb,mail text) returns jsonb
language plpgsql set search_path='' as $$
declare
  r jsonb:=jobflow_private.project_without_todo(w,p,staff,mail);
  todo jsonb:=coalesce(w->'todo','{"version":1,"lists":[],"tasks":[]}'::jsonb);
  lists jsonb:='[]'::jsonb;
  tasks jsonb:='[]'::jsonb;
begin
  if coalesce((p->>'todo')::int,0)>0 then
    select coalesce(jsonb_agg(value),'[]'::jsonb) into lists
    from jsonb_array_elements(coalesce(todo->'lists','[]'::jsonb))
    where lower(value->>'owner')=lower(mail);
    select coalesce(jsonb_agg(value),'[]'::jsonb) into tasks
    from jsonb_array_elements(coalesce(todo->'tasks','[]'::jsonb))
    where lower(value->>'owner')=lower(mail);
  end if;
  return jsonb_set(r,'{todo}',jsonb_build_object('version',coalesce(todo->'version','1'::jsonb),'lists',lists,'tasks',tasks));
end;
$$;

create function jobflow_private.merge_workspace(w jsonb,n jsonb,p jsonb,staff jsonb,mail text) returns jsonb
language plpgsql set search_path='' as $$
declare
  r jsonb:=jobflow_private.merge_workspace_without_todo(w,n,p,staff,mail);
  old_todo jsonb:=coalesce(w->'todo','{"version":1,"lists":[],"tasks":[]}'::jsonb);
  new_todo jsonb:=coalesce(n->'todo','{"version":1,"lists":[],"tasks":[]}'::jsonb);
  foreign_lists jsonb;
  foreign_tasks jsonb;
  old_lists jsonb;
  old_tasks jsonb;
  incoming_lists jsonb;
  incoming_tasks jsonb;
  merged_lists jsonb;
  merged_tasks jsonb;
  level integer:=coalesce((p->>'todo')::int,0);
begin
  if level<2 then return r; end if;
  if jsonb_typeof(new_todo)<>'object'
    or jsonb_typeof(coalesce(new_todo->'lists','[]'::jsonb))<>'array'
    or jsonb_typeof(coalesce(new_todo->'tasks','[]'::jsonb))<>'array' then
    raise exception 'Invalid To-do data';
  end if;
  if exists(select 1 from jsonb_array_elements(coalesce(new_todo->'lists','[]'::jsonb)) where lower(coalesce(value->>'owner',''))<>lower(mail))
    or exists(select 1 from jsonb_array_elements(coalesce(new_todo->'tasks','[]'::jsonb)) where lower(coalesce(value->>'owner',''))<>lower(mail)) then
    raise exception 'To-do access denied' using errcode='42501';
  end if;

  select coalesce(jsonb_agg(value),'[]'::jsonb) into foreign_lists from jsonb_array_elements(coalesce(old_todo->'lists','[]'::jsonb)) where lower(coalesce(value->>'owner',''))<>lower(mail);
  select coalesce(jsonb_agg(value),'[]'::jsonb) into foreign_tasks from jsonb_array_elements(coalesce(old_todo->'tasks','[]'::jsonb)) where lower(coalesce(value->>'owner',''))<>lower(mail);
  select coalesce(jsonb_agg(value),'[]'::jsonb) into old_lists from jsonb_array_elements(coalesce(old_todo->'lists','[]'::jsonb)) where lower(value->>'owner')=lower(mail);
  select coalesce(jsonb_agg(value),'[]'::jsonb) into old_tasks from jsonb_array_elements(coalesce(old_todo->'tasks','[]'::jsonb)) where lower(value->>'owner')=lower(mail);
  select coalesce(jsonb_agg(value),'[]'::jsonb) into incoming_lists from jsonb_array_elements(coalesce(new_todo->'lists','[]'::jsonb));
  select coalesce(jsonb_agg(value),'[]'::jsonb) into incoming_tasks from jsonb_array_elements(coalesce(new_todo->'tasks','[]'::jsonb));

  merged_lists:=jobflow_private.merge_list(old_lists,incoming_lists,level);
  merged_tasks:=jobflow_private.merge_list(old_tasks,incoming_tasks,level);
  if exists(
    select 1 from jsonb_array_elements(merged_tasks) task
    where coalesce(task.value->>'listId','')<>''
      and not exists(select 1 from jsonb_array_elements(merged_lists) list where list.value->>'id'=task.value->>'listId')
  ) then raise exception 'To-do task references an unavailable list'; end if;

  return jsonb_set(r,'{todo}',jsonb_build_object('version',coalesce(new_todo->'version',old_todo->'version','1'::jsonb),'lists',foreign_lists||merged_lists,'tasks',foreign_tasks||merged_tasks));
end;
$$;

-- Register To-do in the existing privilege model and seed sensible group defaults.
create or replace function jobflow_private.defaults(level integer default 0) returns jsonb
language sql immutable set search_path='' as $$
 select jsonb_object_agg(k,to_jsonb(level)) || '{"jobManager":"assigned"}'::jsonb
 from unnest(array['clients','jobs','completedJobs','archivedJobs','completion','costs','documents','billings','reports','financials','milestones','phases','notes','schedule','todo','staff','templates','boardViews']) k;
$$;

update public.jobflow_access_groups
set permissions=jsonb_set(permissions,'{todo}',to_jsonb(case name when 'Manager' then 3 when 'Team member' then 2 else 1 end),true),
    updated_at=now()
where name in ('Manager','Team member','Read only');

update public.jobflow_members
set access_version=access_version+1
where group_id in (select id from public.jobflow_access_groups where name in ('Manager','Team member','Read only'));

revoke all on function jobflow_private.project_without_todo(jsonb,jsonb,jsonb,text) from public,anon,authenticated;
revoke all on function jobflow_private.merge_workspace_without_todo(jsonb,jsonb,jsonb,jsonb,text) from public,anon,authenticated;
revoke all on function jobflow_private.project(jsonb,jsonb,jsonb,text) from public,anon,authenticated;
revoke all on function jobflow_private.merge_workspace(jsonb,jsonb,jsonb,jsonb,text) from public,anon,authenticated;
