const vm=require('node:vm');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const flush=()=>new Promise(resolve=>setImmediate(resolve));
async function setup(options={}) {
  const nodes=new Map(),writes=[],classes=new Set();let appLoads=0,poll;
  function node(id){if(!nodes.has(id))nodes.set(id,{textContent:'',hidden:false,open:false,addEventListener(){},querySelectorAll(){return[];},showModal(){this.open=true;},close(){this.open=false;},elements:{email:{value:'member@example.invalid'},password:{value:'not-a-real-password'}},reportValidity(){return true;}});return nodes.get(id);}
  const membership=options.noMember?null:{email:'member@example.invalid',role:options.role||'editor',permissions:{jobs:options.role==='viewer'?1:2},accessVersion:1,groups:[],members:[]};
  const payload={jobs:[],capacity:{},timeline:{}};
  const client={auth:{onAuthStateChange(){},async getSession(){return{data:{session:{user:{email:'member@example.invalid'}}}};},async signOut(){return{};}},rpc(name,{action,args}){
    assert.ok(['jobflow_access','jobflow_save_staff'].includes(name));if(action==='save'||name==='jobflow_save_staff')writes.push(args);
    const query={abortSignal(){return query;},then(resolve,reject){
      let response=membership?{data:{...membership,payload,revision:1}}:{error:{message:'Access denied'}};
      if(action==='save')response=options.error?{error:{message:'offline'}}:options.conflict?{error:{message:'Revision conflict'}}:{data:{revision:2,payload,updated_at:new Date().toISOString()}};
      if(action==='status'&&options.statusError)response={error:options.statusError};
      if(name==='jobflow_save_staff')response=options.staffError?{error:options.staffError}:{data:{...membership,revision:3,payload,groups:[{id:'g',name:'Test group'}],members:[]}};
      return Promise.resolve(response).then(resolve,reject);
    }};return query;
  }};
  const document={hidden:false,getElementById:node,querySelector(){return null;},createElement(){return{};},body:{classList:{add(value){classes.add(value);},remove(value){classes.delete(value);}},appendChild(script){appLoads++;script.onload();}}};
  const window={supabase:{createClient:()=>client},JOBFLOW_CONFIG:{url:'https://example.invalid',publishableKey:'test'},addEventListener(){}};
  const sandbox={window,document,Blob,AbortSignal,URL,console,setTimeout,clearInterval,setInterval(fn){poll=fn;return 1;},alert(){},confirm(){return true;},location:{origin:'https://example.invalid',reload(){}}};
  vm.runInNewContext(fs.readFileSync('public/cloud.js','utf8'),sandbox);await flush();await flush();
  return {window,nodes,writes,classes,poll:()=>poll(),get appLoads(){return appLoads;}};
}
(async()=>{
  let app=await setup();assert.equal(app.appLoads,1);assert.ok(app.window.JOBFLOW_CLOUD.initialState);
  assert.equal(app.window.JOBFLOW_CLOUD.save({jobs:[]}),true);assert.equal(app.window.JOBFLOW_CLOUD.save({jobs:[]}),false);await flush();assert.equal(app.writes.length,1);assert.equal(app.writes[0].revision,1);assert.equal(app.writes[0].accessVersion,1);assert.equal(app.nodes.get('cloud-saving').open,false);
  app=await setup({conflict:true});app.window.JOBFLOW_CLOUD.save({jobs:[]});await flush();assert.equal(app.nodes.get('cloud-saving').open,true);assert.equal(app.nodes.get('cloud-recovery').hidden,false);assert.equal(app.window.JOBFLOW_CLOUD.save({jobs:[]}),false);
  app=await setup({error:true});app.window.JOBFLOW_CLOUD.save({jobs:[]});await flush();assert.equal(app.nodes.get('cloud-recovery').hidden,false);assert.equal(app.window.JOBFLOW_CLOUD.save({jobs:[]}),false);
  app=await setup({role:'viewer'});assert.equal(app.window.JOBFLOW_CLOUD.save({jobs:[]}),false);assert.equal(app.writes.length,0);
  app=await setup({noMember:true});assert.equal(app.appLoads,0);assert.equal(app.window.JOBFLOW_CLOUD,undefined);
  app=await setup({statusError:{message:'Failed to fetch'}});await app.poll();assert.equal(app.nodes.get('cloud-auth').hidden,true);assert.equal(app.classes.has('cloud-locked'),false);assert.ok(app.nodes.get('cloud-status').textContent.includes('giữ nguyên'));
  app=await setup({statusError:{code:'42501',message:'Access revoked'}});await app.poll();assert.equal(app.nodes.get('cloud-auth').hidden,false);assert.equal(app.classes.has('cloud-locked'),true);assert.equal(app.window.JOBFLOW_CLOUD.save({jobs:[]}),false);
  app=await setup({role:'admin'});const staffResult=await app.window.JOBFLOW_CLOUD.saveStaff({id:'staff-test'},'g');assert.equal(staffResult.revision,3);assert.equal(app.writes[0].groupId,'g');assert.equal(app.window.JOBFLOW_CLOUD.groups[0].id,'g');
  const failure={role:'admin',staffError:{code:'23505',message:'Email must be unique'}};app=await setup(failure);await assert.rejects(app.window.JOBFLOW_CLOUD.saveStaff({id:'staff-test'},'g'),{message:'Email must be unique'});assert.equal(app.nodes.get('cloud-auth').hidden,true);assert.equal(app.classes.has('cloud-locked'),false);failure.staffError=null;assert.equal((await app.window.JOBFLOW_CLOUD.saveStaff({id:'staff-test'},'g')).revision,3);
  console.log('Cloud checks passed: load, serialized writes, conflict, network failure, viewer, non-member, transient poll error keeps editor, revoked access locks, staff/group save and retry after validation error.');
})().catch(error=>{console.error(error);process.exitCode=1;});
