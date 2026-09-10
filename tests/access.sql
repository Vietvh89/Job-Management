-- Run in a transaction AFTER access-control.sql and roll back. No real accounts/data are changed.
do $$
declare w jsonb; p jsonb; s jsonb; r jsonb; n jsonb; g uuid; a jsonb; b jsonb; result jsonb; rev integer; owner_email text;
begin
 s:='{"id":"test-staff","shortName":"TEST","email":"access-test@example.invalid","status":"active"}';
 a:='{"id":"test-a","name":"Assigned","client":"A","owner":"TEST","status":"Planning","progress":0,"tasks":[],"milestones":[],"documents":[{"id":"doc","name":"Private document"}],"notes":[],"budget":12345,"billed":400,"spent":300,"history":[]}';
 b:='{"id":"test-b","name":"Hidden","client":"Hidden client","owner":"OTHER","status":"Planning","tasks":[],"milestones":[],"documents":[],"notes":[],"budget":99999,"history":[]}';
 w:=jsonb_build_object('jobs',jsonb_build_array(a,b),'capacity',jsonb_build_object('members',jsonb_build_array(s||'{"allocations":[{"id":"al-b","jobId":"test-b"}],"leaves":[]}'),'unassigned','[]'::jsonb),'timeline','{"projects":[{"jobId":"test-a","items":[{"id":"phase","type":"phase","name":"Phase","start":0,"duration":1,"progress":0,"status":"Planned"},{"id":"task","type":"task","name":"Task","parentPhaseId":"phase","start":0,"duration":1,"progress":0,"status":"Planned","subtasks":[{"id":"sub","name":"Sub","completed":false,"checklist":[]}],"checklist":[]}]},{"jobId":"test-b","items":[]}]}'::jsonb,'times','[]'::jsonb,'quotes','[]'::jsonb,'invoices','[]'::jsonb,'recurring','[]'::jsonb,'jobTemplates','[]'::jsonb,'boardViews','[]'::jsonb);
 p:=jobflow_private.defaults(0)||'{"jobs":2,"phases":1,"completion":2,"notes":2,"schedule":1}';
 r:=jobflow_private.project(w,p,s,'access-test@example.invalid');
 if jsonb_array_length(r->'jobs')<>1 or r->'jobs'->0->>'name'<>'Assigned' or r->'jobs'->0->'documents'<>'[]' or r->'jobs'->0->>'budget'<>'0' or r->'capacity'->'members'->0->'allocations'<>'[]' then raise exception 'Projection leaked restricted data'; end if;
 n:=jsonb_set(r,'{jobs,0,name}','"Changed name"');
 n:=jsonb_set(n,'{jobs,0,budget}','987654');
 n:=jsonb_set(n,'{jobs,0,documents}','[{"id":"injected","name":"bad"}]');
 n:=jsonb_set(n,'{timeline,projects,0,items,1,progress}','100');
 n:=jsonb_set(n,'{timeline,projects,0,items,1,status}','"Complete"');
 n:=jsonb_set(n,'{timeline,projects,0,items,1,name}','"Forbidden rename"');
 n:=jsonb_set(n,'{timeline,projects,0,items,1,subtasks,0,completed}','true');
 result:=jobflow_private.merge_workspace(w,n,p,s,'access-test@example.invalid');
 if result->'jobs'->0->>'name'<>'Changed name' or result->'jobs'->0->>'budget'<>'12345' or result->'jobs'->0->'documents'<>a->'documents' or result->'jobs'->1<>b then raise exception 'Merge overwrote protected or hidden data'; end if;
 if result->'timeline'->'projects'->0->'items'->1->>'name'<>'Task' or result->'timeline'->'projects'->0->'items'->1->>'progress'<>'100' or result->'timeline'->'projects'->0->'items'->1->'subtasks'->0->>'completed'<>'true' then raise exception 'Completion permission failed'; end if;
 p:=p||'{"completion":0}';result:=jobflow_private.merge_workspace(w,n,p,s,'access-test@example.invalid');
 if result->'timeline'->'projects'->0->'items'->1->>'progress'<>'0' then raise exception 'Completion denial failed'; end if;
 n:=jsonb_set(r,'{jobs}','[]');result:=jobflow_private.merge_workspace(w,n,p,s,'access-test@example.invalid');
 if jsonb_array_length(result->'jobs')<>2 then raise exception 'Edit access deleted a job'; end if;
 p:=p||'{"jobs":3}';result:=jobflow_private.merge_workspace(w,n,p,s,'access-test@example.invalid');
 if jsonb_array_length(result->'jobs')<>1 or result->'jobs'->0->>'id'<>'test-b' then raise exception 'Full access deletion did not preserve hidden job'; end if;
 begin
  n:=jsonb_set(r,'{jobs}',r->'jobs'||jsonb_build_array(b));perform jobflow_private.merge_workspace(w,n,p,s,'access-test@example.invalid');
  raise exception 'Hidden job injection allowed';
 exception when insufficient_privilege then null; end;
 if jobflow_private.allowed_job(a||'{"status":"Complete"}',p,s,'access-test@example.invalid') then raise exception 'Completed jobs leaked'; end if;
 if jobflow_private.allowed_job(a||'{"status":"Cancelled"}',p,s,'access-test@example.invalid') then raise exception 'Archived jobs leaked'; end if;
 if jobflow_private.valid_permissions('{"jobs":99}') or jobflow_private.valid_permissions('{"unknown":3}') then raise exception 'Invalid permissions accepted'; end if;
 -- Live API checks use an isolated fake workspace and membership inside this rolled-back transaction.
 update public.jobflow_workspace set payload=w,revision=revision+1 where id='main';
 insert into public.jobflow_members(email,role,staff_id,overrides) values('access-test@example.invalid','editor','test-staff',p);
 perform set_config('request.jwt.claims','{"sub":"11111111-1111-4111-8111-111111111111","email":"access-test@example.invalid","role":"authenticated"}',true);
 result:=public.jobflow_access('load');
 if jsonb_array_length(result->'payload'->'jobs')<>1 or result ? 'members' then raise exception 'API leaked member list'; end if;
 begin perform public.jobflow_access('save_group','{}');raise exception 'Editor changed ACL';exception when insufficient_privilege then null;end;
 begin perform public.jobflow_access('save',jsonb_build_object('payload',r,'revision',0,'accessVersion',1));raise exception 'Stale save accepted';exception when serialization_failure then null;end;
 update public.jobflow_members set status='inactive' where email='access-test@example.invalid';
 begin perform public.jobflow_access('load');raise exception 'Inactive login accepted';exception when insufficient_privilege then null;end;
 update public.jobflow_members set status='active' where email='access-test@example.invalid';
 update public.jobflow_workspace set payload=jsonb_set(payload,'{capacity,members,0,status}','"inactive"'),revision=revision+1 where id='main';
 begin perform public.jobflow_access('load');raise exception 'Inactive staff accepted';exception when insufficient_privilege then null;end;
 perform set_config('request.jwt.claims','{"sub":"11111111-1111-4111-8111-111111111111","email":"outsider@example.invalid","role":"authenticated"}',true);
 begin perform public.jobflow_access('load');raise exception 'Outsider accepted';exception when insufficient_privilege then null;end;
 if has_table_privilege('authenticated','public.jobflow_workspace','select') or has_column_privilege('authenticated','public.jobflow_workspace','payload','update') then raise exception 'Raw workspace accessible'; end if;
 if has_function_privilege('anon','public.jobflow_access(text,jsonb)','execute') or has_function_privilege('authenticated','jobflow_private.project(jsonb,jsonb,jsonb,text)','execute') then raise exception 'Private helper accessible'; end if;
 select email into owner_email from public.jobflow_members where role='admin' and status='active' limit 1;
 perform set_config('request.jwt.claims',jsonb_build_object('sub','22222222-2222-4222-8222-222222222222','email',owner_email,'role','authenticated')::text,true);
 select revision into rev from public.jobflow_workspace where id='main';
 result:=public.jobflow_access('save_group',jsonb_build_object('name','SQL test group','permissions','{"jobs":2,"documents":3,"jobManager":"all"}'::jsonb,'revision',rev));
 g:=(result->>'id')::uuid;rev:=(result->>'revision')::int;
 -- Reactivate the fixture staff and use the supported member assignment API.
 update public.jobflow_workspace set payload=jsonb_set(payload,'{capacity,members,0,status}','"active"'),revision=revision+1 where id='main' returning revision into rev;
 result:=public.jobflow_access('save_member',jsonb_build_object('originalEmail','access-test@example.invalid','staffId','test-staff','groupId',g,'role','editor','status','active','overrides','{"documents":0}'::jsonb,'revision',rev));
 rev:=(result->>'revision')::int;
 begin perform public.jobflow_access('save_member',jsonb_build_object('originalEmail',owner_email,'revision',rev));raise exception 'Self-owner change accepted';exception when raise_exception then if sqlerrm='Self-owner change accepted' then raise; end if;end;
 begin perform public.jobflow_access('delete_group',jsonb_build_object('id',g,'revision',rev));raise exception 'Assigned group deleted';exception when raise_exception then if sqlerrm='Assigned group deleted' then raise; end if;end;
 perform set_config('request.jwt.claims','{"sub":"11111111-1111-4111-8111-111111111111","email":"access-test@example.invalid","role":"authenticated"}',true);
 result:=public.jobflow_access('load');
 if result->'permissions'->>'jobs'<>'2' or result->'permissions'->>'documents'<>'0' or jsonb_array_length(result->'payload'->'jobs')<>2 then raise exception 'Group inheritance or override failed'; end if;
 -- A successful save must work through the public wrapper as authenticated, not only as postgres.
end;
$$;
set local role authenticated;
do $$ declare r jsonb; saved jsonb; begin
 r:=public.jobflow_access('load');
 saved:=public.jobflow_access('save',jsonb_build_object('payload',r->'payload','revision',r->'revision','accessVersion',r->'accessVersion'));
 if (saved->>'revision')::int<>(r->>'revision')::int+1 then raise exception 'Authenticated save failed'; end if;
end;
$$;
reset role;
select 'Access tests passed: projection, assigned scope, protected-field merge, completion, deletion, injection, inactive staff/user, ACL authorization, revision and raw table denial' as result;
