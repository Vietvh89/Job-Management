-- Add phases C-F to the existing Tax review & Finalization template.
-- Phases A and B are preserved exactly as configured in the workspace.
do $migration$
declare
  target_count integer;
  target_workspace_id text;
  target_template_index bigint;
  target_template jsonb;
  kept_phases jsonb;
  new_phases jsonb;
  next_template jsonb;
  sic_names text[] := array[
    '1.1. CIT - WP-CIT procedure',
    '1.2. CIT - WP-Salary & other benefits',
    '1.3. CIT - WP-PP & Accruals',
    '1.4. CIT - WP-FA',
    '1.5. CIT - WP-FE & FI',
    '1.6. CIT - WP-Provision',
    '1.7. CIT - WP-Expense Testing',
    '1.8. CIT - WP-Revenue cut-off',
    '1.9. PIT - WP- PIT review',
    '1.10. PIT - WP- PIT finalization',
    '1.11. VAT - WP- VAT review',
    '1.12. FCT - WP- FCT review',
    '1.13. FCT - WP-FCT finalization',
    '1.14. CIT Declaration',
    '1.15. PIT finalization declaration',
    '1.16. FCT finalization declaration'
  ];
  mic_names text[] := array[
    '2.1. CIT - WP-CIT procedure',
    '2.2. CIT - WP-Salary & other benefits',
    '2.3. CIT - WP-PP & Accruals',
    '2.4. CIT - WP-FA',
    '2.5. CIT - WP-FE & FI',
    '2.6. CIT - WP-Provision',
    '2.7. CIT - WP-Expense Testing',
    '2.8. CIT - WP-Revenue cut-off',
    '2.9. PIT - WP- PIT review',
    '2.10. PIT - WP- PIT finalization',
    '2.11. VAT - WP- VAT review',
    '2.12. FCT - WP- FCT review',
    '2.13. FCT - WP-FCT finalization',
    '2.14. Agenda',
    '2.15. CIT Declaration',
    '2.16. PIT finalization declaration',
    '2.17. FCT finalization declaration'
  ];
  c_sic_subtasks jsonb;
  c_mic_subtasks jsonb;
  d_sic_subtasks jsonb;
  d_mic_subtasks jsonb;
