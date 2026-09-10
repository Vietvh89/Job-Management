-- The original PL/pgSQL implementation recursively rebuilt every JSON object
-- and array in the workspace. A staff rename could therefore exceed the
-- browser's 25 second RPC timeout and the transaction would be cancelled.
--
-- Staff references are stored as complete JSON string values (owner/name/team
-- entries), so replacing the exact JSON-encoded scalar keeps the same behavior
-- without replacing substrings inside longer values.
create or replace function jobflow_private.rename_staff_owner(
  doc jsonb,
  previous_name text,
  next_name text
) returns jsonb
language sql
immutable
strict
set search_path = ''
as $$
  select case
    when previous_name = next_name then doc
    else replace(
      doc::text,
      to_jsonb(previous_name)::text,
      to_jsonb(next_name)::text
    )::jsonb
  end;
$$;

revoke all on function jobflow_private.rename_staff_owner(jsonb,text,text) from public, anon;
grant execute on function jobflow_private.rename_staff_owner(jsonb,text,text) to authenticated;
