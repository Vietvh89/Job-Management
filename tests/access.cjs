const fs=require('node:fs');
const harness=fs.readFileSync('tests/audit.cjs','utf8').split('const a=sandbox.audit;')[0]
 .replace('globalThis.audit={state,save,','globalThis.audit={state,save,permissionMatrix,readPermissionForm,renderPrivileges,renderAccessGroups,deniedAccess,');
eval(harness+String.raw`
const a=sandbox.audit;
assert.ok(a.state.capacity.members.every(m=>m.status==='active'&&m.email===''));
const staff=a.renderStaffSettings();assert.ok(staff.includes('<th>Status</th>'));assert.ok(staff.includes('<th>Email</th>'));
a.setSettingsSection('privileges');let html=a.renderSettings();assert.ok(html.includes('Group Access'));assert.ok(html.includes('Notifications'));assert.ok(html.includes('Effective Permission'));
const matrix=a.permissionMatrix({documents:0},{documents:3,jobs:2},true);
assert.ok(matrix.includes('Use Group Access · Full Access'));assert.ok(matrix.includes('data-effective-key="documents">No Access'));
const elementsForm={};for(const key of ['clients','jobs','completedJobs','archivedJobs','completion','documents','notes','phases','milestones','costs','billings','financials','reports','jobManager','schedule','staff','templates','boardViews'])elementsForm['permission-'+key]={value:key==='documents'?'0':'inherit'};
const overrides=a.readPermissionForm({elements:elementsForm},true);assert.deepEqual(JSON.parse(JSON.stringify(overrides)),{documents:0});
sandbox.window.JOBFLOW_CLOUD={role:'editor',permissions:{jobs:1,documents:0},groups:[],members:[]};
assert.equal(a.deniedAccess({closest:s=>s.includes('#job-info-form')}),true);
assert.equal(a.deniedAccess({closest:s=>s.includes('#staff-form')}),true);
assert.equal(a.deniedAccess({closest:()=>null}),false);
assert.ok(a.renderPrivileges().includes('Only Account Owners'));
console.log('Access UI checks passed: Active/blank-email defaults, Settings tabs, group inheritance, explicit No Access override, protected settings and read-only controls.');
`);
