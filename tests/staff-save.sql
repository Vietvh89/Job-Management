-- Run after the staff-save migration inside BEGIN/ROLLBACK. No real invitations are sent.
select set_config('request.jwt.claims',jsonb_build_object('sub','33333333-3333-4333-8333-333333333333','email',(select email from public.jobflow_members where role='admin' and status='active' limit 1),'role','authenticated')::text,true);
set local role authenticated;
do $$
declare ctx jsonb; r jsonb; draft jsonb; group_id text; before_revision int; before_jobs jsonb;
begin
 ctx:=public.jobflow_access('load');group_id:=ctx->'groups'->0->>'id';before_jobs:=ctx->'payload'->'jobs';
 draft:='{"id":"staff-save-regression","staffId":"TEST_SAVE_01","fullName":"Regression Staff","shortName":"REG_SAVE","rank":"A1","department":"Testing","role":"Support","email":"","status":"active","targetUtilization":80}';
 r:=public.jobflow_save_staff(jsonb_build_object('member',draft,'groupId',group_id,'revision',ctx->'revision'));
 if not exists(select 1 from jsonb_array_elements(r->'payload'->'capacity'->'members') m where m.value->>'id'='staff-save-regression' and m.value->>'accessGroupId'=group_id) then raise exception 'Blank-email staff or group draft was not saved'; end if;
 if exists(select 1 from jsonb_array_elements(r->'members') m where m.value->>'staff_id'='staff-save-regression') then raise exception 'Blank-email staff was granted access'; end if;
 draft:=draft||'{"email":"staff-save@example.invalid","fullName":"Renamed Staff"}';
 r:=public.jobflow_save_staff(jsonb_build_object('member',draft,'groupId',group_id,'revision',r->'revision'));
 if not exists(select 1 from jsonb_array_elements(r->'members') m where m.value->>'staff_id'='staff-save-regression' and m.value->>'email'='staff-save@example.invalid' and m.value->>'group_id'=group_id) then raise exception 'Group assignment not saved with staff'; end if;
 if r->'payload'->'jobs'<>before_jobs then raise exception 'Unrelated jobs changed'; end if;
 before_revision:=(r->>'revision')::int;
 begin
  perform public.jobflow_save_staff(jsonb_build_object('member',draft||'{"fullName":"Stale change"}','groupId',group_id,'revision',before_revision-1));
  raise exception 'Stale staff update accepted';
 exception when serialization_failure then null; end;
 if (public.jobflow_access('status')->>'revision')::int<>before_revision then raise exception 'Stale update mutated state'; end if;
 r:=public.jobflow_access('save_member',jsonb_build_object('originalEmail','staff-save@example.invalid','staffId','staff-save-regression','groupId',group_id,'role','editor','status','active','overrides','{"documents":0}'::jsonb,'revision',before_revision));
 draft:=draft||'{"shortName":"REG_NEW","targetUtilization":85}';
 r:=public.jobflow_save_staff(jsonb_build_object('member',draft,'groupId','','revision',r->'revision'));
 if not exists(select 1 from jsonb_array_elements(r->'members') m where m.value->>'email'='staff-save@example.invalid' and m.value->'overrides'='{"documents":0}' and m.value->>'group_id' is null) then raise exception 'Overrides lost or group removal failed'; end if;
 begin
  perform public.jobflow_save_staff(jsonb_build_object('member',draft,'groupId','missing-group','revision',r->'revision'));
  raise exception 'Missing group accepted';
 exception when raise_exception then if sqlerrm='Missing group accepted' then raise; end if; end;
end;
$$;
reset role;
-- Force an error in group assignment after the inner workspace save and verify atomic rollback.
insert into public.jobflow_members(email,role) values('collision-staff@example.invalid','editor');
set local role authenticated;
do $$ declare ctx jsonb; draft jsonb; before_revision int;
begin
 ctx:=public.jobflow_access('load');before_revision:=(ctx->>'revision')::int;
 select value into draft from jsonb_array_elements(ctx->'payload'->'capacity'->'members') where value->>'id'='staff-save-regression';
 begin
  perform public.jobflow_save_staff(jsonb_build_object('member',draft||'{"email":"collision-staff@example.invalid"}','groupId',ctx->'groups'->0->>'id','revision',before_revision));
  raise exception 'Collision accepted';
 exception when raise_exception then if sqlerrm='Collision accepted' then raise; end if; end;
 ctx:=public.jobflow_access('load');
 if (ctx->>'revision')::int<>before_revision or exists(select 1 from jsonb_array_elements(ctx->'payload'->'capacity'->'members') m where m.value->>'email'='collision-staff@example.invalid') then raise exception 'Partial staff save survived failed group assignment'; end if;
end;
$$;
reset role;
select set_config('request.jwt.claims','{"sub":"44444444-4444-4444-8444-444444444444","email":"staff-save@example.invalid","role":"authenticated"}',true);
set local role authenticated;
do $$ begin
 begin perform public.jobflow_save_staff('{}');raise exception 'Non-owner changed staff';exception when insufficient_privilege then null;end;
end; $$;
reset role;
select 'Staff save checks passed: create, edit, pending group, email activation, group removal, override preservation, stale update, atomic rollback and non-owner denial' as result;
