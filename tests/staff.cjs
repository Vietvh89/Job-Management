const fs=require('node:fs');
const harness=fs.readFileSync('tests/audit.cjs','utf8').split('const a=sandbox.audit;')[0]
 .replace('globalThis.audit={state,save,','globalThis.audit={state,save,staffMemberDraft,openStaffEditor,');
eval(harness+String.raw`
(async()=>{
 const appSource=fs.readFileSync('public/app.js','utf8');assert.ok(appSource.includes('name="newPassword"'));assert.ok(appSource.includes('name="confirmPassword"'));assert.ok(appSource.includes('setStaffPassword(member.email,newPassword)'));
 const a=sandbox.audit,original=JSON.stringify(a.state),member=a.state.capacity.members[0];
 const data={id:member.id,staffId:member.staffId,fullName:'Updated name',shortName:member.shortName,rank:member.rank,department:member.department,role:member.role,email:'',status:'active',targetUtilization:'85',groupId:''};
 const draft=a.staffMemberDraft(data);assert.equal(draft.targetUtilization,85);assert.equal(draft.email,'');assert.equal(JSON.stringify(a.state),original);
 assert.throws(()=>a.staffMemberDraft({...data,email:'invalid'}),/valid email/);
 assert.throws(()=>a.staffMemberDraft({...data,targetUtilization:'151'}),/150/);
 let panelRemoved=0;document.querySelector('#audit-panel').remove=()=>panelRemoved++;
 const status={hidden:true,textContent:''},button={disabled:false,textContent:'Save changes'},form={id:'staff-form',dataset:{},elements:{id:{value:member.id}},data,querySelector:s=>s==='#staff-form-message'?status:button};
 sandbox.window.JOBFLOW_CLOUD={role:'admin',members:[],groups:[],async saveStaff(){throw {message:'Temporary network failure'};}};
 const handler=listeners.submit.find(l=>l.fn.toString().includes('staffMemberDraft'));
 await handler.fn({target:form,preventDefault(){},stopImmediatePropagation(){}});
 assert.equal(panelRemoved,0);assert.equal(status.hidden,false);assert.equal(button.disabled,false);assert.ok(status.textContent.includes('network'));assert.equal(form.data.fullName,'Updated name');assert.equal(JSON.stringify(a.state),original);
 const fresh=JSON.parse(original);fresh.capacity.members[0]={...fresh.capacity.members[0],...draft};
 sandbox.window.JOBFLOW_CLOUD.saveStaff=async()=>({payload:fresh,revision:2});
 await handler.fn({target:form,preventDefault(){},stopImmediatePropagation(){}});assert.equal(panelRemoved,0);assert.ok(a.renderStaffSettings().includes('Updated name'));assert.ok(status.textContent.includes('Saved successfully'));
 console.log('Staff checks passed: validated immutable draft, failed save retains form/data, and successful save keeps the editor open with confirmation.');
})().catch(error=>{console.error(error);process.exitCode=1;});
`);