begin
  select count(*)
    into target_count
  from public.jobflow_workspace as workspace
  cross join lateral jsonb_array_elements(workspace.payload->'jobTemplates') as template(item)
  where lower(trim(template.item->>'name')) = 'tax review & finalization';

  if target_count <> 1 then
    raise exception 'Expected exactly one Tax review & Finalization template, found %', target_count;
  end if;

  select workspace.id, template.ordinality, template.item
    into target_workspace_id, target_template_index, target_template
  from public.jobflow_workspace as workspace
  cross join lateral jsonb_array_elements(workspace.payload->'jobTemplates')
    with ordinality as template(item, ordinality)
  where lower(trim(template.item->>'name')) = 'tax review & finalization';

  select coalesce(jsonb_agg(phase.item order by phase.ordinality), '[]'::jsonb)
    into kept_phases
  from jsonb_array_elements(coalesce(target_template->'phases', '[]'::jsonb))
    with ordinality as phase(item, ordinality)
  where phase.ordinality <= 2;

  if jsonb_array_length(kept_phases) <> 2 then
    raise exception 'Tax review & Finalization must contain Phase A and Phase B before this migration';
  end if;

  select jsonb_agg(
    jsonb_build_object(
      'id', 'tax-review-c-sic-subtask-' || item.ordinality,
      'name', item.name,
      'owner', 'Job owner',
      'dueOffset', 0,
      'checklist', '[]'::jsonb
    ) order by item.ordinality
  ) into c_sic_subtasks
  from unnest(sic_names) with ordinality as item(name, ordinality);

  select jsonb_agg(
    jsonb_build_object(
      'id', 'tax-review-c-mic-subtask-' || item.ordinality,
      'name', item.name,
      'owner', 'Job owner',
      'dueOffset', 0,
      'checklist', '[]'::jsonb
    ) order by item.ordinality
  ) into c_mic_subtasks
  from unnest(mic_names) with ordinality as item(name, ordinality);

  select jsonb_agg(
    jsonb_build_object(
      'id', 'tax-review-d-sic-subtask-' || item.ordinality,
      'name', item.name,
      'owner', 'Job owner',
      'dueOffset', 0,
      'checklist', '[]'::jsonb
    ) order by item.ordinality
  ) into d_sic_subtasks
  from unnest(sic_names) with ordinality as item(name, ordinality);

  select jsonb_agg(
    jsonb_build_object(
      'id', 'tax-review-d-mic-subtask-' || item.ordinality,
      'name', item.name,
      'owner', 'Job owner',
      'dueOffset', 0,
      'checklist', '[]'::jsonb
    ) order by item.ordinality
  ) into d_mic_subtasks
  from unnest(mic_names) with ordinality as item(name, ordinality);

  new_phases := jsonb_build_array(
    jsonb_build_object(
      'id', 'tax-review-phase-c',
      'name', 'C. Review Wps',
      'startOffset', 10,
      'duration', 5,
      'tasks', jsonb_build_array(
        jsonb_build_object(
          'id', 'tax-review-c-task-1', 'name', '1. SIC review',
          'startOffset', 0, 'duration', 1, 'estimatedHours', 8,
          'subtasks', c_sic_subtasks, 'checklist', '[]'::jsonb
        ),
        jsonb_build_object(
          'id', 'tax-review-c-task-2', 'name', '2. MIC review',
          'startOffset', 1, 'duration', 1, 'estimatedHours', 8,
          'subtasks', c_mic_subtasks, 'checklist', '[]'::jsonb
        ),
        jsonb_build_object(
          'id', 'tax-review-c-task-3', 'name', '3. Partner review',
          'startOffset', 2, 'duration', 1, 'estimatedHours', 8,
          'subtasks', jsonb_build_array(
            jsonb_build_object(
              'id', 'tax-review-c-partner-subtask-1', 'name', '3.1. Agenda',
              'owner', 'Job owner', 'dueOffset', 0, 'checklist', '[]'::jsonb
            )
          ),
          'checklist', '[]'::jsonb
        )
      )
    ),
    jsonb_build_object(
      'id', 'tax-review-phase-d',
      'name', 'D. Cleared Wps',
      'startOffset', 15,
      'duration', 5,
      'tasks', jsonb_build_array(
        jsonb_build_object(
          'id', 'tax-review-d-task-1', 'name', '1. SIC clear',
          'startOffset', 0, 'duration', 1, 'estimatedHours', 8,
          'subtasks', d_sic_subtasks, 'checklist', '[]'::jsonb
        ),
        jsonb_build_object(
          'id', 'tax-review-d-task-2', 'name', '2. MIC clear',
          'startOffset', 1, 'duration', 1, 'estimatedHours', 8,
          'subtasks', d_mic_subtasks, 'checklist', '[]'::jsonb
        ),
        jsonb_build_object(
          'id', 'tax-review-d-task-3', 'name', '3. Partner clear',
          'startOffset', 2, 'duration', 1, 'estimatedHours', 8,
          'subtasks', jsonb_build_array(
            jsonb_build_object(
              'id', 'tax-review-d-partner-subtask-1', 'name', '3.1. Agenda',
              'owner', 'Job owner', 'dueOffset', 0, 'checklist', '[]'::jsonb
            )
          ),
          'checklist', '[]'::jsonb
        )
      )
    ),
    jsonb_build_object(
      'id', 'tax-review-phase-e',
      'name', 'E. Sent to client',
      'startOffset', 20,
      'duration', 5,
      'tasks', jsonb_build_array(
        jsonb_build_object(
          'id', 'tax-review-e-task-1', 'name', '1. Send report to client',
          'startOffset', 0, 'duration', 1, 'estimatedHours', 8,
          'subtasks', jsonb_build_array(
            jsonb_build_object(
              'id', 'tax-review-e-task-1-subtask-1', 'name', '1.1. Send 1st draft report to Client',
              'owner', 'Job owner', 'dueOffset', 0, 'checklist', '[]'::jsonb
            ),
            jsonb_build_object(
              'id', 'tax-review-e-task-1-subtask-2', 'name', '1.2. Update Client''s feedback',
              'owner', 'Job owner', 'dueOffset', 0, 'checklist', '[]'::jsonb
            ),
            jsonb_build_object(
              'id', 'tax-review-e-task-1-subtask-3', 'name', '1.3. Send final report to client',
              'owner', 'Job owner', 'dueOffset', 0, 'checklist', '[]'::jsonb
            )
          ),
          'checklist', '[]'::jsonb
        )
      )
    ),
    jsonb_build_object(
      'id', 'tax-review-phase-f',
      'name', 'F. Wrapup',
      'startOffset', 25,
      'duration', 5,
      'tasks', jsonb_build_array(
        jsonb_build_object(
          'id', 'tax-review-f-task-1', 'name', '1. Update job status in IMS',
          'startOffset', 0, 'duration', 1, 'estimatedHours', 8,
          'subtasks', '[]'::jsonb, 'checklist', '[]'::jsonb
        ),
        jsonb_build_object(
          'id', 'tax-review-f-task-2', 'name', '2. Wrapup files',
          'startOffset', 1, 'duration', 1, 'estimatedHours', 8,
          'subtasks', '[]'::jsonb, 'checklist', '[]'::jsonb
        )
      )
    )
  );

  next_template := jsonb_set(target_template, '{phases}', kept_phases || new_phases, false);

  if next_template is distinct from target_template then
    update public.jobflow_workspace
    set payload = jsonb_set(
          payload,
          array['jobTemplates', (target_template_index - 1)::text],
          next_template,
          false
        ),
        revision = revision + 1
    where id = target_workspace_id;
  end if;
end
$migration$;
