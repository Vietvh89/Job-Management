-- Return a real HTTP conflict instead of SQLSTATE 40001. PostgREST 14 retries
-- 40001 transactions, which can leave an RPC pending until the browser aborts it.
create or replace function public.jobflow_save_staff(args jsonb) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare ctx jsonb; w jsonb; draft jsonb:=args->'member'; old_staff jsonb; staff jsonb; fields jsonb:='{}'; acl jsonb; result jsonb; key text; field_value text; group_id text:=coalesce(args->>'groupId',''); mail text; staff_id text:=draft->>'id'; is_self boolean;
begin
 ctx:=public.jobflow_access('load');
 if ctx->>'role'<>'admin' then raise exception 'Only Account Owners can edit staff' using errcode='42501'; end if;
 if (args->>'revision')::int is distinct from (ctx->>'revision')::int then raise sqlstate 'PT409' using message='Data changed on the server. Refreshing before saving.'; end if;
 if coalesce(staff_id,'')='' or length(staff_id)>100 then raise exception 'Invalid staff identifier'; end if;
 if group_id<>'' and not exists(select 1 from jsonb_array_elements(ctx->'groups') g where g.value->>'id'=group_id) then raise exception 'Group Access no longer exists. Select another group.'; end if;
 w:=ctx->'payload';
 select value into old_staff from jsonb_array_elements(w->'capacity'->'members') where value->>'id'=staff_id;
 foreach key in array array['staffId','fullName','shortName','rank','department','role'] loop
  field_value:=trim(draft->>key);
  if coalesce(field_value,'')='' or length(field_value)>160 then raise exception 'Complete all required staff fields (maximum 160 characters).'; end if;
  fields:=fields||jsonb_build_object(key,field_value);
 end loop;
 mail:=lower(trim(coalesce(draft->>'email','')));
 if mail<>'' and (length(mail)>254 or mail !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$') then raise exception 'Enter a valid email address.'; end if;
 if coalesce(draft->>'status','active') not in ('active','inactive') then raise exception 'Invalid staff status.'; end if;
 if coalesce((draft->>'targetUtilization')::numeric,0)<1 or (draft->>'targetUtilization')::numeric>150 then raise exception 'Target utilization must be between 1 and 150.'; end if;
 if exists(select 1 from jsonb_array_elements(w->'capacity'->'members') x where x.value->>'id'<>staff_id and
   (lower(x.value->>'staffId')=lower(fields->>'staffId') or lower(x.value->>'shortName')=lower(fields->>'shortName') or (mail<>'' and lower(x.value->>'email')=mail))) then raise exception 'Staff ID, short name and non-empty email must be unique.'; end if;
 select value into acl from jsonb_array_elements(ctx->'members') x where x.value->>'staff_id'=staff_id or (mail<>'' and x.value->>'email'=mail) order by (x.value->>'staff_id'=staff_id) desc nulls last limit 1;
 if acl is not null and acl->>'staff_id' is not null and acl->>'staff_id'<>staff_id then raise exception 'This email belongs to another staff account.'; end if;
 is_self:=coalesce(acl->>'email'=ctx->>'email',false) or ctx->>'staffId'=staff_id;
 if is_self and (mail<>ctx->>'email' or draft->>'status'='inactive') then raise exception 'You cannot disable or change the sign-in email of your own Account Owner profile.'; end if;
 if acl->>'role'='admin' then group_id:=coalesce(acl->>'group_id',''); end if;
 staff:=coalesce(old_staff,jsonb_build_object('weeklyHours',40,'workDays','[1,1,1,1,1]'::jsonb,'allocations','[]'::jsonb,'leaves','[]'::jsonb))||fields||
   jsonb_build_object('id',staff_id,'email',mail,'status',coalesce(draft->>'status','active'),'targetUtilization',(draft->>'targetUtilization')::numeric,'name',fields->>'shortName','team',fields->>'department','code',upper(left(fields->>'shortName',2)),'accessGroupId',group_id);
 if old_staff is null then w:=jsonb_set(w,'{capacity,members}',(w->'capacity'->'members')||jsonb_build_array(staff));
 else w:=jsonb_set(w,'{capacity,members}',(select jsonb_agg(case when value->>'id'=staff_id then staff else value end) from jsonb_array_elements(w->'capacity'->'members'))); end if;
 w:=jobflow_private.rename_staff_owner(w,old_staff->>'shortName',staff->>'shortName');
 result:=public.jobflow_access('save',jsonb_build_object('payload',w,'revision',ctx->'revision','accessVersion',ctx->'accessVersion'));
 if mail<>'' and not coalesce(is_self,false) and (acl is not null or group_id<>'') then
  perform public.jobflow_access('save_member',jsonb_build_object('originalEmail',coalesce(acl->>'email',''),'staffId',staff_id,'groupId',group_id,
    'role',case when acl->>'role'='admin' then 'admin' else 'editor' end,'status',coalesce(acl->>'status','active'),'overrides',coalesce(acl->'overrides','{}'),'revision',result->'revision'));
 end if;
 return public.jobflow_access('load');
end;
$$;
revoke all on function public.jobflow_save_staff(jsonb) from public,anon;
grant execute on function public.jobflow_save_staff(jsonb) to authenticated;
