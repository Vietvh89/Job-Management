const fs=require('node:fs');
const harness=fs.readFileSync('tests/audit.cjs','utf8').split('const a=sandbox.audit;')[0]
  .replace('globalThis.audit={state,save,','globalThis.audit={state,save,moveBoardJob,normalizeViewJobs,jobBoardStage,filteredJobs,setTemplateFilter(value){jobTemplateFilter=value;},');
eval(harness+String.raw`
const a=sandbox.audit;
const template=a.state.jobTemplates.find(t=>t.name==='Transfer Pricing');
const jobs=a.state.jobs.filter(j=>j.templateId===template.id);
const job=jobs[0];
const view={id:'test-any-step',name:'Test workflow',steps:['Intake','Collect','Review','Complete'].map((name,i)=>({id:'s'+i,name,status:name,visible:true,aliases:[]}))};
a.state.boardViews.push(view);template.boardViewId=view.id;a.setBoardView(view.id);a.setJobSection('board');
job.status='Complete';const project=a.ensureJobPhaseHierarchy(job);project.items.forEach(i=>{i.progress=100;i.status='Complete';});
let prompts=0;sandbox.window.confirm=()=>{prompts++;return false;};
const before=JSON.stringify(job);assert.equal(a.moveBoardJob(job,'Intake'),false);assert.equal(JSON.stringify(job),before);
sandbox.window.confirm=()=>{prompts++;return true;};
assert.equal(a.moveBoardJob(job,'Intake'),true);assert.equal(job.status,'Intake');a.syncRelations();assert.equal(job.status,'Intake');assert.equal(job.progress,100);
assert.equal(a.moveBoardJob(job,'Review'),true);assert.equal(job.status,'Review');assert.equal(a.jobBoardStage(job),'Review');
assert.equal(prompts,3);assert.equal(a.moveBoardJob(job,'Review'),false);assert.equal(prompts,3);
const target={id:'test-scope',name:'New view',steps:[{id:'first',name:'Receive',status:'Receive',visible:true},{id:'second',name:'Review',status:'Review',visible:true}]};
jobs[1].status='Unknown old status';const outside=a.state.jobs.find(j=>j.templateId!==template.id),outsideStatus=outside.status;
assert.equal(a.normalizeViewJobs(target,[template.id]),1);assert.equal(jobs[1].status,'Receive');assert.equal(job.status,'Review');assert.equal(outside.status,outsideStatus);a.syncRelations();assert.equal(jobs[1].status,'Receive');
a.setJobSection('calendar');a.setTemplateFilter(template.id);assert.equal(a.filteredJobs().length,jobs.length);assert.ok(a.filteredJobs().every(j=>j.templateId===template.id));
a.setTemplateFilter('');assert.ok(a.filteredJobs().length>jobs.length);
a.openJob(job.id,'information');const info=elements.get('#drawer-content').innerHTML;assert.ok(info.includes('Current Phase'));assert.ok(info.includes('Current Stage'));
console.log('Board checks passed: backward/forward confirmation, cancel, stage persistence at 100%, scope reset, matching/unrelated jobs, template filtering and separate phase/stage.');
`);
