Warning: truncated output (original token count: 75851)
Total output lines: 2756

(() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const icon = (name, cls = "") => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const esc = (value = "") => String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  const money = value => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  const shortDate = value => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(`${value}T12:00:00`));
  const statusClass = value => value.toLowerCase().replaceAll(" ", "-");
  const storageKey = "jobflow-state-v1";
  const workforceSeed = Array.isArray(window.JOBFLOW_STAFF_SEED) ? window.JOBFLOW_STAFF_SEED : [];

  const seed = {
    jobs: [
      { id: "JF-2418", name: "Harbour precinct masterplan", client: "Harbour RKGO", owner: "Maya EFUN", due: "2026-09-11", start: "2026-08-10", status: "In progress", progress: 72, budget: 28500, billed: 18400, spent: 16200, priority: "high", team: ["MC","AN","JL"], tasks: [["Site analysis",true,"18h"],["Concept drawings",true,"42h"],["Client presentation",false,"12h"],["Planning submission",false,"22h"]], milestones: [["Concept approved","2026-08-28"],["Client review","2026-09-08"],["Final submission","2026-09-11"]] },
      { id: "JF-2421", name: "Customer portal redesign", client: "Acme Design PZBW", owner: "Alex MNYO", due: "2026-09-18", start: "2026-08-24", status: "In progress", progress: 58, budget: 22000, billed: 11000, spent: 9400, priority: "medium", team: ["AN","JL","SW"], tasks: [["Discovery workshop",true,"8h"],["UX wireframes",true,"24h"],["UI design",false,"36h"],["Developer handoff",false,"10h"]], milestones: [["Wireframes signed off","2026-09-03"],["Design review","2026-09-12"],["Handoff","2026-09-18"]] },
      { id: "JF-2424", name: "FY27 operating model", client: "Greenleaf KERI", owner: "Jordan ZBBA", due: "2026-09-07", start: "2026-08-18", status: "Review", progress: 88, budget: 16800, billed: 13200, spent: 11900, priority: "high", team: ["JL","AN"], tasks: [["Stakeholder interviews",true,"20h"],["Process mapping",true,"28h"],["Operating model draft",true,"32h"],["Partner review",false,"8h"]], milestones: [["Current state mapped","2026-08-27"],["Draft delivered","2026-09-02"],["Partner approval","2026-09-07"]] },
      { id: "JF-2427", name: "Warehouse automation study", client: "Atlas UEMO", owner: "Sam WEPH", due: "2026-10-02", start: "2026-09-01", status: "Planning", progress: 18, budget: 34000, billed: 8500, spent: 4700, priority: "medium", team: ["SW","MC"], tasks: [["Requirements",true,"12h"],["On-site assessment",false,"24h"],["Options analysis",false,"38h"],["Business case",false,"20h"]], milestones: [["Site visit","2026-09-10"],["Options workshop","2026-09-24"],["Final report","2026-10-02"]] },
      { id: "JF-2409", name: "Annual impact report", client: "Luma AYTN", owner: "Maya EFUN", due: "2026-09-25", start: "2026-07-27", status: "In progress", progress: 64, budget: 19500, billed: 9800, spent: 10200, priority: "low", team: ["MC","JL"], tasks: [["Content structure",true,"12h"],["Data visualisation",true,"30h"],["Editorial design",false,"40h"],["Production artwork",false,"16h"]], milestones: [["Editorial direction","2026-08-20"],["Full draft","2026-09-14"],["Press ready","2026-09-25"]] },
      { id: "JF-2414", name: "Retail rollout feasibility", client: "Greenleaf KERI", owner: "Alex MNYO", due: "2026-09-29", start: "2026-08-03", status: "On hold", progress: 41, budget: 24000, billed: 7200, spent: 8100, priority: "low", team: ["AN","SW"], tasks: [["Market scan",true,"22h"],["Location modelling",false,"34h"],["Risk assessment",false,"18h"]], milestones: [["Market scan","2026-08-21"],["Client inputs due","2026-09-15"],["Board pack","2026-09-29"]] },
      { id: "JF-2398", name: "Manufacturing line upgrade", client: "Atlas UEMO", owner: "Sam WEPH", due: "2026-08-28", start: "2026-06-08", status: "Complete", progress: 100, budget: 41000, billed: 41000, spent: 34800, priority: "low", team: ["SW","MC","AN"], tasks: [["Engineering scope",true,"24h"],["Detailed design",true,"90h"],["Commissioning",true,"32h"]], milestones: [["Design freeze","2026-07-17"],["Commissioning","2026-08-21"],["Closeout","2026-08-28"]] },
      { id: "JF-2429", name: "Q4 campaign toolkit", client: "Luma AYTN", owner: "Jordan ZBBA", due: "2026-10-09", start: "2026-09-07", status: "Planning", progress: 8, budget: 14800, billed: 0, spent: 950, priority: "medium", team: ["JL"], tasks: [["Creative brief",false,"8h"],["Campaign concepts",false,"28h"],["Toolkit production",false,"36h"]], milestones: [["Kick-off","2026-09-08"],["Concept selection","2026-09-22"],["Launch assets","2026-10-09"]] }
    ],
    quotes: [
      { id: "QT-1097", title: "Digital service strategy", client: "Greenleaf KERI", value: 32000, date: "2026-09-01", valid: "2026-09-18", status: "Sent" },
      { id: "QT-1094", title: "Visitor experience design", client: "Harbour RKGO", value: 18600, date: "2026-08-28", valid: "2026-09-12", status: "Accepted" },
      { id: "QT-1092", title: "Safety systems review", client: "Atlas UEMO", value: 12400, date: "2026-08-22", valid: "2026-09-06", status: "Draft" },
      { id: "QT-1088", title: "Brand governance retainer", client: "Acme Design PZBW", value: 9600, date: "2026-08-12", valid: "2026-08-30", status: "Declined" }
    ],
    invoices: [
      { id: "INV-2087", client: "Harbour RKGO", job: "Harbour precinct masterplan", value: 9200, issued: "2026-09-01", due: "2026-09-15", status: "Sent" },
      { id: "INV-2085", client: "Greenleaf KERI", job: "FY27 operating model", value: 6600, issued: "2026-08-27", due: "2026-09-10", status: "Sent" },
      { id: "INV-2078", client: "Luma AYTN", job: "Annual impact report", value: 4900, issued: "2026-08-18", due: "2026-09-01", status: "Overdue" },
      { id: "INV-2071", client: "Atlas UEMO", job: "Manufacturing line upgrade", value: 20500, issued: "2026-08-05", due: "2026-08-20", status: "Paid" }
    ],
    times: [
      { job: "Harbour precinct masterplan", task: "Client presentation", note: "Refined narrative and visual sequence", hours: 2.5 },
      { job: "Customer portal redesign", task: "UI design", note: "Account overview and billing screens", hours: 3.25 },
      { job: "Internal — Operations", task: "Team meeting", note: "Weekly studio review", hours: 1 }
    ]
  };

  const capacitySeed = {
    settings: { under: 70, over: 100, colorMode: "capacity" },
    members: [
      { id:"maya", name:"Maya EFUN", role:"Lead designer", team:"Design", code:"MC", weeklyHours:40, workDays:[1,1,1,1,1], allocations:[
        {id:"a1",day:0,title:"Harbour precinct",task:"Client presentation",client:"Harbour RKGO",hours:6,actual:4,billable:true},
        {id:"a2",day:1,title:"Harbour precinct",task:"Client presentation",client:"Harbour RKGO",hours:8,actual:5.5,billable:true},
        {id:"a3",day:2,title:"Annual impact report",task:"Editorial design",client:"Luma AYTN",hours:8,actual:3,billable:true},
        {id:"a4",day:3,title:"Annual impact report",task:"Editorial design",client:"Luma AYTN",hours:8,actual:0,billable:true},
        {id:"a5",day:4,title:"Client design review",task:"Milestone",client:"Harbour RKGO",hours:6,actual:0,billable:true}
      ], leaves:[] },
      { id:"alex", name:"Alex MNYO", role:"Director", team:"Strategy", code:"AN", weeklyHours:40, workDays:[1,1,1,1,1], allocations:[
        {id:"a6",day:0,title:"Portal redesign",task:"UI design",client:"Acme Design PZBW",hours:7,actual:4,billable:true},
        {id:"a7",day:1,title:"FY27 operating model",task:"Partner review",client:"Greenleaf KERI",hours:5,actual:2,billable:true},
        {id:"a8",day:2,title:"Portal redesign",task:"UI design",client:"Acme Design PZBW",hours:7,actual:0,billable:true},
        {id:"a9",day:3,title:"Retail rollout",task:"Location modelling",client:"Greenleaf KERI",hours:6,actual:0,billable:true},
        {id:"a10",day:4,title:"Studio planning",task:"Internal operations",client:"Internal",hours:6,actual:0,billable:false}
      ], leaves:[] },
      { id:"jordan", name:"Jordan ZBBA", role:"Consultant", team:"Strategy", code:"JL", weeklyHours:40, workDays:[1,1,1,1,1], allocations:[
        {id:"a11",day:0,title:"FY27 operating model",task:"Partner review",client:"Greenleaf KERI",hours:9,actual:7,billable:true},
        {id:"a12",day:1,title:"Q4 campaign toolkit",task:"Creative brief",client:"Luma AYTN",hours:8,actual:4,billable:true},
        {id:"a13",day:2,title:"Q4 campaign toolkit",task:"Campaign concepts",client:"Luma AYTN",hours:8,actual:0,billable:true},
        {id:"a14",day:3,title:"Annual impact report",task:"Data visualisation",client:"Luma AYTN",hours:9,actual:2,billable:true},
        {id:"a15",day:4,title:"FY27 operating model",task:"Partner review",client:"Greenleaf KERI",hours:8,actual:0,billable:true}
      ], leaves:[] },
      { id:"sam", name:"Sam WEPH", role:"Engineer", team:"Engineering", code:"SW", weeklyHours:32, workDays:[1,1,1,1,0], allocations:[
        {id:"a16",day:0,title:"Warehouse study",task:"On-site assessment",client:"Atlas UEMO",hours:4,actual:3,billable:true},
        {id:"a17",day:2,title:"Warehouse study",task:"Options analysis",client:"Atlas UEMO",hours:7,actual:0,billable:true},
        {id:"a18",day:3,title:"Site assessment",task:"Field visit",client:"Atlas UEMO",hours:8,actual:0,billable:true}
      ], leaves:[{id:"l1",day:1,hours:4,reason:"Training"}] }
    ],
    unassigned: [
      {id:"u1",title:"Warehouse automation study",task:"Business case",client:"Atlas UEMO",team:"Engineering",remaining:12,estimated:20,planned:8,billable:true,priority:"High"},
      {id:"u2",title:"Customer portal redesign",task:"Developer handoff",client:"Acme Design PZBW",team:"Design",remaining:10,estimated:10,planned:0,billable:true,priority:"Medium"},
      {id:"u3",title:"Q4 campaign toolkit",task:"Toolkit production",client:"Luma AYTN",team:"Design",remaining:18,estimated:36,planned:18,billable:true,priority:"Medium"},
      {id:"u4",title:"Business development",task:"Proposal review",client:"Internal",team:"Strategy",remaining:6,estimated:6,planned:0,billable:false,priority:"Low"}
    ]
  };

  const timelineSeed = {
    columns: { owner:true, status:true, progress:true },
    projects: [
      {jobId:"JF-2418",expanded:true,items:[
        {id:"tl1",name:"Concept and design",type:"phase",owner:"Maya EFUN",start:0,duration:7,progress:100,status:"Complete",dependency:""},
        {id:"tl2",name:"Client presentation",type:"task",owner:"Alex MNYO",start:7,duration:4,progress:65,status:"In progress",dependency:"tl1"},
        {id:"tl3",name:"Planning submission",type:"milestone",owner:"Maya EFUN",start:12,duration:1,progress:0,status:"At risk",dependency:"tl2"}
      ]},
      {jobId:"JF-2421",expanded:true,items:[
        {id:"tl4",name:"UX and UI design",type:"phase",owner:"Maya EFUN",start:3,duration:12,progress:62,status:"In progress",dependency:""},
        {id:"tl5",name:"Developer handoff",type:"task",owner:"Jordan ZBBA",start:15,duration:5,progress:10,status:"Planned",dependency:"tl4"},
        {id:"tl6",name:"Portal launch",type:"milestone",owner:"Alex MNYO",start:22,duration:1,progress:0,status:"Planned",dependency:"tl5"}
      ]},
      {jobId:"JF-2427",expanded:true,items:[
        {id:"tl7",name:"Discovery",type:"phase",owner:"Sam WEPH",start:7,duration:8,progress:35,status:"In progress",dependency:""},
        {id:"tl8",name:"On-site assessment",type:"task",owner:"Sam WEPH",start:12,duration:4,progress:10,status:"In progress",dependency:"tl7"},
        {id:"tl9",name:"Options analysis",type:"phase",owner:"Sam WEPH",start:16,duration:10,progress:0,status:"Planned",dependency:"tl8"},
        {id:"tl10",name:"Business case",type:"task",owner:"Alex MNYO",start:27,duration:8,progress:0,status:"At risk",dependency:"tl9"},
        {id:"tl11",name:"Final report",type:"milestone",owner:"Sam WEPH",start:36,duration:1,progress:0,status:"Planned",dependency:"tl10"}
      ]},
      {jobId:"JF-2409",expanded:true,items:[
        {id:"tl12",name:"Editorial design",type:"phase",owner:"Maya EFUN",start:2,duration:16,progress:64,status:"In progress",dependency:""},
        {id:"tl13",name:"Production artwork",type:"task",owner:"Jordan ZBBA",start:18,duration:8,progress:0,status:"Planned",dependency:"tl12"},
        {id:"tl14",name:"Press-ready delivery",type:"milestone",owner:"Maya EFUN",start:27,duration:1,progress:0,status:"Planned",dependency:"tl13"}
      ]}
    ]
  };

  const recurringSeed = [
    { id:"RJ-018", name:"Monthly marketing retainer", client:"Luma AYTN", owner:"Jordan ZBBA", cadence:"Monthly", next:"2026-09-07", budget:4800, active:true },
    { id:"RJ-014", name:"Quarterly safety review", client:"Atlas UEMO", owner:"Sam WEPH", cadence:"Quarterly", next:"2026-10-01", budget:7200, active:true },
    { id:"RJ-009", name:"Website care plan", client:"Acme Design PZBW", owner:"Alex MNYO", cadence:"Monthly", next:"2026-09-15", budget:2400, active:true }
  ];

  let state;
  try { state = window.JOBFLOW_CLOUD ? structuredClone(window.JOBFLOW_CLOUD.initialState) : JSON.parse(localStorage.getItem(storageKey)) || structuredClone(seed); }
  catch { state = structuredClone(seed); }
  if (!state.capacity) state.capacity = structuredClone(capacitySeed);
  if (!state.timeline) state.timeline = structuredClone(timelineSeed);
  if (!state.recurring) state.recurring = structuredClone(recurringSeed);
  state.capacity.members.forEach((member,index)=>{member.staffId??=`HAN${String(index+1).padStart(3,"0")}`;member.targetUtilization??=80;member.status??="active";member.email??="";});
  state.jobs.forEach((job,index) => {
    job.contact ||= `${job.client.split(" ")[0]} project team`;
    job.orderNo ||= `PO-${job.id.replace("JF-", "26")}`;
    job.template ||= "Professional services";
    job.description ||= `Plan, deliver, and report on ${job.name.toLowerCase()} for ${job.client}.`;
    job.notes ||= [{ id:`note-${job.id}`, author:"Alex MNYO", date:"2026-09-03", text:"Scope and delivery plan confirmed with the project team." }];
    job.notes.forEach((note,noteIndex)=>{note.id||=`note-${job.id}-${noteIndex}`;});
    job.documents ||= [{ id:`doc-${job.id}`, name:`${job.id} project brief.pdf`, type:"Project brief", added:"Sep 1, 2026", size:"1.2 MB" }];
    job.history ||= [{ id:`history-${job.id}`, date:"Sep 3, 2026 · 4:15 PM", text:`${job.owner} updated job progress to ${job.progress}%.` }];
    job.clientSize ||= ["Large","Medium","Small"][index%3];
    job.startReminder ||= job.start;
    job.deadlineReviewDate ||= dateFromTimelineDay(timelineDay(job.start)+7);
    ensureJobPhaseHierarchy(job);
  });
  let currentView = "dashboard";
  let jobSection = "active";
  let jobQuickFilter = "all";
  let jobFilter = "All statuses";
  let jobQuery = "";
  let jobSearchSelection = "";
  let boardClientQuery = "";
  let boardClientFilter = "";
  let boardDepartmentFilter = "All departments";
  let boardStepFilter = "All steps";
  let selectedBoardViewId = "";
  let boardViewDraft = null;
  let calendarClientFilter = "";
  let calendarEventFilter = "All calendar items";
  let capacityFilters = { team: "All teams", client: "All clients" };
  let capacityQuery = "";
  let capacitySearchSelection = "";
  let capacityWeekOffset = 0;
  let scheduleMode = "timeline";
  let timelineGroup = "job";
  let timelineFilters = { owner:"All staff", status:"All statuses", clientQuery:"", clientSelection:"", department:"All departments" };
  let dashboardFilters = {period:"Month",service:"All services",staff:"All staff",jobStatus:"All job statuses",jobStage:"All stages",taskStatus:"All task statuses",deadlineStatus:"All deadline statuses"};
  let dashboardSectionFilters = {pipeline:{query:"",selected:"",metric:"All statuses"},tasks:{query:"",selected:"",metric:"All deadline statuses"},risk:{query:"",selected:"",metric:"All risk levels"}};
  const expandedDashboardSections = new Set();
  let activeJobId = null;
  let activeJobTab = "information";
  let scheduleFocusJobId = null;
  let timer = { running: false, seconds: 0, interval: null };

  let lastSavedState;
  const save = () => {
    syncRelations();
    if (window.JOBFLOW_CLOUD) {
      const data=JSON.stringify(state);
      if (data===lastSavedState) return true;
      const accepted=window.JOBFLOW_CLOUD.save(JSON.parse(data));
      if (accepted) lastSavedState=data;
      else if(lastSavedState) state=JSON.parse(lastSavedState);
      return accepted;
    }
    try { const data=JSON.stringify(state);localStorage.setItem(storageKey,data);lastSavedState=data;return true; } catch { if(lastSavedState)state=JSON.parse(lastSavedState);showToast("Save failed: browser storage is unavailable or full. The change was not saved.");return false; }
  };
  const getJob = id => state.jobs.find(job => job.id === id);
  const total = (items, field) => items.reduce((sum, item) => sum + Number(item[field] || 0), 0);
  const workingJobs = () => state.jobs.filter(job => !["Complete","Cancelled"].includes(job.status));
  const initials = name => name.split(/\s+/).map(x => x[0]).slice(0,2).join("").toUpperCase();
  const currentStaffName = () => state.capacity.members.find(m=>m.id===window.JOBFLOW_CLOUD?.staffId)?.shortName || window.JOBFLOW_CLOUD?.email || state.capacity.members[0]?.name || "User";
  const todayKey = () => { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };
  let calendarMonth = new Date(new Date().getFullYear(),new Date().getMonth(),1);
  let timelineOffset = timelineDay(todayKey());
  let timelineEnd = timelineOffset + 41;
  const selectedJobs = new Set();
  const auditHistory = (job,details={}) => job.history.unshift({id:crypto.randomUUID(),date:new Date().toLocaleString(),timestamp:Date.now(),actor:currentStaffName(),...details,text:details.text||`${currentStaffName()} updated the job, task, or schedule.`});

  function timelineVisibleDays() { return Math.max(1,timelineEnd-timelineOffset+1); }

  function schedulePhase(project,item) {
    if (!project || !item) return null;
    return item.type==="phase" ? item : project.items.find(candidate=>candidate.id===item.parentPhaseId && candidate.type==="phase") || null;
  }

  function scheduleItemSummary(item,project) {
    if (!item) return "Not available";
    const phase=schedulePhase(project,item);
    return [`Name: ${item.name}`,`Start: ${shortDate(dateFromTimelineDay(item.start))}`,`Duration: ${item.duration} day${item.duration===1?"":"s"}`,`Owner: ${item.owner}`,`Progress: ${item.progress}%`,phase&&item.type!=="phase"?`Phase: ${phase.name}`:""].filter(Boolean).join(" · ");
  }

  function recordScheduleHistory(job,action,item,project,oldValue,newValue) {
    if (!job) return;
    const phase=schedulePhase(project,item);
    const entityLabel=item?.type ? `${item.type} “${item.name}”` : `job “${job.name}”`;
    auditHistory(job,{source:"schedule",action,entityType:item?.type||"job",entityName:item?.name||job.name,phaseName:phase?.name||"",oldValue,newValue,text:`${currentStaffName()} ${action.toLowerCase()} ${entityLabel} in ${job.id}.`});
  }

  function normalizeTaskDetail(task,job) {
    task.due = dateFromTimelineDay(task.start+Math.max(1,task.duration)-1);
    task.checklist ||= [];
    task.subtasks ||= [];
    task.checklist.forEach((item,index)=>{if(typeof item==="string")task.checklist[index]={id:crypto.randomUUID(),text:item,completed:false};else{item.id||=crypto.randomUUID();item.completed=Boolean(item.completed);}});
    task.subtasks.forEach((subtask,index)=>{subtask.id||=crypto.randomUUID();subtask.owner||=task.owner||job.owner;subtask.due||=task.due;subtask.completed=Boolean(subtask.completed);subtask.checklist||=[];subtask.checklist.forEach((item,itemIndex)=>{if(typeof item==="string")subtask.checklist[itemIndex]={id:crypto.randomUUID(),text:item,completed:false};else{item.id||=crypto.randomUUID();item.completed=Boolean(item.completed);}});});
    return task;
  }

  function normalizeTemplateDetail(template) {
    for(const phase of template.phases||[])for(const task of phase.tasks||[]){task.checklist||=[];task.subtasks||=[];task.checklist=task.checklist.map(item=>typeof item==="string"?{id:crypto.randomUUID(),text:item}:{...item,id:item.id||crypto.randomUUID()});task.subtasks.forEach(subtask=>{subtask.id||=crypto.randomUUID();subtask.owner||="Job owner";subtask.dueOffset??=Math.max(0,(task.duration||1)-1);subtask.checklist||=[];subtask.checklist=subtask.checklist.map(item=>typeof item==="string"?{id:crypto.randomUUID(),text:item}:{...item,id:item.id||crypto.randomUUID()});});}
    return template;
  }

  function syncRelations() {
    for (const job of state.jobs) {
      const project=ensureJobPhaseHierarchy(job);
      project.items.filter(item=>item.type==="task").forEach(item=>normalizeTaskDetail(item,job));
      for (const task of job.tasks) {
        const item=project.items.find(i=>i.id===task[3]) || project.items.find(i=>i.type==="task" && i.name===task[0] && !job.tasks.some(t=>t!==task && t[3]===i.id));
        if (item) { task[3]=item.id; item.estimatedHours ??= Number.parseFloat(task[2])||8; task[0]=item.name; task[1]=item.progress===100; }
      }
      for (const milestone of job.milestones) {
        let item=project.items.find(i=>i.id===milestone[2]);
        if (!item) {
          item=project.items.find(i=>i.type==="milestone" && i.name===milestone[0] && !job.milestones.some(m=>m!==milestone && m[2]===i.id));
          if (item) item.start=timelineDay(milestone[1]);
          else { item={id:crypto.randomUUID(),type:"milestone",name:milestone[0],start:timelineDay(milestone[1]),duration:1,owner:job.owner,progress:0,status:"Planned",dependency:""}; project.items.push(item); }
          milestone[2]=item.id;
        }
        milestone[0]=item.name; milestone[1]=dateFromTimelineDay(item.start);
      }
      for (const item of project.items.filter(i=>i.type==="milestone")) if (!job.milestones.some(m=>m[2]===item.id)) job.milestones.push([item.name,dateFromTimelineDay(item.start),item.id]);
      job.milestones.sort((a,b)=>a[1].localeCompare(b[1]));
      project.items.sort((a,b)=>a.start-b.start || a.type.localeCompare(b.type) || a.id.localeCompare(b.id));
      syncProjectProgress(project);
    }
    for (const entry of [...state.times,...state.invoices]) {
      entry.jobId ||= state.jobs.find(j=>j.name===entry.job)?.id;
      const job=getJob(entry.jobId); if (job) {entry.job=job.name; if (entry.client) entry.client=job.client;}
    }
    const aliases={"Harbour precinct":"JF-2418","Portal redesign":"JF-2421","Retail rollout":"JF-2414","Warehouse study":"JF-2427"};
    for (const entry of [...state.capacity.unassigned,...state.capacity.members.flatMap(m=>m.allocations)]) {
      entry.jobId ||= state.jobs.find(j=>j.name===entry.title)?.id || aliases[entry.title];
      const job=getJob(entry.jobId);
      if (job) {
        entry.title=job.name; entry.client=job.client;
        entry.taskId ||= state.timeline.projects.find(p=>p.jobId===job.id)?.items.find(i=>i.name===entry.task && i.type==="task")?.id;
        const task=state.timeline.projects.find(p=>p.jobId===job.id)?.items.find(i=>i.id===entry.taskId); if (task) entry.task=task.name;
      }
    }
    for (const member of state.capacity.members) for (const entry of [...member.allocations,...member.leaves]) entry.weekOffset ??= 0;
    for (const project of state.timeline.projects) {
      const job=getJob(project.jobId); if (!job) continue;
      for (const task of project.items.filter(i=>i.type==="task")) {
        let queue=state.capacity.unassigned.find(q=>q.taskId===task.id && q.jobId===job.id);
        if (!queue) {queue={id:crypto.randomUUID(),jobId:job.id,taskId:task.id,title:job.name,task:task.name,client:job.client,team:state.capacity.members.find(m=>m.name===task.owner)?.team||"Unassigned",billable:true,priority:job.priority,estimated:task.estimatedHours||task.duration*8}; state.capacity.unassigned.push(queue);}
        queue.estimated=task.estimatedHours||task.duration*8;
        queue.planned=state.capacity.members.flatMap(m=>m.allocations).filter(a=>a.taskId===task.id).reduce((s,a)=>s+a.hours,0);
        queue.remaining=task.progress===100 || ["Complete","Cancelled"].includes(job.status) ? 0 : Math.max(0,queue.estimated-queue.planned);
      }
    }
    for(const member of state.capacity.members) for(const allocation of member.allocations){
      allocation.baselineActual ??= allocation.actual||0;
      const date=dateFromTimelineDay(6+allocation.weekOffset*7+allocation.day);
      const matching=member.allocations.filter(a=>a.taskId===allocation.taskId && a.weekOffset===allocation.weekOffset && a.day===allocation.day);
      const weight=matching.reduce((s,a)=>s+a.hours,0);
      const recorded=state.times.filter(t=>t.taskId && t.taskId===allocation.taskId && t.memberId===member.id && t.date===date).reduce((s,t)=>s+t.hours,0);
      allocation.actual=allocation.baselineActual+(weight?recorded*allocation.hours/weight:0);
    }
  }

  function showPanel(title, content) {
    $("#audit-panel")?.remove();
    document.body.insertAdjacentHTML("beforeend",`<div class="modal-backdrop" id="audit-panel"><section class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modal-head"><h2>${esc(title)}</h2><button class="icon-btn" data-close-modal aria-label="Close">×</button></div>${content}</section></div>`);
    applyAccessControls();
  }

  function historyPanel() {
    const rows=state.jobs.flatMap(j=>j.history.map(h=>({job:j,...h}))).sort((a,b)=>(b.timestamp||0)-(a.timestamp||0));
    showPanel("Activity & job history",`<div class="history-panel-list">${rows.map(h=>historyEntryMarkup(h,h.job,true)).join("")||"No activity yet."}</div>`);
  }

  function historyEntryMarkup(item,job,clickable=false) {
    const details=[item.source==="schedule"?"Schedule":"Job",`${job.id}: ${job.name}`,item.phaseName?`Phase: ${item.phaseName}`:"",item.entityName?`${item.entityType||"item"}: ${item.entityName}`:""].filter(Boolean).join(" · ");
    const changes=item.oldValue||item.newValue?`<div class="history-change"><span><b>Before</b>${esc(item.oldValue||"Not recorded")}</span><i>→</i><span><b>After</b>${esc(item.newValue||"Not recorded")}</span></div>`:"";
    const content=`<span class="activity-mark">${icon("clock")}</span><div class="history-entry-copy"><strong>${esc(item.text)}</strong><small>${esc(item.actor||job.owner)} · ${esc(item.date)}</small><p>${esc(details)}</p>${changes}</div>`;
    return clickable?`<button class="history-entry history-entry-link" data-history-job="${job.id}">${content}</button>`:`<article class="history-entry">${content}</article>`;
  }

  function timelineDay(value) {
    const base = new Date("2026-09-01T00:00:00");
    return Math.round((new Date(`${value}T00:00:00`) - base) / 86400000);
  }

  function dateFromTimelineDay(day) {
    const date = new Date("2026-09-01T12:00:00");
    date.setDate(date.getDate() + Number(day || 0));
    return date.toISOString().slice(0,10);
  }

  function ensureJobPhaseHierarchy(job) {
    let project = state.timeline.projects.find(item => item.jobId === job.id);
    if (!project) {
      project = { jobId:job.id, expanded:true, items:[] };
      state.timeline.projects.push(project);
    }
    if(window.JOBFLOW_CLOUD&&window.JOBFLOW_CLOUD.role!=='admin'&&!window.JOBFLOW_CLOUD.permissions?.phases)return project;

    let phases = project.items.filter(item => item.type === "phase").sort((a,b) => a.start - b.start);
    if (!phases.length) {
      const start = timelineDay(job.start);
      phases = [{
        id:`phase-${job.id}-delivery`, name:"Project delivery", type:"phase", owner:job.owner,
        start, duration:Math.max(1,timelineDay(job.due)-start), progress:job.progress || 0,
        status:job.progress === 100 ? "Complete" : job.progress > 0 ? "In progress" : "Planned", dependency:""
      }];
      project.items.push(phases[0]);
    }

    job.tasks.forEach((task,index) => {
      const taskName = String(task[0]).toLowerCase();
      let item = project.items.find(candidate => candidate.id === task[3]) || project.items.find(candidate => candidate.type === "task" && candidate.name.toLowerCase() === taskName && !job.tasks.some(other=>other!==task && other[3]===candidate.id));
      if (!item) {
        const matchingPhase = phases.find(phase => phase.name.toLowerCase() === taskName);
        const parent = matchingPhase || phases[0];
        item = {
          id:`task-${job.id}-${index}`, name:task[0], type:"task", owner:job.owner,
          start:parent.start + Math.min(index,Math.max(0,parent.duration-1)),
          duration:Math.max(1,Math.ceil((Number.parseFloat(task[2]) || 8) / 8)),
          progress:task[1] ? 100 : 0, status:task[1] ? "Complete" : "Planned",
          dependency:"", parentPhaseId:parent.id
        };
        project.items.push(item);
      }
    });

    phases = project.items.filter(item => item.type === "phase").sort((a,b) => a.start - b.start);
    project.items.filter(item => item.type === "task").forEach(task => {
      if (phases.some(phase => phase.id === task.parentPhaseId)) return;
      const dependencyPhase = phases.find(phase => phase.id === task.dependency);
      const precedingPhase = [...phases].reverse().find(phase => phase.start <= task.start);
      task.parentPhaseId = (dependencyPhase || precedingPhase || phases[0]).id;
    });
    project.items.filter(item=>item.type==="task").forEach(task=>normalizeTaskDetail(task,job));
    project.items.filter(item=>item.type==="task").forEach(task=>normalizeTaskDetail(task,job));
    project.items.sort((a,b) => a.start - b.start || (a.type === "phase" ? -1 : 1));
    return project;
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timeout);
    showToast.timeout = setTimeout(() => toast.classList.remove("show"), 2800);
  }

  function pageHead(kicker, title, subtitle, actions = "") {
    return `<div class="page-head"><div><p class="eyebrow">${kicker}</p><h1>${title}</h1><p>${subtitle}</p></div><div class="page-actions">${actions}</div></div>`;
  }

  function peopleAvatars(team) {
    const colors = ["#dce8ff", "#fde5c0", "#dff3ed", "#efe5fb"];
    return `<div class="people">${team.map((person, i) => {const member=state.capacity.members.find(item=>item.shortName===person||item.name===person);return `<span class="avatar" title="${esc(member?`${member.shortName} · ${member.fullName}`:person)}" style="background:${colors[i % colors.length]}">${esc(member?.code||staffCode(person))}</span>`;}).join("")}</div>`;
  }

  function jobStatusBucket(job) {
    return job.status==="Planning"?"Not started":["In progress","Review"].includes(job.status)?"In progress":job.status==="Cancelled"?"Cancelled":job.status;
  }

  function deadlineBucket(date) {
    const delta=timelineDay(date)-timelineDay(todayKey());
    return delta<0?"Overdue":delta===0?"Due today":delta<=3?"Due in 1–3 days":delta<=7?"Due in 4–7 days":"Later";
  }

  function dashboardTaskRows(jobs) {
    return jobs.flatMap(job=>{
      const project=state.timeline.projects.find(candidate=>candidate.jobId===job.id);
      return (project?.items||[]).filter(item=>item.type==="task").map(item=>{
        const deadline=dateFromTimelineDay(item.start+item.duration-1);
        const status=item.progress===100?"Complete":deadline<todayKey()?"Overdue":item.progress>0?"In progress":"Not started";
        const phase=schedulePhase(project,item);
        return {job,item,phase,deadline,status,deadlineStatus:deadlineBucket(deadline)};
      });
    });
  }

  function jobStage(job) {
    const project=state.timeline.projects.find(candidate=>candidate.jobId===job.id),today=timelineDay(todayKey());
    const phases=(project?.items||[]).filter(item=>item.type==="phase").sort((a,b)=>a.start-b.start);
    return phases.find(phase=>phase.progress<100&&phase.start<=today&&phase.start+phase.duration-1>=today)?.name||phases.find(phase=>phase.progress<100&&phase.start>today)?.name||[...phases].reverse().find(phase=>phase.progress<100)?.name||"Complete";
  }

  function dashboardPeriodRange() {
    const now=new Date(`${todayKey()}T12:00:00`),start=new Date(now),end=new Date(now);
    if(dashboardFilters.period==="Week"){const day=(now.getDay()+6)%7;start.setDate(now.getDate()-day);end.setDate(start.getDate()+6);}
    if(dashboardFilters.period==="Month"){start.setDate(1);end.setMonth(now.getMonth()+1,0);}
    if(dashboardFilters.period==="Year"){start.setMonth(0,1);end.setMonth(11,31);}
    return [start.toISOString().slice(0,10),end.toISOString().slice(0,10)];
  }

  function dashboardData() {
    const [from,to]=dashboardPeriodRange();
    const stageOptions=[...new Set(state.jobs.map(job=>jobStage(job)))].sort();
    let jobs=state.jobs.filter(job=>job.start<=to&&job.due>=from)
      .filter(job=>dashboardFilters.service==="All services"||job.template===dashboardFilters.service)
      .filter(job=>dashboardFilters.staff==="All staff"||job.owner===dashboardFilters.staff||job.team?.includes(dashboardFilters.staff))
      .filter(job=>dashboardFilters.jobStatus==="All job statuses"||jobStatusBucket(job)===dashboardFilters.jobStatus)
      .filter(job=>dashboardFilters.jobStage==="All stages"||jobStage(job)===dashboardFilters.jobStage);
    let tasks=dashboardTaskRows(jobs)
      .filter(row=>dashboardFilters.taskStatus==="All task statuses"||row.status===dashboardFilters.taskStatus)
      .filter(row=>dashboardFilters.deadlineStatus==="All deadline statuses"||row.deadlineStatus===dashboardFilters.deadlineStatus);
    return {from,to,jobs,tasks,stageOptions};
  }

  function distributionBar(counts,classes={}) {
    const totalCount=Object.values(counts).reduce((sum,value)=>sum+value,0)||1;
    return `<div class="distribution-bar">${Object.entries(counts).map(([label,value])=>`<span class="${classes[label]||statusClass(label)}" style="width:${value/totalCount*100}%" title="${esc(label)}: ${value}"></span>`).join("")}</div><div class="distribution-legend">${Object.entries(counts).map(([label,value])=>`<span><i class="${classes[label]||statusClass(label)}"></i>${esc(label)} <b>${value}</b></span>`).join("")}</div>`;
  }

  function renderDashboard() {
    const {from,to,jobs,tasks,stageOptions}=dashboardData(),today=todayKey(),next7=dateFromTimelineDay(timelineDay(today)+7);
    const inProgress=jobs.filter(job=>jobStatusBucket(job)==="In progress");
    const todayTasks=tasks.filter(row=>row.deadline===today&&row.status!=="Complete"),nextTasks=tasks.filter(row=>row.deadline>today&&row.deadline<=next7&&row.status!=="Complete"),overdueTasks=tasks.filter(row=>row.status==="Overdue");
    const services=Object.fromEntries([...new Set(state.jobTemplates.map(template=>template.name))].map(service=>[service,jobs.filter(job=>job.template===service).length]));
    const maxService=Math.max(1,...Object.values(services));
    const jobStatuses=Object.fromEntries(["Not started","In progress","On hold","Cancelled","Complete"].map(status=>[status,jobs.filter(job=>jobStatusBucket(job)===status).length]));
    const taskStatuses=Object.fromEntries(["Not started","In progress","Overdue","Complete"].map(status=>[status,tasks.filter(row=>row.status===status).length]));
    const pipelineEnd=dateFromTimelineDay(timelineDay(today)+30),rawPipeline=jobs.filter(job=>job.start<=pipelineEnd&&job.due>=today).sort((a,b)=>a.due.localeCompare(b.due));
    const riskWeight={High:3,Medium:2,Low:1};
    const rawRiskRows=jobs.filter(job=>job.due<today&&!['Complete','Cancelled'].includes(jobStatusBucket(job))||job.priority==="high"&&job.due<=next7).map(job=>{const days=Math.max(0,timelineDay(today)-timelineDay(job.due)),risk=days>7?"High":days>0||job.priority==="high"?"Medium":"Low";return {job,days,risk};}).sort((a,b)=>riskWeight[b.risk]-riskWeight[a.risk]||b.days-a.days||a.job.due.localeCompare(b.job.due));
    const reminders=jobs.filter(job=>job.startReminder>=today&&job.startReminder<=pipelineEnd).sort((a,b)=>a.startReminder.localeCompare(b.startReminder));
    const reviews=jobs.filter(job=>job.deadlineReviewDate<=next7&&!['Complete','Cancelled'].includes(jobStatusBucket(job))).sort((a,b)=>a.deadlineReviewDate.localeCompare(b.deadlineReviewDate));
    const pipeline=rawPipeline.filter(job=>(!dashboardSectionFilters.pipeline.selected||job.id===dashboardSectionFilters.pipeline.selected)&&(dashboardSectionFilters.pipeline.metric==="All statuses"||jobStatusBucket(job)===dashboardSectionFilters.pipeline.metric));
    const priorityTasks=[...tasks].filter(row=>row.status!=="Complete"&&(!dashboardSectionFilters.tasks.selected||row.item.id===dashboardSectionFilters.tasks.selected)&&(dashboardSectionFilters.tasks.metric==="All deadline statuses"||row.deadlineStatus===dashboardSectionFilters.tasks.metric)).sort((a,b)=>a.deadline.localeCompare(b.deadline));
    const riskRows=rawRiskRows.filter(row=>(!dashboardSectionFilters.risk.selected||row.job.id===dashboardSectionFilters.risk.selected)&&(dashboardSectionFilters.risk.metric==="All risk levels"||row.risk===dashboardSectionFilters.risk.metric));
    const visibleRows=(key,rows)=>expandedDashboardSections.has(key)?rows:rows.slice(0,5);
    const sectionTools=(key,placeholder,metric,options,count)=>`<div class="dashboard-section-toolbar">${searchPickerMarkup(`dashboard-${key}`,`dashboard-${key}-search`,dashboardSectionFilters[key].query,placeholder,dashboardSectionFilters[key].selected?dashboardSectionFilters[key].query:"")}<select data-dashboard-section-metric="${key}">${options.map(option=>`<option ${metric===option?"selected":""}>${esc(option)}</option>`).join("")}</select><span>${Math.min(expandedDashboardSections.has(key)?count:5,count)} of ${count} items</span></div>`;
    const sectionActions=(key,module,label)=>`<div class="dashboard-section-actions"><button class="button ghost compact-button" data-dashboard-expand="${key}">${expandedDashboardSections.has(key)?"Show 5":"Show all"}</button><button class="button ghost compact-button" ${module==="capacity"?"data-open-capacity":module==="schedule"?"data-dashboard-module=\"schedule\"":`data-view-link=\"${module}\"`}>${esc(label)} →</button></div>`;
    const filter=(id,value,options)=>`<label><span>${id.replaceAll("-"," ")}</span><select id="dashboard-${id}">${options.map(option=>`<option ${value===option?"selected":""}>${esc(option)}</option>`).join("")}</select></label>`;
    return `${pageHead(new Date().toLocaleDateString("en-US",{weekday:"long",day:"numeric",month:"long"}),"Team overview","Operational view of jobs, deadlines, delivery and team capacity.",`<div class="date-chip">${icon("calendar")} ${shortDate(from)}–${shortDate(to)}</div><button class="button primary" data-open-job>${icon("plus")}New job</button>`)}
      <section class="dashboard-filter-card" aria-label="Dashboard filters">${filter("period",dashboardFilters.period,["Week","Month","Year"])}${filter("service",dashboardFilters.service,["All services",...state.jobTemplates.map(item=>item.name)])}${filter("staff",dashboardFilters.staff,["All staff",...state.capacity.members.map(item=>item.shortName)])}${filter("job-status",dashboardFilters.jobStatus,["All job statuses","Not started","In progress","On hold","Cancelled","Complete"])}${filter("job-stage",dashboardFilters.jobStage,["All stages",...stageOptions])}${filter("task-status",dashboardFilters.taskStatus,["All task statuses","Not started","In progress","Overdue","Complete"])}${filter("deadline-status",dashboardFilters.deadlineStatus,["All deadline statuses","Overdue","Due today","Due in 1–3 days","Due in 4–7 days"])}<button class="button ghost" data-dashboard-reset>Reset</button></section>
      <section class="metrics dashboard-metrics" aria-label="Operational overview">${metric("Jobs in progress",inProgress.length,"","In selected period","briefcase","#0a8e80","#e4f7f4")}${metric("Tasks due today",todayTasks.length,"","Open tasks","clock","#376bd8","#eaf0ff")}${metric("Tasks due next 7 days",nextTasks.length,"","Excludes today","calendar","#7857c5","#f0ebfb")}${metric("Overdue tasks",overdueTasks.length,"","Needs attention","receipt","#d64b4b","#ffebeb",true)}</section>
      <div class="dashboard-analysis-grid">
        <section class="card dashboard-chart"><div class="card-head"><div><h2>Service line</h2><p>Jobs by service</p></div></div><div class="horizontal-bars">${Object.entries(services).map(([name,value])=>`<div><span>${esc(name)}</span><i><b style="width:${value/maxService*100}%"></b></i><strong>${value}</strong></div>`).join("")}</div></section>
        <section class="card dashboard-chart"><div class="card-head"><div><h2>Job status</h2><p>Selected portfolio</p></div></div><div class="chart-body">${distributionBar(jobStatuses)}</div></section>
        <section class="card dashboard-chart"><div class="card-head"><div><h2>Task status</h2><p>${tasks.length} scheduled tasks</p></div></div><div class="chart-body">${distributionBar(taskStatuses)}</div></section>
      </div>
      <section class="card dashboard-wide compact-dashboard-section"><div class="card-head"><div><h2>30-day delivery pipeline</h2><p>Five nearest deadlines first</p></div>${sectionActions("pipeline","schedule","Open Schedule")}</div>${sectionTools("pipeline","Search job, client or PIC…",dashboardSectionFilters.pipeline.metric,["All statuses","Not started","In progress","On hold","Cancelled","Complete"],pipeline.length)}<div class="dashboard-table-scroll"><table class="jobs-table dashboard-table"><thead><tr><th>Job</th><th>Client</th><th>PIC</th><th>Stage</th><th>Deadline</th><th>Status</th><th>30-day timeline</th></tr></thead><tbody>${visibleRows("pipeline",pipeline).map(job=>{const left=Math.max(0,(timelineDay(job.start)-timelineDay(today))/30*100),right=Math.min(100,(timelineDay(job.due)-timelineDay(today)+1)/30*100),width=Math.max(3,right-left);return `<tr data-job="${job.id}"><td><button class="text-btn" data-job="${job.id}">${esc(job.name)}</button></td><td>${esc(job.client)}</td><td>${esc(job.owner)}</td><td>${esc(jobStage(job))}</td><td>${shortDate(job.due)}</td><td><span class="status ${statusClass(job.status)}">${esc(jobStatusBucket(job))}</span></td><td><div class="pipeline-track"><span style="left:${left}%;width:${width}%"></span></div></td></tr>`;}).join("")||'<tr><td colspan="7">No matching jobs in the next 30 days.</td></tr>'}</tbody></table></div></section>
      <section class="card dashboard-wide compact-dashboard-section"><div class="card-head"><div><h2>Priority task list</h2><p>Five nearest or overdue deadlines first</p></div>${sectionActions("tasks","schedule","Open Schedule")}</div>${sectionTools("tasks","Search task, job or PIC…",dashboardSectionFilters.tasks.metric,["All deadline statuses","Overdue","Due today","Due in 1–3 days","Due in 4–7 days","Later"],priorityTasks.length)}<div class="dashboard-table-scroll"><table class="jobs-table dashboard-table"><thead><tr><th>Task</th><th>Job</th><th>PIC</th><th>Deadline</th><th>Deadline status</th></tr></thead><tbody>${visibleRows("tasks",priorityTasks).map(row=>`<tr data-job="${row.job.id}"><td><button class="text-btn" data-job="${row.job.id}" data-job-tab="phases">${esc(row.item.name)}</button></td><td>${esc(row.job.name)}</td><td>${esc(row.item.owner)}</td><td>${shortDate(row.deadline)}</td><td><span class="deadline-chip ${statusClass(row.deadlineStatus)}">${esc(row.deadlineStatus)}</span></td></tr>`).join("")||'<tr><td colspan="5">No matching tasks.</td></tr>'}</tbody></table></div></section>
      <section class="card dashboard-wide compact-dashboard-section"><div class="card-head"><div><h2>Overdue & at-risk jobs</h2><p>Highest risk and most overdue first</p></div>${sectionActions("risk","jobs","Open Jobs")}</div>${sectionTools("risk","Search job, client or PIC…",dashboardSectionFilters.risk.metric,["All risk levels","High","Medium","Low"],riskRows.length)}<div class="dashboard-table-scroll"><table class="jobs-table dashboard-table"><thead><tr><th>Job</th><th>Deadline</th><th>Days overdue</th><th>Status</th><th>PIC</th><th>Risk</th></tr></thead><tbody>${visibleRows("risk",riskRows).map(row=>`<tr data-job="${row.job.id}"><td><button class="text-btn" data-job="${row.job.id}">${esc(row.job.name)}</button></td><td>${shortDate(row.job.due)}</td><td>${row.days}</td><td>${esc(jobStatusBucket(row.job))}</td><td>${esc(row.job.owner)}</td><td><span class="risk-pill ${row.risk.toLowerCase()}">${row.risk}</span></td></tr>`).join("")||'<tr><td colspan="6">No matching overdue or at-risk jobs.</td></tr>'}</tbody></table></div></section>
      <div class="dashboard-split">
        <section class="card"><div class="card-head"><div><h2>Start reminders</h2><p>Jobs contracted earlier and approaching delivery start</p></div></div><ul class="dashboard-action-list">${reminders.map(job=>`<li><button data-job="${job.id}"><span><strong>${esc(job.name)}</strong><small>${esc(job.client)} · PIC ${esc(job.owner)}</small></span><time>${shortDate(job.startReminder)}</time></button></li>`).join("")||'<li class="empty-list">No start reminders in the next 30 days.</li>'}</ul></section>
        <section class="card"><div class="card-head"><div><h2>Weekly deadline review</h2><p>Review and reset deadlines where needed</p></div></div><ul class="dashboard-action-list">${reviews.slice(0,10).map(job=>`<li><div class="review-row"><button data-job="${job.id}" data-job-tab="phases"><span><strong>${esc(job.name)}</strong><small>${esc(jobStage(job))} · ${esc(job.owner)}</small></span><time>${shortDate(job.deadlineReviewDate)}</time></button><button class="review-done" data-review-deadline="${job.id}">Reviewed</button></div></li>`).join("")||'<li class="empty-list">No deadline reviews due this week.</li>'}</ul></section>
      </div>`;
  }

  function metric(label, value, trend, foot, iconName, color, tint, negative = false) {
    return `<article class="metric-card" style="--metric-color:${color};--metric-tint:${tint}"><div class="metric-top"><span>${label}</span><span class="metric-icon">${icon(iconName)}</span></div><div class="metric-value">${value}</div><div class="metric-foot"><span class="trend ${negative ? "negative" : ""}">${icon(negative ? "arrow-down" : "arrow-up")}${trend}</span><span>${foot}</span></div></article>`;
  }

  function activity(iconName, title, detail, time) {
    return `<li class="activity-item"><span class="activity-mark">${icon(iconName)}</span><div class="activity-copy"><p><strong>${title}</strong><br>${detail}</p><time>${time}</time></div></li>`;
  }

  function capacityRow(name, person, used, available, tone) {
    return `<div class="capacity-row"><div class="capacity-person"><span class="avatar">${person}</span>${name}</div><div class="capacity-bar"><span class="${tone}" style="width:${(available ? Math.min(100, used/available*100) : 0)}%"></span></div><span class="capacity-number">${used}/${available}h</span></div>`;
  }

  function jobsTable(jobs, compact = false) {
    if (!jobs.length) return empty("briefcase", "No matching jobs", "Try another search or status filter.");
    if (compact) return `<table class="jobs-table"><thead><tr><th>Job</th><th>Status</th><th>Progress</th><th>Due</th><th>Team</th><th></th></tr></thead><tbody>${jobs.map(job => `<tr data-job="${job.id}" tabindex="0"><td><span class="job-name">${esc(job.name)}</span><span class="job-code">${job.id} · ${esc(job.client)}</span></td><td><span class="status ${statusClass(job.status)}">${job.status}</span></td><td><div class="progress-track"><span style="width:${job.progress}%"></span></div><span class="progress-label">${job.progress}%</span></td><td><span class="due ${new Date(job.due) < new Date(todayKey()) && job.status !== "Complete" ? "overdue" : ""}">${shortDate(job.due)}</span></td><td>${peopleAvatars(job.team)}</td><td><button class="icon-btn" data-open-row aria-label="Open ${esc(job.name)}">${icon("chevron")}</button></td></tr>`).join("")}</tbody></table>`;
    return `<table class="jobs-table jobs-table-full"><thead><tr><th><input type="checkbox" data-select-all aria-label="Select all jobs"></th><th>Job number</th><th>Client</th><th>Job name</th><th>Status</th><th>Start date</th><th>Due date</th><th>Progress</th><th>Priority</th><th></th></tr></thead><tbody>${jobs.map(job => `<tr data-job="${job.id}" tabindex="0"><td><input type="checkbox" data-select-job="${job.id}" ${selectedJobs.has(job.id)?"checked":""} aria-label="Select ${esc(job.name)}"></td><td><span class="job-number">${job.id}</span></td><td>${esc(job.client)}</td><td><span class="job-name">${esc(job.name)}</span><span class="job-code">Owner: ${esc(job.owner)}</span></td><td><span class="status ${statusClass(job.status)}">${job.status}</span></td><td>${shortDate(job.start)}</td><td><span class="due ${new Date(job.due) < new Date(todayKey()) && !["Complete","Cancelled"].includes(job.status) ? "overdue" : ""}">${shortDate(job.due)}</span></td><td><div class="progress-inline"><div class="progress-track"><span style="width:${job.progress}%"></span></div><span>${job.progress}%</span></div></td><td><span class="priority-label ${job.priority}">${job.priority}</span></td><td><button class="icon-btn" data-open-row aria-label="Open ${esc(job.name)}">${icon("chevron")}</button></td></tr>`).join("")}</tbody></table>`;
  }

  function filteredJobs() {
    return state.jobs.filter(job => {
      const sectionMatch = jobSection === "all" || jobSection === "calendar" || jobSection === "board" ? true : jobSection === "mine" ? job.owner === currentStaffName() : !["Complete","Cancelled"].includes(job.status);
      const filterMatch = jobFilter === "All statuses" || job.status === jobFilter;
      const due = new Date(`${job.due}T12:00:00`);
      const start = new Date(`${job.start}T12:00:00`);
      const today = new Date(`${todayKey()}T12:00:00`);
      const weekEnd = new Date(Date.now()+7*86400000);
      const quickMatch = jobQuickFilter === "all" || (jobQuickFilter === "starting" && start >= today && start <= weekEnd) || (jobQuickFilter === "due" && due >= today && due <= weekEnd) || (jobQuickFilter === "overdue" && due < today && !["Complete","Cancelled"].includes(job.status));
      const searchMatch = jobSection === "board" || !jobSearchSelection || job.id===jobSearchSelection;
      const clientMatch = jobSection !== "calendar" || !calendarClientFilter || job.client === calendarClientFilter;
      const boardMatch = jobSection !== "board" || (jobMatchesBoardView(job,activeBoardView()) && (!boardClientFilter || job.client===boardClientFilter) && (boardDepartmentFilter==="All departments" || jobDepartment(job)===boardDepartmentFilter) && boardStepMatch(job,boardStepFilter));
      const templateMatch=!jobTemplateFilter || jobUsesTemplate(job,state.jobTemplates.find(t=>t.id===jobTemplateFilter));
      return sectionMatch && filterMatch && quickMatch && searchMatch && clientMatch && boardMatch && templateMatch;
    });
  }

  function jobDepartment(job) {
    const names=[job.owner,...(job.team||[])];
    return names.map(name=>state.capacity.members.find(member=>member.name===name||member.shortName===name)?.department).find(Boolean) || "Unassigned";
  }

  let jobTemplateFilter = "";
  function jobBoardStage(job) {
    const selected=activeBoardView();
    const template=state.jobTemplates.find(t=>jobUsesTemplate(job,t));
    const view=(jobSection==="board"&&jobMatchesBoardView(job,selected)?selected:null)
      ||state.boardViews?.find(v=>v.id===template?.boardViewId)
      ||state.boardViews?.find(v=>jobMatchesBoardView(job,v));
    return boardViewColumnForJob(view,job)?.name || job.status || "Not assigned";
  }

  function setBoardStage(job,step,view,reason="Moved Board step") {
    const oldValue=job.status;
    job.status=step.status;
    job.boardStageStatus=step.status;
    auditHistory(job,{source:"board",action:reason,entityType:"job",entityName:job.name,oldValue,newValue:step.status,text:`${job.id}: ${oldValue} → ${step.name} (${view.name})`});
  }

  function normalizeViewJobs(view,templateIds) {
    const templates=state.jobTemplates.filter(t=>templateIds.includes(t.id));
    const first=view.steps[0];
    if(!first)return 0;
    const scoped=state.jobs.filter(j=>templates.some(t=>jobUsesTemplate(j,t)));
    const unmatched=scoped.filter(j=>!boardViewStepForStatus(view,j.status));
    scoped.filter(j=>boardViewStepForStatus(view,j.status)).forEach(j=>{j.boardStageStatus=j.status;});
    unmatched.forEach(j=>setBoardStage(j,first,view,"Assigned to first step of Board view"));
    return unmatched.length;
  }

  function moveBoardJob(job,status) {
    const view=activeBoardView();
    const step=view?.steps.find(s=>s.visible&&s.status===status);
    if(!job||!step||!jobMatchesBoardView(job,view))return false;
    if(!canAccess('jobs',2)||(status==='Complete'&&!canAccess('completion',2))||(job.status==='Complete'&&!canAccess('completedJobs',2))||(job.status==='Cancelled'&&!canAccess('archivedJobs',2))){showToast('Your access level does not allow this move.');return false;}
    if(boardViewColumnForJob(view,job)?.id===step.id)return false;
    if(!window.confirm(`Move ${job.id} — ${job.name}\nfrom “${boardViewColumnForJob(view,job)?.name||job.status}” to “${step.name}”?\n\nThis changes the Board stage. Phase and task progress will stay unchanged.`))return false;
    setBoardStage(job,step,view);
    if(!save())return false;
    render("jobs");showToast(`${job.id} moved to ${step.name}.`);return true;
  }

  function boardStepMatch(job,step) {
    if (step==="All steps") return true;
    return boardViewColumnForJob(activeBoardView(),job)?.status===step;
  }

  function activeBoardView() {
    return state.boardViews?.find(view=>view.id===selectedBoardViewId) || state.boardViews?.find(view=>view.isDefault) || state.boardViews?.[0] || null;
  }

  function boardViewTemplates(view) {
    if(!view)return [];
    const explicitIds=new Set(view.templateIds||[]);
    return state.jobTemplates.filter(template=>template.boardViewId===view.id||explicitIds.has(template.id));
  }

  function normalizeBoardTemplate(value) {
    return String(value||"").trim().toLowerCase().replace(/\s+/g," ");
  }

  function jobUsesTemplate(job,template) {
    if(!job||!template)return false;
    const ids=[job.templateId,job.templateSnapshot?.id].filter(Boolean);
    const names=[job.template,job.templateSnapshot?.name].map(normalizeBoardTemplate).filter(Boolean);
    return ids.includes(template.id)||names.includes(normalizeBoardTemplate(template.name));
  }

  function boardViewJobs(view) {
    const templates=boardViewTemplates(view);
    return state.jobs.filter(job=>templates.some(template=>jobUsesTemplate(job,template)));
  }

  function jobMatchesBoardView(job,view) {
    if(!view)return false;
    return boardViewTemplates(view).some(template=>jobUsesTemplate(job,template));
  }

  function boardViewStepForStatus(view,status) {
    const key=String(status||"").trim().toLowerCase();
    return view?.steps.find(step=>[step.status,...(step.aliases||[])].some(value=>String(value||"").trim().toLowerCase()===key))||null;
  }

  function boardViewColumnForJob(view,job) {
    const mapped=boardViewStepForStatus(view,job?.status);
    if(mapped)return mapped;
    return view?.steps.find(step=>step.visible&&String(step.name||step.status).trim().toLowerCase()==="planning")
      || view?.steps.find(step=>step.visible)
      || null;
  }

  function boardClientMatches(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return [...new Set(state.jobs.map(job => job.client))]
      .filter(client => client.toLowerCase().includes(q))
      .sort((a,b)=>a.localeCompare(b))
      .slice(0,10)
      .map(client => ({ client, jobs:state.jobs.filter(job=>job.client===client).length }));
  }

  function renderBoardClientSuggestions(query) {
    const list = $("#board-client-results");
    if (!list) return;
    const matches = boardClientMatches(query);
    list.hidden = !query.trim();
    list.innerHTML = matches.length
      ? matches.map(item=>`<button type="button" class="client-suggestion" role="option" data-board-client="${esc(item.client)}"><span><strong>${esc(item.client)}</strong><small>${item.jobs} job${item.jobs===1?"":"s"}</small></span><span>Select ${icon("chevron")}</span></button>`).join("")
      : `<div class="client-suggestion-empty">No clients contain “${esc(query.trim())}”</div>`;
  }

  function selectBoardClient(client) {
    if (!client || !state.jobs.some(job=>job.client===client)) return false;
    boardClientFilter=client;
    boardClientQuery="";
    jobSection="board";
    return true;
  }

  function searchPickerMarkup(kind,inputId,query,placeholder,selectedLabel="",inputClass="toolbar-input") {
    return `<div class="search-picker"><input class="${inputClass}" id="${inputId}" data-search-picker="${kind}" value="${esc(query)}" placeholder="${esc(placeholder)}" aria-label="${esc(placeholder)}" aria-autocomplete="list" aria-controls="${kind}-search-results" autocomplete="off"><div class="client-suggestions search-picker-results" id="${kind}-search-results" role="listbox" hidden></div></div>${selectedLabel?`<button class="calendar-client-filter search-selection-chip" data-search-picker-clear="${kind}" title="Clear selected result">${esc(selectedLabel)} <span aria-hidden="true">×</span></button>`:""}`;
  }

  function searchPickerCandidates(kind) {
    if(kind==="jobs") return state.jobs.map(job=>({value:job.id,label:job.name,meta:`${job.id} · ${job.client} · ${job.owner}`,terms:[job.id,job.name,job.client,job.owner,...job.tasks.map(task=>task[0]),...job.milestones.map(item=>item[0])]}));
    if(kind==="schedule") return [...new Set(state.jobs.map(job=>job.client))].sort().map(client=>({value:client,label:client,meta:`${state.jobs.filter(job=>job.client===client).length} jobs`,terms:[client]}));
    if(kind==="capacity") return state.capacity.unassigned.filter(task=>task.remaining>0).map(task=>({value:task.id,label:task.task,meta:`${task.title} · ${task.client}`,terms:[task.id,task.task,task.title,task.client]}));
    if(kind==="clients") return clientData().map(item=>({value:item.client,label:item.client,meta:`${item.active} active jobs`,terms:[item.client]}));
    if(kind==="quotes") return state.quotes.map(quote=>({value:quote.id,label:quote.title,meta:`${quote.id} · ${quote.client}`,terms:[quote.id,quote.title,quote.client,quote.status]}));
    if(kind==="staff") return state.capacity.members.map(member=>({value:member.id,label:member.shortName,meta:`${member.staffId} · ${member.fullName} · ${member.department}`,terms:[member.staffId,member.shortName,member.fullName,member.rank,member.department,member.role]}));
    const dashboardKind=kind.replace("dashboard-","");
    if(["pipeline","risk"].includes(dashboardKind)) return dashboardData().jobs.map(job=>({value:job.id,label:job.name,meta:`${job.client} · ${job.owner}`,terms:[job.id,job.name,job.client,job.owner]}));
    if(dashboardKind==="tasks") return dashboardTaskRows(dashboardData().jobs).map(row=>({value:row.item.id,label:row.item.name,meta:`${row.job.name} · ${row.item.owner}`,terms:[row.item.id,row.item.name,row.job.name,row.job.client,row.item.owner]}));
    return [];
  }

  function searchPickerMatches(kind,query) {
    const q=query.trim().toLowerCase();
    if(!q)return [];
    return searchPickerCandidates(kind).filter(item=>item.terms.some(term=>String(term||"").toLowerCase().includes(q))).slice(0,10);
  }

  function renderSearchPickerSuggestions(kind,query) {
    const list=$(`#${kind}-search-results`);if(!list)return;
    const matches=searchPickerMatches(kind,query);list.hidden=!query.trim();
    list.innerHTML=matches.length?matches.map(item=>`<button type="button" class="client-suggestion" role="option" data-search-picker-select="${kind}" data-search-picker-value="${esc(item.value)}" data-search-picker-label="${esc(item.label)}"><span><strong>${esc(item.label)}</strong><small>${esc(item.meta)}</small></span><span>Select ${icon("chevron")}</span></button>`).join(""):`<div class="client-suggestion-empty">No results contain “${esc(query.trim())}”</div>`;
  }

  function applySearchPicker(kind,value,label) {
    if(kind==="jobs"){jobSearchSelection=value;jobQuery=label;return render("jobs");}
    if(kind==="schedule"){timelineFilters.clientSelection=value;timelineFilters.clientQuery=label;return render("schedule");}
    if(kind==="capacity"){capacitySearchSelection=value;capacityQuery=label;return render("schedule");}
    if(kind==="clients"){clientSearchSelection=value;clientQuery=label;return render("clients");}
    if(kind==="quotes"){quoteSearchSelection=value;quoteQuery=label;return render("quotes");}
    if(kind==="staff"){staffSearchSelection=value;staffQuery=label;return render("settings");}
    const key=kind.replace("dashboard-","");if(dashboardSectionFilters[key]){dashboardSectionFilters[key].selected=value;dashboardSectionFilters[key].query=label;render("dashboard");}
  }

  function clearSearchPicker(kind) {
    if(kind==="jobs"){jobSearchSelection="";jobQuery="";return render("jobs");}
    if(kind==="schedule"){timelineFilters.clientSelection="";timelineFilters.clientQuery="";return render("schedule");}
    if(kind==="capacity"){capacitySearchSelection="";capacityQuery="";return render("schedule");}
    if(kind==="clients"){clientSearchSelection="";clientQuery="";return render("clients");}
    if(kind==="quotes"){quoteSearchSelection="";quoteQuery="";return render("quotes");}
    if(kind==="staff"){staffSearchSelection="";staffQuery="";return render("settings");}
    const key=kind.replace("dashboard-","");if(dashboardSectionFilters[key]){dashboardSectionFilters[key].selected="";dashboardSectionFilters[key].query="";render("dashboard");}
  }

  function renderJobs() {
    const jobs = filteredJobs();
    const boardView=activeBoardView();
    const boardSteps=(boardView?.steps||[]).filter(step=>step.visible);
    const baseJobs = state.jobs.filter(job => jobSection === "mine" ? job.owner === currentStaffName() : jobSection === "active" ? !["Complete","Cancelled"].includes(job.status) : true);
    const counts = {
      all: baseJobs.length,
      starting: baseJobs.filter(job => new Date(`${job.start}T12:00:00`) >= new Date(`${todayKey()}T12:00:00`) && new Date(`${job.start}T12:00:00`) <= new Date(Date.now()+7*86400000)).length,
      due: baseJobs.filter(job => new Date(`${job.due}T12:00:00`) >= new Date(`${todayKey()}T12:00:00`) && new Date(`${job.due}T12:00:00`) <= new Date(Date.now()+7*86400000)).length,
      overdue: baseJobs.filter(job => new Date(`${job.due}T12:00:00`) < new Date(`${todayKey()}T12:00:00`) && !["Complete","Cancelled"].includes(job.status)).length
    };
    const tabs = [["active","Active Jobs"],["mine","My Jobs"],["calendar","Calendar"],["board","Board"],["capacity","Staff Allocation"],["recurring","Recurring Jobs"],["schedule","Schedule"]];
    const departments=[...new Set(state.capacity.members.map(member=>member.department).filter(Boolean))].sort();
    const searchControl = jobSection === "board"
      ? `<div class="board-client-picker"><input class="toolbar-input" id="board-client-search" value="${esc(boardClientQuery)}" aria-label="Search clients" aria-autocomplete="list" aria-controls="board-client-results" autocomplete="off" placeholder="Search client…" /><div class="client-suggestions" id="board-client-results" role="listbox" hidden></div></div>`
      : searchPickerMarkup("jobs","job-search",jobQuery,"Search by job, task, client or owner…",jobSearchSelection?jobQuery:"");
    const clientFilterChip = jobSection === "calendar" && calendarClientFilter ? `<button class="calendar-client-filter" data-clear-calendar-client title="Show all clients">Client: ${esc(calendarClientFilter)} <span aria-hidden="true">×</span></button>` : jobSection === "board" && boardClientFilter ? `<button class="calendar-client-filter" data-clear-board-client title="Show all clients">Client: ${esc(boardClientFilter)} <span aria-hidden="true">×</span></button>` : "";
    const filterControls = jobSection === "board"
      ? `<button class="button ghost board-view-button" data-select-board-view>${icon("board")}<span><small>View</small>${esc(boardView?.name||"Select view")}</span>${icon("chevron")}</button><select class="filter-select" id="board-department" aria-label="Filter Board by department"><option>All departments</option>${departments.map(department=>`<option ${boardDepartmentFilter===department?"selected":""}>${esc(department)}</option>`).join("")}</select><select class="filter-select" id="board-step" aria-label="Filter Board by step"><option>All steps</option>${boardSteps.map(step=>`<option value="${esc(step.status)}" ${boardStepFilter===step.status?"selected":""}>${esc(step.name)}</option>`).join("")}</select>`
      : `<select class="filter-select" id="job-status" aria-label="Filter by status">${["All statuses","Planning","In progress","Review","On hold","Complete","Cancelled"].map(s => `<option ${s === jobFilter ? "selected" : ""}>${s}</option>`).join("")}</select>`;
    const listTools = `<div class="toolbar job-toolbar"><div class="quick-filters">${[["all","All"],["starting","Starting soon"],["due","Due this week"],["overdue","Overdue"]].map(([key,label])=>`<button class="quick-filter ${jobQuickFilter===key?"active":""}" data-job-quick="${key}">${label}<span>${counts[key]}</span></button>`).join("")}</div>${searchControl}${clientFilterChip}${filterControls}<select class="filter-select" id="job-template-filter" aria-label="Filter jobs by Template"><option value="">All templates</option>${state.jobTemplates.map(t=>`<option value="${esc(t.id)}" ${jobTemplateFilter===t.id?"selected":""}>${esc(t.name)}</option>`).join("")}</select><button class="button ghost" data-display-options>${icon("filter")}Display options</button><span class="toolbar-spacer"></span><span class="date-chip">${jobs.length} jobs</span></div>`;
    let body = `<section class="card table-card">${jobsTable(jobs)}</section>`;
    if (jobSection === "board") body = renderKanban(jobs);
    if (jobSection === "calendar") body = renderJobCalendar(jobs);
    if (jobSection === "recurring") body = renderRecurringJobs();
    return `${pageHead("Work", "Job Manager", "One source of truth for job status, ownership, dates, workload, and profitability.", `<button class="button ghost" data-job-history>${icon("clock")}History</button><button class="button primary" data-open-job>${icon("plus")}Create new job</button>`)}
      <nav class="job-tabs" aria-label="Job manager views">${tabs.map(([key,label]) => `<button class="job-tab ${jobSection===key?"active":""}" data-job-section="${key}">${label}</button>`).join("")}</nav>
      ${jobSection === "recurring" ? "" : listTools}
      ${selectedJobs.size?`<div class="toolbar"><span>${selectedJobs.size} selected</span><button class="button ghost" data-export-selected>Export selected JSON</button><button class="button ghost" data-clear-selection>Clear selection</button></div>`:""}${body}`;
  }

  function renderKanban(jobs) {
    const view=activeBoardView(),columns=(view?.steps||[]).filter(step=>step.visible && (boardStepFilter==="All steps"||step.status===boardStepFilter));
    if(!view)return `<section class="card">${empty("board","No Board views yet","Create a view to choose its steps and assign service templates.")}<div class="empty-actions"><button class="button primary" data-create-board-view>Create view</button></div></section>`;
    if(!boardViewTemplates(view).length)return `<section class="card">${empty("board","No templates assigned",`Assign at least one template to “${esc(view.name)}” in Settings to display its jobs.`)}<div class="empty-actions"><button class="button primary" data-settings-board-views>Manage Board views</button></div></section>`;
    if(!columns.length)return `<section class="card">${empty("board","No visible steps","Edit this view and choose at least one step to display.")}<div class="empty-actions"><button class="button primary" data-edit-board-view="${view.id}">Edit view</button></div></section>`;
    return `<section class="board-view-summary"><div><strong>${esc(view.name)}</strong>${view.isDefault?'<span class="default-view-badge">Default</span>':""}<small>${boardViewTemplates(view).map(template=>template.name).join(" · ")} · ${jobs.length} jobs shown</small></div><button class="button ghost" data-edit-board-view="${view.id}">Edit view</button></section><section class="kanban" style="--board-columns:${columns.length}">${columns.map(step => {
      const columnJobs = jobs.filter(job => boardViewColumnForJob(view,job)?.id===step.id);
      return `<div class="kanban-column ${statusClass(step.status)}" data-status="${esc(step.status)}"><div class="kanban-head">${esc(step.name)}<span>${columnJobs.length}</span></div>${columnJobs.map(job => `<article class="job-card" data-job="${job.id}" draggable="true"><div class="job-card-top"><span>${job.id}</span><span class="priority ${job.priority}"></span></div><h3>${esc(job.name)}</h3><p>${esc(job.client)}</p><div class="job-card-dates">${icon("calendar")}${shortDate(job.start)} – ${shortDate(job.due)}</div><div class="mini-progress"><span style="width:${job.progress}%"></span></div><div class="job-card-meta"><span>${job.progress}% complete</span>${peopleAvatars(job.team.slice(0,2))}</div></article>`).join("")}</div>`;
    }).join("")}</section>`;
  }

  function calendarEventVisible(type) {
    const labels={start:"Job starts",due:"Job deadlines",milestone:"Milestones","task-deadline":"Task deadlines","subtask-deadline":"Sub-task deadlines"};
    return calendarEventFilter==="All calendar items"||calendarEventFilter===labels[type];
  }

  function renderJobCalendar(jobs) {
    const first = new Date(calendarMonth.getFullYear(),calendarMonth.getMonth(),1);
    const offset=(first.getDay()+6)%7;
    const count=Math.ceil((offset+new Date(first.getFullYear(),first.getMonth()+1,0).getDate())/7)*7;
    const cells = Array.from({length:count},(_,index)=>{
      const date = new Date(first.getFullYear(),first.getMonth(),1-offset+index);
      const key = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
      const events = jobs.flatMap(job => {
        const jobDates = [];
        if (job.start === key) jobDates.push({ type:"start", label:"Start", title:`${job.name} starts` });
        if (job.due === key) jobDates.push({ type:"due", label:"Due", title:`${job.name} due` });
        job.milestones.forEach((milestone, milestoneIndex) => {
          if (milestone[1] === key) jobDates.push({ type:"milestone", label:"Milestone", title:milestone[0], milestoneIndex });
        });
        const project=state.timeline.projects.find(candidate=>candidate.jobId===job.id);
        for(const task of (project?.items||[]).filter(item=>item.type==="task")){
          const taskDeadline=task.due||dateFromTimelineDay(task.start+Math.max(1,task.duration)-1);
          if(taskDeadline===key)jobDates.push({type:"task-deadline",label:"Task",title:task.name,owner:task.owner,tab:"phases"});
          for(const subtask of task.subtasks||[])if(subtask.due===key)jobDates.push({type:"subtask-deadline",label:"Sub-task",title:subtask.name,owner:subtask.owner||task.owner,tab:"phases"});
        }
        return jobDates.filter(item=>calendarEventVisible(item.type)).map(item => ({ job, ...item }));
      });
      return `<div class="calendar-cell ${date.getMonth()===calendarMonth.getMonth()?"":"muted"} ${key===todayKey()?"today":""}"><span class="calendar-day">${date.getDate()}</span>${events.map(item=>`<button class="calendar-event ${item.type}-event" data-job="${item.job.id}" data-job-tab="${item.tab||(item.type==="milestone"?"milestones":"information")}" data-calendar-tooltip data-tooltip-type="${esc(item.label)}" data-tooltip-title="${esc(item.title)}" data-tooltip-job="${esc(item.job.id)} · ${esc(item.job.name)}" data-tooltip-client="${esc(item.job.client)}" data-tooltip-owner="${esc(item.owner||item.job.owner)}" data-tooltip-date="${esc(shortDate(key))}" title="${esc(item.job.id)} · ${esc(item.title)}"><strong>${item.label}</strong><span class="calendar-event-title">${esc(item.title)}</span></button>`).join("")}</div>`;
    });
    return `<section class="card job-calendar"><div class="calendar-head"><div><h2>${calendarMonth.toLocaleDateString("en-US",{month:"long",year:"numeric"})}</h2><p>Job dates, milestones, task and sub-task deadlines</p></div><div class="calendar-head-tools"><select class="filter-select calendar-type-filter" id="calendar-event-filter" aria-label="Filter Calendar items">${["All calendar items","Job starts","Job deadlines","Milestones","Task deadlines","Sub-task deadlines"].map(option=>`<option ${calendarEventFilter===option?"selected":""}>${option}</option>`).join("")}</select><div class="segmented"><button class="segment" data-calendar-month="-1" aria-label="Previous month">‹</button><button class="segment active" data-calendar-today>Today</button><button class="segment" data-calendar-month="1" aria-label="Next month">›</button></div></div></div><div class="calendar-legend calendar-legend-row"><span class="start">Start</span><span class="milestone-key">Milestone</span><span class="due">Job deadline</span><span class="task-key">Task deadline</span><span class="subtask-key">Sub-task deadline</span></div><div class="calendar-weekdays">${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(day=>`<span>${day}</span>`).join("")}</div><div class="calendar-grid">${cells.join("")}</div></section>`;
  }

  function calendarTooltip() {
    let tooltip = $("#calendar-tooltip");
    if (!tooltip) {
      document.body.insertAdjacentHTML("beforeend",`<div id="calendar-tooltip" class="calendar-tooltip" role="tooltip" hidden></div>`);
      tooltip = $("#calendar-tooltip");
    }
    return tooltip;
  }

  function positionCalendarTooltip(tooltip,event) {
    const gap=14,maxWidth=320,maxHeight=190;
    tooltip.style.left=`${Math.max(10,Math.min(event.clientX+gap,window.innerWidth-maxWidth-10))}px`;
    tooltip.style.top=`${Math.max(10,Math.min(event.clientY+gap,window.innerHeight-maxHeight-10))}px`;
  }

  function showCalendarTooltip(button,event) {
    const tooltip=calendarTooltip();
    if (!tooltip) return;
    const destination=button.dataset.jobTab==="phases"?"Phases":button.dataset.jobTab==="milestones"?"Milestones":"Information";
    tooltip.innerHTML=`<span>${esc(button.dataset.tooltipType)}</span><strong>${esc(button.dataset.tooltipTitle)}</strong><p>${esc(button.dataset.tooltipJob)}</p><dl><div><dt>Client</dt><dd>${esc(button.dataset.tooltipClient)}</dd></div><div><dt>Owner</dt><dd>${esc(button.dataset.tooltipOwner)}</dd></div><div><dt>Date</dt><dd>${esc(button.dataset.tooltipDate)}</dd></div></dl><small>Click to open the ${destination} tab</small>`;
    tooltip.hidden=false;
    positionCalendarTooltip(tooltip,event);
  }

  function renderRecurringJobs() {
    const jobs=state.jobs.filter(job=>job.recurring);
    return `<div class="toolbar"><div><strong class="toolbar-title">Recurring jobs</strong><span class="toolbar-subtitle">Recurring work remains available in Active Jobs, My Jobs and Schedule.</span></div><span class="toolbar-spacer"></span><button class="button primary" data-open-recurring>${icon("plus")}New recurring job</button></div><section class="card table-card">${jobs.length?`<table class="jobs-table recurring-table"><thead><tr><th>Job</th><th>Client</th><th>Owner</th><th>Frequency</th><th>Next occurrence</th><th>Due date</th><th>Status</th><th></th></tr></thead><tbody>${jobs.map(job=>`<tr data-job="${job.id}" tabindex="0"><td><span class="job-name">${esc(job.name)}</span><span class="job-code">${job.id} · ${esc(job.template||"Blank job")}</span></td><td>${esc(job.client)}</td><td>${esc(job.owner)}</td><td>${esc(job.recurringCadence||"Monthly")}</td><td>${job.nextOccurrence?shortDate(job.nextOccurrence):"—"}</td><td>${shortDate(job.due)}</td><td><span class="status ${statusClass(job.status)}">${esc(job.status)}</span></td><td><button class="icon-btn" data-open-row aria-label="Open ${esc(job.name)}">${icon("chevron")}</button></td></tr>`).join("")}</tbody></table>`:empty("briefcase","No recurring jobs","Create a recurring job or mark an existing job as recurring in Job information.")}</section>`;
  }

  function capacityMemberData(member) {
    const planned = total(member.allocations.filter(a=>a.weekOffset===capacityWeekOffset), "hours");
    const leave = total(member.leaves.filter(a=>a.weekOffset===capacityWeekOffset), "hours");
    const available = Math.max(0, member.weeklyHours - leave);
    const utilisation = available ? Math.round(planned / available * 100) : planned?101:0;
    const settings = state.capacity.settings;
    const tone = utilisation < settings.under ? "under" : utilisation > settings.over ? "over" : "ideal";
    return { planned, leave, available, utilisation, tone, remaining: available - planned };
  }

  function capacityDays() {
    const formatter = new Intl.DateTimeFormat("en-US", { month:"short", day:"numeric" });
    return [0,1,2,3,4].map(index => {
      const date = new Date(2026, 8, 7 + capacityWeekOffset * 7 + index);
      return { day: ["Mon","Tue","Wed","Thu","Fri"][index], date: formatter.format(date) };
    });
  }

  function allocationTone(member, allocation) {
    if (state.capacity.settings.colorMode === "workType") return allocation.billable ? "billable" : "nonbillable";
    return capacityMemberData(member).tone;
  }

  function renderAllocation(member, allocation) {
    return `<div class="allocation-card ${allocationTone(member, allocation)}" draggable="true" tabindex="0" data-allocation="${allocation.id}" data-member="${member.id}">${allocation.jobId?`<button class="text-btn" data-job="${allocation.jobId}">${esc(allocation.title)}</button>`:`<strong>${esc(allocation.title)}</strong>`}<small>${esc(allocation.task)} · ${allocation.hours}h planned / ${allocation.actual || 0}h actual</small><span class="allocation-controls"><button type="button" data-adjust-allocation="-1" data-allocation-id="${allocation.id}" data-member-id="${member.id}" aria-label="Reduce by one hour">−</button><button type="button" data-adjust-allocation="1" data-allocation-id="${allocation.id}" data-member-id="${member.id}" aria-label="Add one hour">+</button><button type="button" data-remove-allocation="${allocation.id}" data-member-id="${member.id}" aria-label="Remove allocation">×</button></span></div>`;
  }

  function renderCapacityPlanner() {
    const days = capacityDays();
    const allMembers = state.capacity.members;
    const members = allMembers.filter(member => capacityFilters.team === "All teams" || member.team === capacityFilters.team);
    const clients = [...new Set([...allMembers.flatMap(member => member.allocations.map(a => a.client)), ...state.capacity.unassigned.map(task => task.client)])].sort();
    const teams = [...new Set(allMembers.map(member => member.team))].sort();
    const memberStats = members.map(capacityMemberData);
    const planned = memberStats.reduce((sum, item) => sum + item.planned, 0);
    const available = memberStats.reduce((sum, item) => sum + item.available, 0);
    const utilisation = available ? Math.round(planned / available * 100) : planned?101:0;
    const visibleUnassigned = state.capacity.unassigned.filter(task => task.remaining > 0 && (capacityFilters.team === "All teams" || task.team === capacityFilters.team) && (capacityFilters.client === "All clients" || task.client === capacityFilters.client) && (!capacitySearchSelection || task.id===capacitySearchSelection));
    const unassignedHours = total(visibleUnassigned, "remaining");
    const legend = state.capacity.settings.colorMode === "workType" ? `<div class="capacity-legend"><span class="billable">Billable</span><span class="nonbillable">Non-billable</span></div>` : `<div class="capacity-legend"><span>Under-utilised</span><span class="at-capacity">Ideal</span><span class="overloaded">Overloaded</span></div>`;
    return `${pageHead("Plan", "Capacity planner", "Assign work, compare planned and actual hours, and resolve overloads before they affect delivery.", legend)}
      <div class="toolbar">
        <div class="schedule-switch"><button data-schedule-mode="timeline">${icon("chart")}Timeline</button><button class="active" data-schedule-mode="capacity">${icon("users")}Capacity</button></div>
        <button class="button ghost" data-capacity-week="-1">← Previous</button><button class="button ghost" data-capacity-today>Today</button><button class="button ghost" data-capacity-week="1">Next →</button>
        <select class="filter-select" id="capacity-team" aria-label="Filter by team"><option>All teams</option>${teams.map(team=>`<option ${capacityFilters.team===team?"selected":""}>${team}</option>`).join("")}</select>
        <select class="filter-select" id="capacity-client" aria-label="Filter by client"><option>All clients</option>${clients.map(client=>`<option ${capacityFilters.client===client?"selected":""}>${client}</option>`).join("")}</select>
        <select class="filter-select" id="capacity-color" aria-label="Colour allocations"><option value="capacity" ${state.capacity.settings.colorMode==="capacity"?"selected":""}>Colour: Capacity</option><option value="workType" ${state.capacity.settings.colorMode==="workType"?"selected":""}>Colour: Work type</option></select>
        <span class="toolbar-spacer"></span><button class="button ghost" id="capacity-settings">Settings</button><button class="button ghost" id="add-time-off">Add time off</button><button class="button primary" id="assign-capacity">${icon("plus")}Assign work</button>
      </div>
      <section class="planner-kpis" aria-label="Capacity summary">
        <article class="planner-kpi"><div><span>Planned hours</span><strong>${planned}h</strong></div><span class="planner-kpi-icon">${icon("calendar")}</span></article>
        <article class="planner-kpi"><div><span>Available hours</span><strong>${available}h</strong></div><span class="planner-kpi-icon">${icon("clock")}</span></article>
        <article class="planner-kpi"><div><span>Team utilisation</span><strong>${utilisation}%</strong></div><span class="planner-kpi-icon ${utilisation > state.capacity.settings.over ? "danger" : ""}">${icon("chart")}</span></article>
        <article class="planner-kpi"><div><span>Unassigned work</span><strong>${unassignedHours}h</strong></div><span class="planner-kpi-icon ${unassignedHours ? "warn" : ""}">${icon("briefcase")}</span></article>
      </section>
      <div class="planner-shell">
        <section class="card capacity-board"><div class="capacity-grid">
          <div class="capacity-grid-head"><div>Team capacity</div>${days.map(day=>`<div><strong>${day.day}</strong><small>${day.date}</small></div>`).join("")}</div>
          ${members.map(member => {
            const stats = capacityMemberData(member);
            const statusLabel = stats.tone === "under" ? "Under" : stats.tone === "over" ? "Over" : "Ideal";
            return `<div class="capacity-member-row"><div class="capacity-member"><div class="member-identity"><span class="avatar">${member.code}</span><div><strong>${esc(member.name)}</strong><small>${esc(member.role)} · ${member.team}</small></div><span class="capacity-state ${stats.tone}">${statusLabel}</span></div><div class="member-capacity"><div class="member-capacity-copy"><span>${stats.planned}h planned</span><span>${stats.utilisation}%</span></div><div class="capacity-progress"><span class="${stats.tone}" style="width:${Math.min(100,stats.utilisation)}%"></span></div><div class="member-remaining">${stats.remaining >= 0 ? `${stats.remaining}h remaining` : `${Math.abs(stats.remaining)}h over capacity`}${stats.leave ? ` · ${stats.leave}h time off` : ""}</div></div></div>
              ${days.map((_, dayIndex) => `<div class="capacity-cell" data-capacity-member="${member.id}" data-capacity-day="${dayIndex}">${member.workDays[dayIndex] ? "" : `<div class="leave-card">Non-working day<small>0h available</small></div>`}${member.leaves.filter(item=>item.day===dayIndex && item.weekOffset===capacityWeekOffset).map(item=>`<div class="leave-card">${esc(item.reason)}<small>${item.hours}h unavailable</small></div>`).join("")}${member.allocations.filter(item=>item.day===dayIndex && item.weekOffset===capacityWeekOffset && (capacityFilters.client === "All clients" || item.client === capacityFilters.client)).map(item=>renderAllocation(member,item)).join("")}</div>`).join("")}</div>`;
          }).join("")}
        </div></section>
        <aside class="card unassigned-panel"><div class="card-head"><div><h2>Jobs &amp; tasks</h2><p>Find and drag unassigned work</p></div><span class="remaining-pill">${unassignedHours}h</span></div><div class="queue-search">${icon("search")}${searchPickerMarkup("capacity","capacity-task-search",capacityQuery,"Search job, task or client…",capacitySearchSelection?capacityQuery:"")}</div><div class="unassigned-list">${visibleUnassigned.length ? visibleUnassigned.map(task=>`<article class="unassigned-task" draggable="true" data-unassigned="${task.id}"><div class="unassigned-task-top"><strong>${esc(task.task)}</strong><span class="remaining-pill">${task.remaining}h left</span></div><p>${esc(task.title)}<br>${esc(task.client)}</p><div class="queue-meter"><span style="width:${Math.min(100,task.planned/task.estimated*100)}%"></span></div><div class="task-hours"><span>${task.planned}h planned · ${Math.max(0,task.estimated-task.planned)}h unplanned</span><button class="text-btn assign-task" data-task-id="${task.id}">Assign</button></div></article>`).join("") : empty("check","Everything is assigned","No unassigned tasks match this search and filters.")}</div><div class="planner-note">${icon("clock")} Staff allocations stay linked to the task schedule and capacity plan.</div></aside>
      </div>`;
  }

  function timelineItemName(id) {
    return state.timeline.projects.flatMap(project => project.items).find(item => item.id === id)?.name || "Previous task";
  }

  function timelineInfoStyle() {
    const columns = state.timeline.columns;
    return `grid-template-columns:minmax(180px,1.5fr) ${columns.owner ? "105px" : "0px"} ${columns.status ? "82px" : "0px"} ${columns.progress ? "85px" : "0px"}`;
  }

  function timelineInfoCells(nameMarkup, owner, status, progress, item = null) {
    const columns = state.timeline.columns;
    const staff = state.capacity.members.map(member => member.name);
    const progressControl = item ? `<input type="range" min="0" max="100" step="5" value="${progress}" data-timeline-progress="${item.id}" aria-label="Progress for ${esc(item.name)}" /><span>${progress}%</span>` : `<div class="progress-track"><span style="width:${progress}%"></span></div><span>${progress}%</span>`;
    return `<div class="gantt-info-grid" style="${timelineInfoStyle()}"><div class="gantt-name-cell">${nameMarkup}</div><div style="${columns.owner ? "" : "display:none"}">${item ? `<select class="gantt-owner" data-timeline-owner="${item.id}" aria-label="Assign ${esc(item.name)}">${staff.map(person=>`<option ${person===owner?"selected":""}>${person}</option>`).join("")}</select>` : esc(owner)}</div><div style="${columns.status ? "" : "display:none"}"><span class="gantt-status ${statusClass(status)}">${esc(status)}</span></div><div class="gantt-progress-cell" style="${columns.progress ? "" : "display:none"}">${progressControl}</div></div>`;
  }

  function ganttPosition(start, duration) {
    const days=timelineVisibleDays();
    const safeStart = Math.max(0, Math.min(days-1, start-timelineOffset));
    const safeDuration = Math.max(1, Math.min(days-safeStart,start+duration-timelineOffset-safeStart));
    return { left:`${safeStart/days*100}%`, width:`${Math.max(2.1,safeDuration/days*100)}%` };
  }

  function renderGanttItem(project, item, child = true) {
    const position = ganttPosition(item.start, item.duration);
    const offscreen=item.start+item.duration<=timelineOffset || item.start>timelineEnd;
    const dependency = item.dependency ? `<span class="dependency-copy">↳ after ${esc(timelineItemName(item.dependency))}</span>` : "";
    const name = `<button class="text-btn ${child ? "child" : ""}" data-edit-item="${item.id}" data-project="${project.jobId}">${esc(item.name)}${dependency}</button>`;
    const riskClass = item.status === "At risk" ? "at-risk-row" : "";
    const track = offscreen ? `<div class="gantt-track"><button class="text-btn" data-jump-item="${item.id}" data-project="${project.jobId}">Outside window · ${shortDate(dateFromTimelineDay(item.start))} →</button></div>` : item.type === "milestone" ? `<div class="gantt-track" data-gantt-project="${project.jobId}" data-gantt-item="${item.id}"><span class="gantt-milestone" draggable="true" data-gantt-task="${item.id}" data-gantt-project-id="${project.jobId}" style="left:${position.left}" title="Drag milestone to reschedule"></span><span class="gantt-milestone-label" style="left:${position.left}">${esc(item.name)}</span></div>` : `<div class="gantt-track" data-gantt-project="${project.jobId}" data-gantt-item="${item.id}"><div class="gantt-bar ${item.type} ${statusClass(item.status)}" draggable="true" data-gantt-task="${item.id}" data-gantt-project-id="${project.jobId}" style="left:${position.left};width:${position.width}" title="Drag to reschedule"><span class="gantt-bar-text">${esc(item.name)} · ${item.progress}%</span><span class="gantt-bar-controls"><button type="button" data-gantt-shift="-1" data-gantt-item-id="${item.id}" data-gantt-project-id="${project.jobId}" aria-label="Move one day earlier">‹</button><button type="button" data-gantt-shift="1" data-gantt-item-id="${item.id}" data-gantt-project-id="${project.jobId}" aria-label="Move one day later">›</button><button type="button" data-gantt-resize="-1" data-gantt-item-id="${item.id}" data-gantt-project-id="${project.jobId}" aria-label="Shorten by one day">−</button><button type="button" data-gantt-resize="1" data-gantt-item-id="${item.id}" data-gantt-project-id="${project.jobId}" aria-label="Extend by one day">+</button></span></div></div>`;
    return `<div class="gantt-row ${item.type==="phase"?"phase-row":""} ${riskClass}">${timelineInfoCells(name,item.owner,item.status,item.progress,item)}${track}</div>`;
  }

  function renderJobGroupedTimeline(projects) {
    return projects.map(project => {
      const job = getJob(project.jobId);
      if (!job) return "";
      const matchingItems = project.items.filter(item => (timelineFilters.owner === "All staff" || item.owner === timelineFilters.owner) && (timelineFilters.status === "All statuses" || item.status === timelineFilters.status));
      if ((timelineFilters.owner !== "All staff" || timelineFilters.status !== "All statuses") && !matchingItems.length) return "";
      const visibleItems = timelineFilters.owner === "All staff" && timelineFilters.status === "All statuses" ? project.items : matchingItems;
      const start = timelineDay(job.start);
      const end = timelineDay(job.due)+1;
      const position = ganttPosition(start,end-start);
      const name = `<button class="gantt-expand ${project.expanded ? "" : "collapsed"}" data-toggle-project="${project.jobId}" aria-label="${project.expanded?"Collapse":"Expand"} ${esc(job.name)}">${icon("arrow-down")}</button><button class="text-btn" data-job="${job.id}">${esc(job.name)}<span class="dependency-copy">${job.id} · ${esc(job.client)}</span></button>`;
      const projectRow = `<div class="gantt-row project-row ${scheduleFocusJobId===project.jobId?"schedule-focus":""}" data-schedule-job="${project.jobId}">${timelineInfoCells(name,job.owner,job.status,job.progress)}<div class="gantt-track" data-gantt-project="${project.jobId}"><div class="gantt-bar project" draggable="true" data-gantt-project-bar="${project.jobId}" style="left:${position.left};width:${position.width};${end<=timelineOffset||start>timelineEnd?"display:none":""}" title="Drag to shift the whole job"><span class="gantt-bar-text">${esc(job.name)}</span></div></div></div>`;
      return projectRow + (project.expanded ? visibleItems.map(item=>renderGanttItem(project,item)).join("") : "");
    }).join("");
  }

  function renderPeopleGroupedTimeline(projects) {
    const staff = state.capacity.members.map(member=>member.name).filter(person=>timelineFilters.owner === "All staff" || person === timelineFilters.owner);
    return staff.map(person => {
      const assigned = projects.flatMap(project => project.items.map(item=>({project,item}))).filter(row => row.item.owner === person && (timelineFilters.status === "All statuses" || row.item.status === timelineFilters.status));
      if (!assigned.length) return "";
      const member = state.capacity.members.find(item=>item.name===person);
      const groupName = `<span class="avatar">${member?.code || initials(person)}</span><span>${esc(person)}<span class="dependency-copy">${assigned.length} scheduled items</span></span>`;
      const groupRow = `<div class="gantt-row group-row">${timelineInfoCells(groupName,member?.team || "Team","In progress",Math.round(assigned.reduce((sum,row)=>sum+row.item.progress,0)/assigned.length))}<div class="gantt-track"></div></div>`;
      return groupRow + assigned.map(row=>renderGanttItem(row.project,row.item)).join("");
    }).join("");
  }

  function renderProjectSchedule() {
    const projects = state.timeline.projects.filter(project=>{
      const job=getJob(project.jobId);
      return job && (!timelineFilters.clientSelection || job.client===timelineFilters.clientSelection) && (timelineFilters.department==="All departments" || jobDepartment(job)===timelineFilters.department);
    });
    const allItems = projects.flatMap(project=>project.items);
    const staff = [...new Set(state.timeline.projects.flatMap(project=>project.items).map(item=>item.owner))].sort();
    const statuses = [...new Set(state.timeline.projects.flatMap(project=>project.items).map(item=>item.status))];
    const departments=[...new Set(state.capacity.members.map(member=>member.department).filter(Boolean))].sort();
    const milestones = allItems.filter(item=>item.type==="milestone").length;
    const atRisk = allItems.filter(item=>item.status==="At risk").length;
    const averageProgress = allItems.length?Math.round(allItems.reduce((sum,item)=>sum+item.progress,0)/allItems.length):0;
    const visibleDays=timelineVisibleDays(),segmentCount=Math.ceil(visibleDays/7);
    const weeks=Array.from({length:segmentCount},(_,i)=>{const start=timelineOffset+i*7,end=Math.min(timelineEnd,start+6);return `${shortDate(dateFromTimelineDay(start))}–${shortDate(dateFromTimelineDay(end))}`;});
    const segmentTemplate=weeks.map((_,i)=>`${Math.min(7,visibleDays-i*7)}fr`).join(" ");
    const infoHeader = `<div class="gantt-info-grid" style="${timelineInfoStyle()}"><div>Job / task</div><div style="${state.timeline.columns.owner?"":"display:none"}">Owner</div><div style="${state.timeline.columns.status?"":"display:none"}">Status</div><div style="${state.timeline.columns.progress?"":"display:none"}">Progress</div></div>`;
    return `${pageHead("Plan", "Project schedule", "See every phase, task, dependency, and milestone across active jobs.", `<button class="button ghost" data-job-history>${icon("clock")}History</button><form class="schedule-range" id="schedule-range-form"><label>From<input type="date" name="from" value="${dateFromTimelineDay(timelineOffset)}" required></label><span>→</span><label>To<input type="date" name="to" value="${dateFromTimelineDay(timelineEnd)}" required></label><button class="button ghost" type="submit">Apply</button></form><button class="button ghost" data-timeline-page="-1">← Previous</button><button class="button ghost" data-timeline-today>Today</button><button class="button ghost" data-timeline-page="1">Next →</button>`)}
      <div class="toolbar schedule-toolbar"><div class="schedule-switch"><button class="active" data-schedule-mode="timeline">${icon("chart")}Timeline</button><button data-schedule-mode="capacity">${icon("users")}Capacity</button></div>${searchPickerMarkup("schedule","schedule-client-search",timelineFilters.clientQuery,"Search by client name…",timelineFilters.clientSelection?timelineFilters.clientQuery:"")}<select class="filter-select" id="timeline-department" aria-label="Filter Schedule by department"><option>All departments</option>${departments.map(department=>`<option ${timelineFilters.department===department?"selected":""}>${esc(department)}</option>`).join("")}</select><select class="filter-select" id="timeline-group"><option value="job" ${timelineGroup==="job"?"selected":""}>Group by job</option><option value="people" ${timelineGroup==="people"?"selected":""}>Group by staff</option></select><select class="filter-select" id="timeline-owner"><option>All staff</option>${staff.map(person=>`<option ${timelineFilters.owner===person?"selected":""}>${person}</option>`).join("")}</select><select class="filter-select" id="timeline-status"><option>All statuses</option>${statuses.map(status=>`<option ${timelineFilters.status===status?"selected":""}>${status}</option>`).join("")}</select><span class="toolbar-spacer"></span><button class="button ghost" id="timeline-columns">Columns</button><button class="button primary" id="add-schedule-item">${icon("plus")}Phase, task or milestone</button></div>
      <section class="gantt-kpis"><article class="gantt-kpi"><span>Active project plans</span><strong>${projects.length}</strong></article><article class="gantt-kpi"><span>Scheduled items</span><strong>${allItems.length}</strong></article><article class="gantt-kpi"><span>Upcoming milestones</span><strong>${milestones}</strong></article><article class="gantt-kpi"><span>Schedule health</span><strong class="${atRisk?"warning":""}">${atRisk} at risk · ${averageProgress}% done</strong></article></section>
      <section class="card gantt-card" style="--timeline-segments:${segmentCount}"><div class="gantt-scroll"><div class="gantt-chart"><div class="gantt-header">${infoHeader}<div class="gantt-timeline-head" style="grid-template-columns:${segmentTemplate}">${weeks.map(week=>`<div>${week}</div>`).join("")}</div></div>${timelineGroup==="job"?renderJobGroupedTimeline(projects):renderPeopleGroupedTimeline(projects)}</div></div><div class="timeline-footer"><span>Drag bars to move tasks or entire jobs · changes require confirmation</span><div class="timeline-legend"><span>Task</span><span class="phase">Phase</span><span class="risk">At risk</span><span class="done">Complete</span></div></div></section>`;
  }

  function renderSchedule() {
    return scheduleMode === "capacity" ? renderCapacityPlanner() : renderProjectSchedule();
  }

  function renderTimesheets() {
    const logged = state.times.reduce((sum, entry) => sum + entry.hours, 0);
    return `${pageHead("Track", "My timesheet", "Capture billable and non-billable time without leaving your workflow.", `<button class="button primary" id="add-time">${icon("plus")}Add time</button>`)}
      <section class="week-summary"><div class="summary-tile"><span>Today</span><strong>${logged.toFixed(2)}h</strong></div><div class="summary-tile"><span>This week</span><strong>31.75h</strong></div><div class="summary-tile"><span>Billable</span><strong>87%</strong></div><div class="summary-tile"><span>Weekly target</span><strong>40h</strong></div></section>
      <div class="timesheet-grid"><section class="card"><div class="day-tabs">${[["Mon","7.5h"],["Tue","8h"],["Wed","7.25h"],["Thu","9h"],["Fri",`${logged.t…25851 tokens truncated…("x")}</button></span></div><div class="task-breakdown">${task.checklist.length?`<div class="task-checklist"><div class="nested-section-label">Task checklist</div><div class="work-check-list">${checklistMarkup(task.checklist,task.id)}</div></div>`:""}${subtasks}<div class="task-nested-actions"><button class="text-btn" data-add-subtask="${task.id}" data-job-id="${job.id}">+ Sub-task</button><button class="text-btn" data-add-task-checklist="${task.id}" data-job-id="${job.id}">+ Checklist</button></div></div></section>`;
      }).join("") : `<div class="phase-empty-task">No tasks in this phase yet.</div>`;
      return `<article class="phase-card"><div class="phase-card-head"><div class="phase-heading"><span class="phase-folder">${icon("list")}</span><div><h4><button class="text-btn" data-edit-item="${phase.id}" data-project="${job.id}">${esc(phase.name)}</button></h4><small>Phase · ${tasks.length} task${tasks.length===1?"":"s"}</small></div></div><div class="phase-summary"><span>${esc(phase.owner)}</span><span>${phase.duration} days</span><span class="status ${statusClass(status)}">${progress}% · ${status}</span><button class="button ghost compact-button" data-add-phase-task="${phase.id}" data-job-id="${job.id}">${icon("plus")}Task</button><button class="icon-btn danger-text" type="button" data-delete-work-item="${phase.id}" data-job-id="${job.id}" aria-label="Delete ${esc(phase.name)}">${icon("x")}</button></div></div><div class="phase-task-head"><span>Task</span><span>Owner</span><span>Deadline</span><span>Progress</span><span>Actions</span></div><div class="phase-task-list">${taskRows}</div></article>`;
    }).join("");
    return `<div class="section-title phase-section-title"><div><h3>Phases, tasks &amp; work details</h3><p>Sub-tasks and checklists stay in Job Manager and do not appear in Schedule.</p></div><div class="phase-title-actions"><button class="button ghost" data-edit-schedule>Edit schedule</button><button class="button primary" data-add-phase="${job.id}">${icon("plus")}Phase</button></div></div><div class="phase-list">${phaseCards}</div>`;
  }

  function findJobTask(jobId,taskId) {
    const job=getJob(jobId),project=job&&ensureJobPhaseHierarchy(job),task=project?.items.find(item=>item.id===taskId&&item.type==="task");
    return {job,project,task};
  }

  function deleteJobWorkItem(jobId,itemId) {
    const job=getJob(jobId),project=job&&ensureJobPhaseHierarchy(job),item=project?.items.find(candidate=>candidate.id===itemId);if(!job||!project||!item)return null;
    const childTasks=item.type==="phase"?project.items.filter(candidate=>candidate.type==="task"&&candidate.parentPhaseId===item.id):item.type==="task"?[item]:[];
    const subtaskCount=childTasks.reduce((sum,task)=>sum+(task.subtasks?.length||0),0);
    const checklistCount=childTasks.reduce((sum,task)=>sum+(task.checklist?.length||0)+(task.subtasks||[]).reduce((count,subtask)=>count+(subtask.checklist?.length||0),0),0);
    const childText=item.type==="phase"?`\n\nThis phase contains ${childTasks.length} task${childTasks.length===1?"":"s"}, ${subtaskCount} sub-task${subtaskCount===1?"":"s"}, and ${checklistCount} checklist item${checklistCount===1?"":"s"}. All child content will be deleted with the phase.`:item.type==="task"?`\n\nThis task contains ${subtaskCount} sub-task${subtaskCount===1?"":"s"} and ${checklistCount} checklist item${checklistCount===1?"":"s"}. All child content will be deleted with the task.`:"";
    if(!window.confirm(`Delete ${item.type} “${item.name}”?${childText}\n\nThis action cannot be undone.`))return null;
    const removedIds=new Set(item.type==="phase"?[item.id,...childTasks.map(task=>task.id)]:[item.id]);
    project.items=project.items.filter(candidate=>!removedIds.has(candidate.id));
    project.items.forEach(candidate=>{if(removedIds.has(candidate.dependency))candidate.dependency="";});
    job.tasks=job.tasks.filter(task=>!removedIds.has(task[3]));job.milestones=job.milestones.filter(milestone=>!removedIds.has(milestone[2]));
    state.capacity.unassigned=state.capacity.unassigned.filter(entry=>!removedIds.has(entry.taskId));
    state.capacity.members.forEach(member=>member.allocations=member.allocations.filter(entry=>!removedIds.has(entry.taskId)));
    auditHistory(job,{source:"job",action:`Deleted ${item.type}`,entityType:item.type,entityName:item.name,phaseName:item.type==="task"?schedulePhase(project,item)?.name||"":"",oldValue:`${childTasks.length} task(s), ${subtaskCount} sub-task(s), ${checklistCount} checklist item(s)`,newValue:"Deleted",text:`${currentStaffName()} deleted ${item.type} “${item.name}” and its child content from ${job.id}.`});
    syncProjectProgress(project);if(!save())return null;return {job,item};
  }

  function staffOwnerOptions(selected) {
    return state.capacity.members.map(member=>`<option value="${esc(member.shortName)}" ${member.shortName===selected?"selected":""}>${esc(member.shortName)} · ${esc(member.fullName)}</option>`).join("");
  }

  function openTaskDetailEditor(jobId,taskId) {
    const {job,task}=findJobTask(jobId,taskId);if(!job||!task)return;
    showPanel("Edit task",`<form id="job-task-detail-form"><input type="hidden" name="jobId" value="${job.id}"><input type="hidden" name="taskId" value="${task.id}"><label>Task name<input name="name" value="${esc(task.name)}" required></label><div class="form-row"><label>Owner<select name="owner" required>${staffOwnerOptions(task.owner)}</select></label><label>Deadline<input type="date" name="due" value="${task.due}" min="${dateFromTimelineDay(task.start)}" required></label></div><label>Estimated hours<input type="number" name="hours" min="0.5" step="0.5" value="${task.estimatedHours||task.duration*8}" required></label><div class="panel-form-actions"><button class="button danger-button" type="button" data-delete-work-item="${task.id}" data-job-id="${job.id}">Delete task</button><button class="button primary" type="submit">Save task</button></div></form>`);
  }

  function openSubtaskEditor(jobId,taskId,subtaskId="") {
    const {job,task}=findJobTask(jobId,taskId);if(!job||!task)return;const subtask=task.subtasks.find(item=>item.id===subtaskId)||{id:"",name:"",owner:task.owner,due:task.due};
    showPanel(subtask.id?"Edit sub-task":"Add sub-task",`<form id="subtask-form"><input type="hidden" name="jobId" value="${job.id}"><input type="hidden" name="taskId" value="${task.id}"><input type="hidden" name="subtaskId" value="${subtask.id}"><label>Sub-task name<input name="name" value="${esc(subtask.name)}" required placeholder="e.g. Prepare supporting schedule"></label><div class="form-row"><label>Owner<select name="owner" required>${staffOwnerOptions(subtask.owner)}</select></label><label>Deadline<input type="date" name="due" value="${subtask.due}" min="${dateFromTimelineDay(task.start)}" max="${job.due}" required></label></div><button class="button primary" type="submit">${subtask.id?"Save sub-task":"Add sub-task"}</button></form>`);
  }

  function openChecklistEditor(jobId,taskId,subtaskId="",checklistId="") {
    const {job,task}=findJobTask(jobId,taskId);if(!job||!task)return;const parent=subtaskId?task.subtasks.find(item=>item.id===subtaskId):task,item=parent?.checklist.find(check=>check.id===checklistId);if(!parent)return;
    showPanel(item?"Edit checklist item":"Add checklist item",`<form id="checklist-item-form"><input type="hidden" name="jobId" value="${job.id}"><input type="hidden" name="taskId" value="${task.id}"><input type="hidden" name="subtaskId" value="${subtaskId}"><input type="hidden" name="checklistId" value="${checklistId}"><label>Checklist item<input name="text" value="${esc(item?.text||"")}" required placeholder="e.g. Supporting evidence attached"></label><button class="button primary" type="submit">${item?"Save checklist item":"Add checklist item"}</button></form>`);
  }

  function renderJobTimesheets(job) {
    const rows = state.times.filter(item=>item.jobId===job.id);
    return `<div class="section-title"><h3>Time sheets</h3><button class="button primary" data-timer-job="${esc(job.name)}">${icon("play")}Track time</button></div><div class="drawer-summary"><strong>${total(rows,"hours")}h logged</strong><span>${jobHours(job).remaining}h forecast remaining</span></div>${rows.length?`<div class="job-detail-table">${rows.map(row=>`<div class="job-detail-row time-row"><span><strong>${esc(row.task)}</strong><small>${esc(row.note)}</small></span><span>${esc(job.owner)}</span><span>${row.hours}h</span></div>`).join("")}</div>`:empty("clock","No time logged yet","Start the timer to add the first time entry for this job.")}`;
  }

  function renderJobMilestones(job) {
    return `<div class="section-title phase-section-title"><div><h3>Milestones</h3><p>Add key deadlines and delivery dates for this job.</p></div><div class="phase-title-actions"><button class="button ghost" data-edit-schedule>Edit schedule</button><button class="button primary" data-add-milestone="${job.id}">${icon("plus")}Milestone</button></div></div><div class="timeline milestone-large">${job.milestones.map((item,index)=>`<div class="milestone"><strong><button class="text-btn" data-edit-item="${item[2]}" data-project="${job.id}">${esc(item[0])}</button></strong><small>${shortDate(item[1])} · ${state.timeline.projects.find(p=>p.jobId===job.id)?.items.find(i=>i.id===item[2])?.progress===100?"completed":item[1]<todayKey()?"overdue":"planned"}</small></div>`).join("")}</div>`;
  }

  function renderJobNotes(job) {
    return `<div class="section-title"><h3>Notes</h3><span class="save-hint">Shared with the job team</span></div><form class="note-composer" id="job-note-form"><input type="hidden" name="jobId" value="${job.id}"><textarea name="note" rows="3" required placeholder="Add a progress note, decision, or client update…"></textarea><button class="button primary" type="submit">Add note</button></form><div class="note-list">${job.notes.map(note=>`<article class="note-card"><span class="avatar">${initials(note.author)}</span><div class="note-card-copy"><strong>${esc(note.author)}</strong><small>${esc(note.date)}${note.editedAt?` · Edited ${esc(note.editedAt)}`:""}</small><p>${esc(note.text)}</p></div><div class="note-card-actions"><button class="text-btn" type="button" data-edit-note="${note.id}" data-job-id="${job.id}">Edit</button><button class="text-btn danger-text" type="button" data-delete-note="${note.id}" data-job-id="${job.id}">Delete</button></div></article>`).join("")}</div>`;
  }

  function renderJobDocuments(job) {
    return `<div class="section-title"><h3>Documents</h3><span class="save-hint">Briefs, files, and deliverables</span></div><form class="document-upload" id="job-document-form"><input type="hidden" name="jobId" value="${job.id}"><input type="file" name="document" required><button class="button primary" type="submit">Add document</button></form><div class="drawer-document-list">${job.documents.map((file,index)=>`<article class="drawer-document"><span class="document-icon">${icon("file")}</span><div><strong>${esc(file.name)}</strong><small>${esc(file.type)} · ${esc(file.size)} · ${esc(file.added)}</small></div><button class="icon-btn" data-document-menu data-document-index="${index}" aria-label="Document options">${icon("more")}</button></article>`).join("")}</div>`;
  }

  function renderJobFinancials(job) {
    const margin = job.budget ? Math.round((job.budget-job.spent)/job.budget*100) : 0;
    const uninvoiced = Math.max(0,job.budget-job.billed);
    return `<div class="section-title"><h3>Financials</h3><span class="status ${margin>=30?"complete":"review"}">${margin>=30?"Healthy margin":"Margin watch"}</span></div><div class="financial-hero"><div><span>Projected profit</span><strong>${money(Math.max(0,job.budget-job.spent))}</strong></div><div><span>Projected margin</span><strong>${margin}%</strong></div></div><div class="financial-breakdown"><div><span>Job budget</span><strong>${money(job.budget)}</strong></div><div><span>Cost to date</span><strong>${money(job.spent)}</strong></div><div><span>Invoiced</span><strong>${money(job.billed)}</strong></div><div><span>Ready to invoice</span><strong>${money(uninvoiced)}</strong></div></div><div class="overview-meter financial-meter"><span style="width:${(job.budget ? Math.min(100,job.spent/job.budget*100) : 0)}%"></span></div><p class="financial-caption">${(job.budget ? Math.round(job.spent/job.budget*100) : 0)}% of budget used · ${money(Math.max(0,job.budget-job.spent))} remains</p>`;
  }

  function renderJobHistory(job) {
    return `<div class="section-title"><h3>Job history</h3><span class="save-hint">Most recent first · shared with Schedule History</span></div><div class="history-list detailed-history">${job.history.map(item=>historyEntryMarkup(item,job)).join("")}<article class="history-entry"><span class="activity-mark">${icon("plus")}</span><div class="history-entry-copy"><strong>Job created from ${esc(job.template)} template.</strong><small>${shortDate(job.start)} · ${esc(job.owner)}</small></div></article></div>`;
  }

  function renderJobTab(job) {
    if (activeJobTab === "phases") return renderJobPhases(job);
    if (activeJobTab === "timesheets") return renderJobTimesheets(job);
    if (activeJobTab === "milestones") return renderJobMilestones(job);
    if (activeJobTab === "notes") return renderJobNotes(job);
    if (activeJobTab === "documents") return renderJobDocuments(job);
    if (activeJobTab === "financials") return renderJobFinancials(job);
    if (activeJobTab === "history") return renderJobHistory(job);
    return renderJobOverview(job);
  }

  function openJob(id, tab = "information") {
    const job = getJob(id);
    if (!job) return;
    activeJobId = id;
    const tabPermission={information:'jobs',phases:'phases',milestones:'milestones',notes:'notes',documents:'documents',financials:'financials',history:'jobs'};
    activeJobTab = canAccess(tabPermission[tab]||'jobs')?tab:'information';
    const tabs = [["information","Information"],["phases","Phases"],["milestones","Milestones"],["notes","Notes"],["documents","Documents"]].filter(([key])=>canAccess(tabPermission[key]));
    $("#drawer-content").innerHTML = `<div class="drawer-body"><p class="eyebrow">Job Manager / ${job.id}</p><div class="drawer-title-row"><div><h2>${job.id} · ${esc(job.name)}</h2><p>${esc(job.client)} · owned by ${esc(job.owner)} · due ${shortDate(job.due)}</p></div><span class="status ${statusClass(job.status)}">${job.status}</span></div><div class="drawer-actions job-action-bar"><div class="job-actions-wrap"><button class="button ghost job-actions-trigger" data-job-menu aria-haspopup="menu" aria-expanded="false">Job actions${icon("arrow-down")}</button><div class="job-actions-menu" id="job-actions-menu" role="menu" hidden><button role="menuitem" data-job-action="duplicate" data-job-id="${job.id}">${icon("file")}<span><strong>Duplicate job</strong><small>Create a new copy of this job</small></span></button><button role="menuitem" data-job-action="complete" data-job-id="${job.id}">${icon("check")}<span><strong>Mark complete</strong><small>Set progress to 100%</small></span></button><button role="menuitem" data-job-action="hold" data-job-id="${job.id}" ${job.status==="On hold"?"disabled":""}>${icon("clock")}<span><strong>On hold</strong><small>Pause work without cancelling the job</small></span></button><button class="danger" role="menuitem" data-job-action="cancel" data-job-id="${job.id}">${icon("x")}<span><strong>Cancel job</strong><small>Stop work on this job</small></span></button></div></div><button class="button ghost" data-print-job>${icon("file")}Print</button><button class="button ghost" data-drawer-tab="history">${icon("clock")}History</button><button class="button primary" data-timer-job="${esc(job.name)}">${icon("play")}Track time</button></div><nav class="drawer-tabs">${tabs.map(([key,label])=>`<button class="drawer-tab ${activeJobTab===key?"active":""}" data-drawer-tab="${key}">${label}</button>`).join("")}</nav><div class="drawer-tab-content">${renderJobTab(job)}</div></div>`;
    $("#detail-drawer").classList.add("open");
    $("#detail-drawer").setAttribute("aria-hidden", "false");
    $("#drawer-scrim").hidden = false;
    applyAccessControls();
  }

  function closeDrawer() {
    $("#detail-drawer").classList.remove("open");
    $("#detail-drawer").setAttribute("aria-hidden", "true");
    $("#drawer-scrim").hidden = true;
  }

  function openModal(id) {
    const modal = $(id);
    modal.hidden = false;
    requestAnimationFrame(() => $("input,select", modal)?.focus());
  }
  function closeModal(modal) { modal.hidden = true; }

  function renderSearch(query = "") {
    const q = query.trim().toLowerCase();
    const jobs = state.jobs.filter(j => !q || [j.name,j.client,j.id].some(v => v.toLowerCase().includes(q))).slice(0,5);
    $("#search-results").innerHTML = `${jobs.length ? `<div class="search-group-title">Jobs</div>${jobs.map(j=>`<button class="search-result" data-search-job="${j.id}"><span class="result-icon">${icon("briefcase")}</span><span><strong>${esc(j.name)}</strong><small>${j.id} · ${esc(j.client)}</small></span></button>`).join("")}` : ""}${!jobs.length ? empty("search","Nothing found","Try a job number or client name.") : ""}`;
  }

  function startTimer(jobName = workingJobs()[0]?.name || "General work") {
    if (timer.running) {
      timer.running = false;
      clearInterval(timer.interval);
      showToast("Timer paused. Your time is ready to save.");
    } else {
      timer.running = true;
      timer.job = jobName;
      timer.interval = setInterval(() => { timer.seconds += 1; syncTimerUI(); }, 1000);
      showToast(`Timer started for ${jobName}.`);
    }
    syncTimerUI();
  }

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600).toString().padStart(2,"0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2,"0");
    const s = (seconds % 60).toString().padStart(2,"0");
    return `${h}:${m}:${s}`;
  }

  function syncTimerUI() {
    const top = $("#timer-button");
    if (top) {
      top.classList.toggle("running", timer.running);
      top.innerHTML = `${icon(timer.running ? "pause" : "play")}<span>${timer.running ? formatTime(timer.seconds) : "Start timer"}</span>`;
    }
    const clock = $("#timer-clock");
    if (clock) clock.textContent = formatTime(timer.seconds);
    const title = $("#timer-job");
    if (title) title.textContent = timer.running ? timer.job : "No timer running";
    const task = $("#timer-task");
    if (task) task.textContent = timer.running ? "General project work · billable" : "Select start to track your current task";
    const cardButton = $("#timer-card-button");
    if (cardButton) cardButton.innerHTML = `${icon(timer.running ? "pause" : "play")}${timer.running ? "Pause timer" : "Start timer"}`;
  }

  function openAllocationModal(taskId) {
    $("#allocation-form").elements.day.innerHTML=capacityDays().map((d,i)=>`<option value="${i}">${d.day}, ${d.date}</option>`).join("");
    const tasks = state.capacity.unassigned.filter(task => task.remaining > 0);
    if (!tasks.length) { showToast("All current tasks are assigned."); return; }
    $("#allocation-task").innerHTML = tasks.map(task => `<option value="${task.id}">${esc(task.task)} · ${task.remaining}h remaining</option>`).join("");
    $("#allocation-member").innerHTML = state.capacity.members.map(member => `<option value="${member.id}">${esc(member.name)} · ${capacityMemberData(member).remaining}h remaining</option>`).join("");
    if (taskId && tasks.some(task => task.id === taskId)) $("#allocation-task").value = taskId;
    openModal("#allocation-modal");
  }

  function openTimeOffModal() {
    $("#time-off-form").elements.day.innerHTML=capacityDays().map((d,i)=>`<option value="${i}">${d.day}, ${d.date}</option>`).join("");
    $("#time-off-member").innerHTML = state.capacity.members.map(member => `<option value="${member.id}">${esc(member.name)} · ${member.weeklyHours}h week</option>`).join("");
    openModal("#time-off-modal");
  }

  function openCapacitySettings() {
    const form = $("#capacity-settings-form");
    form.elements.under.value = state.capacity.settings.under;
    form.elements.over.value = state.capacity.settings.over;
    form.elements.colorMode.value = state.capacity.settings.colorMode;
    $("#working-hours-fields").innerHTML = `<div class="working-hours-title">Normal weekly hours</div>${state.capacity.members.map(member=>`<label class="hours-row"><span>${esc(member.name)} <small>(${member.workDays.filter(Boolean).length} working days)</small></span><input type="number" name="hours-${member.id}" value="${member.weeklyHours}" min="1" max="80" step="0.5" required /></label>`).join("")}`;
    openModal("#capacity-settings-modal");
  }

  function assignCapacityTask(taskId, memberId, day, requestedHours) {
    const task = state.capacity.unassigned.find(item => item.id === taskId);
    const member = state.capacity.members.find(item => item.id === memberId);
    if (!task || !member || task.remaining <= 0) return;
    if(!member.workDays[Number(day)]){showToast("This member does not work on this day.");return;}
    const leave=total(member.leaves.filter(l=>l.weekOffset===capacityWeekOffset && l.day===Number(day)),"hours");
    if(leave>=member.weeklyHours/member.workDays.filter(Boolean).length){showToast("This member is on full-day leave.");return;}
    const hours = Math.min(task.remaining, Math.max(.5, Number(requestedHours) || 4));
    member.allocations.push({ id:`ca-${Date.now()}`, day:Number(day), weekOffset:capacityWeekOffset, jobId:task.jobId, taskId:task.taskId, title:task.title, task:task.task, client:task.client, hours, actual:0, billable:task.billable });
    task.remaining = Math.max(0, task.remaining - hours);
    task.planned += hours;
    if(!save())return; render("schedule"); showToast(`${task.task} assigned to ${member.name} for ${hours}h.`);
  }

  function findAllocation(memberId, allocationId) {
    const member = state.capacity.members.find(item => item.id === memberId);
    return { member, allocation: member?.allocations.find(item => item.id === allocationId) };
  }

  function returnAllocationToQueue(allocation) {
    let task = state.capacity.unassigned.find(item => item.title === allocation.title && item.task === allocation.task && item.client === allocation.client);
    if (!task) {
      task = { id:`uq-${Date.now()}`, title:allocation.title, task:allocation.task, client:allocation.client, team:"Unassigned", remaining:0, estimated:allocation.hours, planned:0, billable:allocation.billable, priority:"Medium" };
      state.capacity.unassigned.push(task);
    }
    task.remaining += allocation.hours;
    task.planned = Math.max(0, task.planned - allocation.hours);
  }

  function findTimelineItem(projectId, itemId) {
    const project = state.timeline.projects.find(item=>item.jobId===projectId);
    return {project,item:project?.items.find(item=>item.id===itemId)};
  }

  function populateScheduleDependencies(projectId) {
    const project = state.timeline.projects.find(item=>item.jobId===projectId);
    if(!$("#schedule-parent"))$("#schedule-item-form").insertAdjacentHTML("afterbegin",`<label>Parent phase (tasks only)<select name="parentPhaseId" id="schedule-parent"></select></label>`);
    $("#schedule-parent").innerHTML=(project?.items||[]).filter(i=>i.type==="phase").map(i=>`<option value="${i.id}">${esc(i.name)}</option>`).join("");
    $("#schedule-dependency").innerHTML = `<option value="">No dependency</option>${(project?.items || []).map(item=>`<option value="${item.id}">${esc(item.name)}</option>`).join("")}`;
  }

  function openScheduleItemModal() {
    $("#schedule-project").innerHTML = state.timeline.projects.map(project=>{const job=getJob(project.jobId);return `<option value="${project.jobId}">${project.jobId} · ${esc(job?.name || project.jobId)}</option>`;}).join("");
    $("#schedule-owner").innerHTML = state.capacity.members.map(member=>`<option>${esc(member.name)}</option>`).join("");
    populateScheduleDependencies($("#schedule-project").value);
    $("#schedule-item-form").elements.start.value=dateFromTimelineDay(timelineOffset);
    openModal("#schedule-item-modal");
  }

  function openScheduleColumns() {
    const form = $("#schedule-columns-form");
    form.elements.owner.checked = state.timeline.columns.owner;
    form.elements.status.checked = state.timeline.columns.status;
    form.elements.progress.checked = state.timeline.columns.progress;
    openModal("#schedule-columns-modal");
  }

  function updateDependencyRisk(item) {
    if (!item.dependency || item.progress===100) return;
    const dependency = state.timeline.projects.flatMap(project=>project.items).find(candidate=>candidate.id===item.dependency);
    if (!dependency) return;
    if (item.start < dependency.start + dependency.duration) item.status = "At risk";
    else if (item.status === "At risk") item.status = item.progress ? "In progress" : "Planned";
  }

  function shiftDependentItems(project, itemId, delta, visited = new Set()) {
    if (!delta || visited.has(itemId)) return;
    visited.add(itemId);
    project.items.filter(item=>item.dependency===itemId || item.parentPhaseId===itemId).forEach(item=>{
      if(visited.has(item.id))return;
      item.start = item.start+delta;
      shiftDependentItems(project,item.id,delta,visited);
    });
  }

  function syncProjectProgress(project) {
    if(window.JOBFLOW_CLOUD&&window.JOBFLOW_CLOUD.role!=='admin'&&!window.JOBFLOW_CLOUD.permissions?.phases)return;
    for (const phase of project.items.filter(i=>i.type==="phase")) {
      const children=project.items.filter(i=>i.parentPhaseId===phase.id);
      if(children.length) {phase.progress=Math.round(children.reduce((s,i)=>s+i.progress,0)/children.length);phase.status=phase.progress===100?"Complete":phase.progress?"In progress":"Planned";}
    }
    const work = project.items.filter(item=>item.type==="task");
    const job = getJob(project.jobId);
    if (!job) return;
    if (!work.length) {job.progress=0;if(job.status==="Complete"&&job.boardStageStatus!==job.status)job.status="Planning";return;}
    const progress = Math.round(work.reduce((sum,item)=>sum+item.progress,0)/work.length);
    job.progress = progress;
    if(job.boardStageStatus===job.status)return;
    if (progress === 100 && job.status!=="Cancelled") job.status = "Complete";
    else if (job.status === "Complete") job.status=progress>0?"In progress":"Planning";
    else if (progress > 0 && job.status === "Planning") job.status = "In progress";
  }

  function downloadJSON(name, value) {
    const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:"application/json"}));
    const link=document.createElement("a"); link.href=url; link.download=name; link.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
  }

  function editTimeline(projectId,itemId) {
    const {project,item}=findTimelineItem(projectId,itemId); if(!item) return;
    showPanel(`Edit ${item.type}`,`<form id="edit-timeline-form"><input type="hidden" name="jobId" value="${esc(projectId)}"><input type="hidden" name="itemId" value="${esc(itemId)}"><label>Name<input name="name" value="${esc(item.name)}" required></label><label>Owner<select name="owner">${state.capacity.members.map(m=>`<option ${m.name===item.owner?"selected":""}>${esc(m.name)}</option>`).join("")}</select></label><label>Start / deadline<input type="date" name="start" value="${dateFromTimelineDay(item.start)}" required></label><label>Duration (calendar days)<input type="number" name="duration" min="1" value="${item.duration}" ${item.type==="milestone"?"readonly":""} required></label><label>Progress (%)<input type="number" min="0" max="100" name="progress" value="${item.progress}" required></label>${item.type==="task"?`<label>Parent phase<select name="parentPhaseId" required>${project.items.filter(i=>i.type==="phase").map(i=>`<option value="${i.id}" ${i.id===item.parentPhaseId?"selected":""}>${esc(i.name)}</option>`).join("")}</select></label><label>Estimated hours<input type="number" name="estimatedHours" min="0.5" step="0.5" value="${item.estimatedHours||item.duration*8}" required></label>`:""}<label>Depends on<select name="dependency"><option value="">None</option>${project.items.filter(i=>i.id!==item.id).map(i=>`<option value="${i.id}" ${i.id===item.dependency?"selected":""}>${esc(i.name)}</option>`).join("")}</select></label><div class="panel-form-actions"><button class="button danger-button" type="button" data-delete-timeline="${esc(item.id)}" data-project="${esc(projectId)}">Delete ${esc(item.type)}</button><button class="button primary">Save changes</button></div></form>`);
  }

  document.addEventListener("click", event => {
    if(event.target.closest("[data-open-job]"))prepareNewJobForm(false);
    if(event.target.closest("[data-open-recurring]"))prepareNewJobForm(true);
    const month=event.target.closest("[data-calendar-month]");
    if(month) {calendarMonth=new Date(calendarMonth.getFullYear(),calendarMonth.getMonth()+Number(month.dataset.calendarMonth),1);render("jobs");}
    if(event.target.closest("[data-calendar-today]")){calendarMonth=new Date(new Date().getFullYear(),new Date().getMonth(),1);render("jobs");}
    const page=event.target.closest("[data-timeline-page]");
    if(page){const direction=Number(page.dataset.timelinePage),days=timelineVisibleDays();if(!window.confirm(`${direction<0?"Move back":"Move forward"} the displayed schedule by ${days} days?`))return;timelineOffset+=direction*days;timelineEnd+=direction*days;render("schedule");}
    if(event.target.closest("[data-timeline-today]")){const days=timelineVisibleDays();timelineOffset=timelineDay(todayKey());timelineEnd=timelineOffset+days-1;render("schedule");}
    if(event.target.closest("[data-open-capacity]")){scheduleMode="capacity";render("schedule");}
    const history=event.target.closest("[data-history-job]");
    if(history){$("#audit-panel")?.remove();openJob(history.dataset.historyJob,"history");}
    const edit=event.target.closest("[data-edit-item]");
    if(edit) editTimeline(edit.dataset.project,edit.dataset.editItem);
    const jump=event.target.closest("[data-jump-item]");
    if(jump){const found=findTimelineItem(jump.dataset.project,jump.dataset.jumpItem);if(found.item){const days=timelineVisibleDays();timelineOffset=found.item.start;timelineEnd=timelineOffset+days-1;render("schedule");}}
    const recurring=event.target.closest("[data-generate-recurring]");
    if(recurring){
      const template=state.recurring.find(r=>r.id===recurring.dataset.generateRecurring);if(!template?.active)return;
      const occurrence=`${template.id}:${template.next}`;
      if(state.jobs.some(j=>j.occurrence===occurrence)){showToast("This occurrence already has a job.");return;}
      const job={id:`JF-${Math.max(0,...state.jobs.map(j=>Number(j.id.split("-")[1])||0))+1}`,name:template.name,client:template.client,owner:template.owner,start:template.next,due:dateFromTimelineDay(timelineDay(template.next)+6),status:"Planning",priority:"medium",progress:0,budget:template.budget,spent:0,billed:0,team:[initials(template.owner)],tasks:[["Delivery work",false,"8h"]],milestones:[["Final delivery",dateFromTimelineDay(timelineDay(template.next)+6)]],notes:[],documents:[],history:[],template:"Monthly retainer",description:"Recurring delivery",contact:"",orderNo:"",occurrence};
      state.jobs.unshift(job);auditHistory(job);
      const date=new Date(`${template.next}T12:00:00`),day=date.getDate();
      if(template.cadence==="Weekly")date.setDate(day+7);
      else {date.setDate(1);date.setMonth(date.getMonth()+({Monthly:1,Quarterly:3,Annually:12}[template.cadence]||1));date.setDate(Math.min(day,new Date(date.getFullYear(),date.getMonth()+1,0).getDate()));}
      template.next=`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
      if(!save())return;render(currentView);openJob(job.id);
    }
    if(event.target.closest("[data-export-selected]")) downloadJSON("jobflow-selected-jobs.json",state.jobs.filter(j=>selectedJobs.has(j.id)));
    if(event.target.closest("[data-clear-selection]")){selectedJobs.clear();render("jobs");}
    const stop=()=>{event.stopImmediatePropagation();};
    if(event.target.closest("#notification-btn")){stop(); showPanel("Deadlines",state.jobs.flatMap(j=>j.milestones.filter(m=>m[1]<=dateFromTimelineDay(timelineDay(todayKey())+7) && !["Complete","Cancelled"].includes(j.status)).map(m=>`<button class="search-result" data-job="${j.id}" data-job-tab="milestones"><span>${esc(j.id)} · ${esc(m[0])}<small>${m[1]}</small></span></button>`)).join("")||"No upcoming deadlines.");}
    if(event.target.closest("#help-btn")){stop();showPanel("Quick guide","<p>Overview summarizes current records. Jobs manages job details, phases, milestones and documents. Schedule edits the same phases/tasks/milestones and allocates staff by week.</p><p>Use Calendar arrows to change months. Click a milestone to open its job. Dates use calendar days. Data is local to this browser; use Profile → Download backup regularly.</p>");}
    if(event.target.closest('[aria-label="Profile menu"]'))showPanel("Local workspace",`<p>${esc(currentStaffName())} is the current demo workspace identity. This workspace stores data only in this browser.</p><button class="button primary" data-backup>Download backup</button>`);
    if(event.target.closest("[data-backup]"))downloadJSON("jobflow-backup.json",state);
    if(event.target.closest("[data-timer-job],#timer-button,#timer-card-button")){
      stop();
      if(timer.running) {
        clearInterval(timer.interval);timer.running=false;
        const hours=Math.max(1,timer.seconds)/3600;
        state.times.push({id:crypto.randomUUID(),jobId:timer.jobId,job:timer.job,taskId:timer.taskId,task:timer.task||"General work",memberId:"alex",date:todayKey(),note:"Tracked time",hours});
        const job=getJob(timer.jobId);if(job)auditHistory(job);timer.seconds=0;if(!save())return;render(currentView);showToast("Tracked time saved.");
      } else {
        const requested=event.target.closest("[data-timer-job]")?.dataset.timerJob;
        showPanel("Track time",`<form id="start-timer-form"><label>Job<select name="jobId">${workingJobs().map(j=>`<option value="${j.id}" ${j.name===requested?"selected":""}>${esc(j.name)}</option>`).join("")}</select></label><label>Task<select name="taskId"><option value="">General work</option></select></label><button class="button primary">Start timer</button></form>`);
        populateTimerTasks();
      }
    }
    const manageTask=event.target.closest("[data-manage-task]");
    if(manageTask){stop();openTaskDetailEditor(manageTask.dataset.jobId,manageTask.dataset.manageTask);}
    const deleteWorkItem=event.target.closest("[data-delete-work-item]");
    if(deleteWorkItem){stop();const result=deleteJobWorkItem(deleteWorkItem.dataset.jobId,deleteWorkItem.dataset.deleteWorkItem);if(result){$("#audit-panel")?.remove();render(currentView);openJob(result.job.id,"phases");showToast(`${result.item.name} deleted with its child content.`);}return;}
    const addSubtask=event.target.closest("[data-add-subtask]");
    if(addSubtask){stop();openSubtaskEditor(addSubtask.dataset.jobId,addSubtask.dataset.addSubtask);}
    const editSubtask=event.target.closest("[data-edit-subtask]");
    if(editSubtask){stop();openSubtaskEditor(editSubtask.dataset.jobId,editSubtask.dataset.taskId,editSubtask.dataset.editSubtask);}
    const deleteSubtask=event.target.closest("[data-delete-subtask]");
    if(deleteSubtask){stop();const {job,project,task}=findJobTask(deleteSubtask.dataset.jobId,deleteSubtask.dataset.taskId),subtask=task?.subtasks.find(item=>item.id===deleteSubtask.dataset.deleteSubtask);if(!job||!task||!subtask)return;const checks=subtask.checklist?.length||0;if(!window.confirm(`Delete sub-task “${subtask.name}”?\n\nIts ${checks} checklist item${checks===1?"":"s"} will also be deleted. This action cannot be undone.`))return;task.subtasks=task.subtasks.filter(item=>item.id!==subtask.id);auditHistory(job,{source:"job",action:"Deleted sub-task",entityType:"sub-task",entityName:subtask.name,phaseName:schedulePhase(project,task)?.name||"",oldValue:`${subtask.name} · ${subtask.owner} · ${subtask.due} · ${checks} checklist item(s)`,newValue:"Deleted",text:`${currentStaffName()} deleted sub-task “${subtask.name}” and its checklist from task “${task.name}”.`});if(!save())return;render(currentView);openJob(job.id,"phases");showToast("Sub-task and its checklist deleted.");return;}
    const addTaskChecklist=event.target.closest("[data-add-task-checklist]");
    if(addTaskChecklist){stop();openChecklistEditor(addTaskChecklist.dataset.jobId,addTaskChecklist.dataset.addTaskChecklist);}
    const addSubtaskChecklist=event.target.closest("[data-add-subtask-checklist]");
    if(addSubtaskChecklist){stop();openChecklistEditor(addSubtaskChecklist.dataset.jobId,addSubtaskChecklist.dataset.taskId,addSubtaskChecklist.dataset.addSubtaskChecklist);}
    const editChecklist=event.target.closest("[data-edit-checklist]");
    if(editChecklist){stop();openChecklistEditor(editChecklist.dataset.jobId,editChecklist.dataset.taskId,editChecklist.dataset.subtaskId,editChecklist.dataset.editChecklist);}
    const deleteChecklist=event.target.closest("[data-delete-checklist]");
    if(deleteChecklist){stop();const {job,project,task}=findJobTask(deleteChecklist.dataset.jobId,deleteChecklist.dataset.taskId),parent=deleteChecklist.dataset.subtaskId?task?.subtasks.find(item=>item.id===deleteChecklist.dataset.subtaskId):task,item=parent?.checklist.find(check=>check.id===deleteChecklist.dataset.deleteChecklist);if(!job||!task||!parent||!item)return;if(!window.confirm(`Delete checklist item “${item.text}”?\n\nThis action cannot be undone.`))return;parent.checklist=parent.checklist.filter(check=>check.id!==item.id);auditHistory(job,{source:"job",action:"Deleted checklist item",entityType:deleteChecklist.dataset.subtaskId?"sub-task checklist":"task checklist",entityName:item.text,phaseName:schedulePhase(project,task)?.name||"",oldValue:item.text,newValue:"Deleted",text:`${currentStaffName()} deleted checklist item “${item.text}” from “${parent.name||task.name}”.`});if(!save())return;render(currentView);openJob(job.id,"phases");showToast("Checklist item deleted.");return;}
    const doc=event.target.closest("[data-document-menu]");
    if(doc){stop();const job=getJob(activeJobId),record=job?.documents[Number(doc.dataset.documentIndex)]; if(!record)return; if(!record.dataUrl){showPanel("Document unavailable","<p>This older entry contains file metadata only. Upload the original file to enable download.</p>");return;} const link=document.createElement("a");link.href=record.dataUrl;link.download=record.name;link.click();}
    const editNote=event.target.closest("[data-edit-note]");
    if(editNote){
      stop();const job=getJob(editNote.dataset.jobId),note=job?.notes.find(item=>item.id===editNote.dataset.editNote);if(!job||!note)return;
      showPanel("Edit note",`<form id="edit-note-form"><input type="hidden" name="jobId" value="${job.id}"><input type="hidden" name="noteId" value="${note.id}"><label>Note<textarea name="note" rows="5" required>${esc(note.text)}</textarea></label><button class="button primary" type="submit">Save changes</button></form>`);
    }
    const deleteNote=event.target.closest("[data-delete-note]");
    if(deleteNote){
      stop();const job=getJob(deleteNote.dataset.jobId),index=job?.notes.findIndex(item=>item.id===deleteNote.dataset.deleteNote);if(!job||index<0)return;
      const note=job.notes[index];if(!window.confirm("Delete this note? This action cannot be undone."))return;
      job.notes.splice(index,1);auditHistory(job,{source:"job",action:"Deleted note",entityType:"note",entityName:note.id,oldValue:note.text,newValue:"Deleted",text:`${currentStaffName()} deleted a note from ${job.id}.`});
      if(!save())return;openJob(job.id,"notes");render(currentView);showToast("Note deleted.");
    }
    const action=event.target.closest("[data-job-action]");
    if(action){
      stop();const job=getJob(action.dataset.jobId); if(!job)return;
      const project=ensureJobPhaseHierarchy(job);
      if(action.dataset.jobAction==="duplicate"){
        const copy=structuredClone(job);copy.id=`JF-${Math.max(...state.jobs.map(j=>Number(j.id.split("-")[1])||0))+1}`;copy.name+=" (copy)";copy.status="Planning";copy.progress=0;copy.spent=0;copy.billed=0;copy.notes=[];copy.documents=[];copy.history=[];
        const plan=structuredClone(project),ids=new Map(plan.items.map(i=>[i.id,crypto.randomUUID()])); plan.jobId=copy.id;
        plan.items.forEach(i=>{i.id=ids.get(i.id);i.dependency=ids.get(i.dependency)||"";i.parentPhaseId=ids.get(i.parentPhaseId)||"";i.progress=0;i.status="Planned";});
        copy.tasks.forEach(t=>{t[1]=false;t[3]=ids.get(t[3]);});copy.milestones.forEach(m=>m[2]=ids.get(m[2]));state.jobs.unshift(copy);state.timeline.projects.unshift(plan);auditHistory(copy);if(!save())return;render(currentView);openJob(copy.id);
      } else {
        const nextStatus={complete:"Complete",hold:"On hold",cancel:"Cancelled"}[action.dataset.jobAction];if(!nextStatus)return;
        if(!window.confirm(`${action.dataset.jobAction==="complete"?"Complete":action.dataset.jobAction==="hold"?"Put on hold":"Cancel"} ${job.id}?`))return;
        const previousStatus=job.status;job.status=nextStatus;
        if(job.status==="Complete"){job.progress=100;project.items.forEach(i=>{i.progress=100;i.status="Complete";});}
        auditHistory(job,{source:"job",action:job.status==="On hold"?"Put job on hold":job.status==="Complete"?"Marked job complete":"Cancelled job",entityType:"job",entityName:job.name,oldValue:previousStatus,newValue:job.status,text:`${currentStaffName()} changed ${job.id} from ${previousStatus} to ${job.status}.`});if(!save())return;render(currentView);openJob(job.id);showToast(`${job.id} is now ${job.status}.`);
      }
    }
  },true);

  function populateTimerTasks(){const f=$("#start-timer-form");if(!f)return;const p=state.timeline.projects.find(p=>p.jobId===f.elements.jobId.value);f.elements.taskId.innerHTML=`<option value="">General work</option>${p?.items.filter(i=>i.type==="task").map(i=>`<option value="${i.id}">${esc(i.name)}</option>`).join("")||""}`;}

  document.addEventListener("change",event=>{
    if(event.target.matches('#start-timer-form [name="jobId"]'))populateTimerTasks();
    if(event.target.matches("[data-select-all]")){filteredJobs().forEach(j=>event.target.checked?selectedJobs.add(j.id):selectedJobs.delete(j.id));render("jobs");}
    if(event.target.matches("[data-select-job]")){event.target.checked?selectedJobs.add(event.target.dataset.selectJob):selectedJobs.delete(event.target.dataset.selectJob);render("jobs");}
  });

  document.addEventListener("submit",event=>{
    const form=event.target;
    if(!["edit-timeline-form","schedule-range-form","job-display-form","start-timer-form"].includes(form.id))return;
    event.preventDefault();const data=Object.fromEntries(new FormData(form));
    if(form.id==="schedule-range-form") {
      const start=timelineDay(data.from),end=timelineDay(data.to),days=end-start+1;
      if(!data.from||!data.to||days<1){showToast("The schedule end date must be on or after the start date.");return;}
      if(days>180){showToast("Choose a date range of 180 days or fewer.");return;}
      timelineOffset=start;timelineEnd=end;render("schedule");return;
    }
    if(form.id==="job-display-form") {state.hiddenJobColumns=[3,6,7,8,9].filter(n=>!data[`col-${n}`]);if(!save())return;$("#audit-panel").remove();render("jobs");}
    if(form.id==="start-timer-form"){
      const job=getJob(data.jobId);if(!job)return;const item=findTimelineItem(job.id,data.taskId).item;
      timer={running:true,jobId:job.id,job:job.name,taskId:item?.id,task:item?.name,seconds:0,started:Date.now()};
      timer.interval=setInterval(()=>{timer.seconds=Math.floor((Date.now()-timer.started)/1000);syncTimerUI();},1000);$("#audit-panel").remove();syncTimerUI();showToast("Timer started. Press the timer again to save.");
    }
    if(form.id==="edit-timeline-form"){
      const {project,item}=findTimelineItem(data.jobId,data.itemId);if(!item)return;
      let cursor=data.dependency;const seen=new Set([item.id]);while(cursor){if(seen.has(cursor)){showToast("A dependency cycle is not allowed.");return;}seen.add(cursor);cursor=project.items.find(i=>i.id===cursor)?.dependency;}
      const oldValue=scheduleItemSummary(item,project),oldName=item.name;
      if(!window.confirm(`Save changes to ${item.type} “${item.name}”?\n\nBefore: ${oldValue}`))return;
      const delta=timelineDay(data.start)-item.start;
      Object.assign(item,{name:data.name,owner:data.owner,start:timelineDay(data.start),duration:item.type==="milestone"?1:Number(data.duration),progress:Number(data.progress),dependency:data.dependency});
      if(item.type==="task"){item.parentPhaseId=data.parentPhaseId;item.estimatedHours=Number(data.estimatedHours);const task=getJob(data.jobId).tasks.find(t=>t[3]===item.id);if(task)task[2]=`${item.estimatedHours}h`;const q=state.capacity.unassigned.find(q=>q.taskId===item.id);if(q)q.estimated=item.estimatedHours;}
      if(item.type==="phase") {project.items.filter(i=>i.parentPhaseId===item.id).forEach(i=>{i.start+=delta;i.progress=item.progress;i.status=item.progress===100?"Complete":item.progress?"In progress":"Planned";});}
      item.status=item.progress===100?"Complete":item.progress?"In progress":"Planned";project.items.forEach(updateDependencyRisk);syncProjectProgress(project);recordScheduleHistory(getJob(data.jobId),`Updated ${item.type}`,item,project,oldValue,scheduleItemSummary(item,project));if(!save())return;$("#audit-panel").remove();render(currentView);if($("#detail-drawer").classList.contains("open"))openJob(data.jobId,activeJobTab);showToast(`${oldName} updated.`);
    }
  });

  document.addEventListener("submit",event=>{
    if(event.target.id!=="job-document-form")return;
    event.preventDefault();event.stopImmediatePropagation();
    const data=new FormData(event.target),job=getJob(data.get("jobId")),file=data.get("document");
    if(!job||!file?.name)return;
    if(file.size>1024*1024){showToast("Local documents must be 1 MB or smaller. Larger files need shared file storage.");return;}
    const reader=new FileReader();
    reader.onerror=()=>showToast("Unable to read this file.");
    reader.onload=()=>{job.documents.unshift({id:crypto.randomUUID(),name:file.name,type:file.type||"Uploaded file",size:`${Math.ceil(file.size/1024)} KB`,added:todayKey(),dataUrl:reader.result});auditHistory(job);if(!save())return;openJob(job.id,"documents");};reader.readAsDataURL(file);
  },true);

  document.addEventListener("click", event => {
    const nav = event.target.closest("[data-view]");
    if (nav) render(nav.dataset.view);
    const viewLink = event.target.closest("[data-view-link]");
    if (viewLink) render(viewLink.dataset.viewLink);
    if(event.target.closest("[data-select-board-view]")){openBoardViewSelector();return;}
    const chooseBoardView=event.target.closest("[data-choose-board-view]");
    if(chooseBoardView){selectedBoardViewId=chooseBoardView.dataset.chooseBoardView;boardStepFilter="All steps";boardClientFilter="";boardClientQuery="";$("#audit-panel")?.remove();jobSection="board";render("jobs");return;}
    if(event.target.closest("[data-create-board-view]")){openBoardViewEditor();return;}
    const editBoardView=event.target.closest("[data-edit-board-view]");
    if(editBoardView){openBoardViewEditor(editBoardView.dataset.editBoardView);return;}
    if(event.target.closest("[data-cancel-board-view]")){boardViewDraft=null;$("#audit-panel")?.remove();if(currentView==="settings")render("settings");else openBoardViewSelector();return;}
    if(event.target.closest("[data-add-board-step]")){readBoardViewDraft();boardViewDraft.steps.push({id:crypto.randomUUID(),name:`Step ${boardViewDraft.steps.length+1}`,status:`Step ${boardViewDraft.steps.length+1}`,visible:true,aliases:[]});renderBoardViewEditor();return;}
    const removeBoardStep=event.target.closest("[data-remove-board-step]");
    if(removeBoardStep){readBoardViewDraft();if(boardViewDraft.steps.length<=1){showToast("A Board view needs at least one step.");return;}boardViewDraft.steps=boardViewDraft.steps.filter(step=>step.id!==removeBoardStep.dataset.removeBoardStep);renderBoardViewEditor();return;}
    if(event.target.closest("[data-settings-board-views]")){boardViewDraft=null;$("#audit-panel")?.remove();settingsSection="board-views";render("settings");return;}
    if (event.target.closest("[data-open-job],[data-open-recurring]")) openModal("#job-modal");
    const close = event.target.closest("[data-close-modal]");
    if (close) closeModal(close.closest(".modal-backdrop"));
    const jobTarget = event.target.closest("[data-job]");
    if (jobTarget && (!event.target.closest("button,input") || jobTarget.matches("button") || event.target.closest("[data-open-row]"))) { $("#audit-panel")?.remove(); openJob(jobTarget.dataset.job,jobTarget.dataset.jobTab || "information"); }
    const section = event.target.closest("[data-job-section]");
    if (section) {
      const destination = section.dataset.jobSection;
      if (destination === "capacity" || destination === "schedule") {
        scheduleMode = destination === "capacity" ? "capacity" : "timeline";
        render("schedule");
      } else {
        jobSection = destination;
        if(destination==="board"){selectedBoardViewId=defaultBoardView()?.id||"";boardStepFilter="All steps";}
        jobQuickFilter = "all";
        jobFilter = "All statuses";
        render("jobs");
      }
    }
    const clientSuggestion = event.target.closest("[data-board-client]");
    if (clientSuggestion) {
      if (selectBoardClient(clientSuggestion.dataset.boardClient)) render("jobs");
    }
    const pickerSuggestion=event.target.closest("[data-search-picker-select]");
    if(pickerSuggestion) applySearchPicker(pickerSuggestion.dataset.searchPickerSelect,pickerSuggestion.dataset.searchPickerValue,pickerSuggestion.dataset.searchPickerLabel);
    const pickerClear=event.target.closest("[data-search-picker-clear]");
    if(pickerClear) clearSearchPicker(pickerClear.dataset.searchPickerClear);
    if (event.target.closest("[data-clear-calendar-client]")) { calendarClientFilter=""; render("jobs"); }
    if (event.target.closest("[data-clear-board-client]")) { boardClientFilter=""; boardClientQuery=""; render("jobs"); }
    const quickFilter = event.target.closest("[data-job-quick]");
    if (quickFilter) { jobQuickFilter = quickFilter.dataset.jobQuick; render("jobs"); }
    if (event.target.closest("[data-display-options]")) showPanel("Job display options",`<form id="job-display-form">${["Client","Start date","Due date","Progress","Priority"].map((label,i)=>`<label><input type="checkbox" name="col-${[3,6,7,8,9][i]}" ${state.hiddenJobColumns?.includes([3,6,7,8,9][i])?"":"checked"}> ${label}</label>`).join("")}<button class="button primary">Apply columns</button></form>`);
    if (event.target.closest("[data-job-history]") || event.target.closest("[data-all-activity]")) historyPanel();
    const recurringToggle = event.target.closest("[data-toggle-recurring]");
    if (recurringToggle) {
      const item = state.recurring.find(candidate=>candidate.id===recurringToggle.dataset.toggleRecurring);
      item.active = !item.active;
      if(!save())return; render("jobs"); showToast(`${item.name} is now ${item.active?"active":"paused"}.`);
    }
    if (event.target.closest("#menu-btn")) $("#sidebar").classList.toggle("open");
    if (event.target.closest("#search-btn")) { openModal("#search-modal"); renderSearch(); }
    if (event.target.closest("#notification-btn")) showToast("You’re all caught up — no new alerts.");
    if (event.target.closest("#help-btn")) showToast("Tip: open any job to manage phases, tasks, sub-tasks, checklists and milestones.");
    if (event.target.closest("#timer-button") || event.target.closest("#timer-card-button")) startTimer(timer.job);
    if (event.target.closest("#close-drawer") || event.target === $("#drawer-scrim")) closeDrawer();
    const searchJob = event.target.closest("[data-search-job]");
    if (searchJob) { closeModal($("#search-modal")); openJob(searchJob.dataset.searchJob); }
    const searchView = event.target.closest("[data-search-view]");
    if (searchView) { closeModal($("#search-modal")); render(searchView.dataset.searchView); }
    const timerJob = event.target.closest("[data-timer-job]");
    if (timerJob) { startTimer(timerJob.dataset.timerJob); closeDrawer(); }
    const drawerTab = event.target.closest("[data-drawer-tab]");
    if (drawerTab && activeJobId) openJob(activeJobId,drawerTab.dataset.drawerTab);
    if (event.target.closest("[data-print-job]")) window.print();
    const jobMenuButton = event.target.closest("[data-job-menu]");
    const jobMenu = $("#job-actions-menu");
    if (jobMenuButton && jobMenu) {
      const isOpening = jobMenu.hidden;
      jobMenu.hidden = !isOpening;
      jobMenuButton.setAttribute("aria-expanded",String(isOpening));
    } else if (jobMenu && !event.target.closest("#job-actions-menu")) {
      jobMenu.hidden = true;
      $("[data-job-menu]")?.setAttribute("aria-expanded","false");
    }
    if (event.target.closest("[data-document-menu]")) showToast("Document preview and sharing options are ready.");
    if (event.target.closest("[data-edit-schedule]")) {
      const job = getJob(activeJobId);
      const project = job && ensureJobPhaseHierarchy(job);
      if (project) project.expanded = true;
      scheduleFocusJobId = activeJobId;
      if (project) {const days=timelineVisibleDays();timelineOffset=Math.min(timelineDay(job.start),...project.items.map(i=>i.start));timelineEnd=timelineOffset+days-1;}
      scheduleMode = "timeline";
      timelineGroup = "job";
      timelineFilters = { owner:"All staff", status:"All statuses", clientQuery:"", department:"All departments" };
      closeDrawer();
      render("schedule");
    }
    const addMilestone = event.target.closest("[data-add-milestone]");
    if (addMilestone) {
      const job = getJob(addMilestone.dataset.addMilestone);
      if (job) {
        const form = $("#milestone-form");
        form.reset();
        $("#milestone-job-id").value = job.id;
        $("#milestone-date").value = job.due;
        openModal("#milestone-modal");
      }
    }
    const addPhase = event.target.closest("[data-add-phase]");
    if (addPhase) {
      const job = getJob(addPhase.dataset.addPhase);
      if (job) {
        refreshStaffSelects();
        const project = ensureJobPhaseHierarchy(job);
        const nextStart = Math.max(...project.items.filter(item => item.type === "phase").map(item => item.start + item.duration));
        const form = $("#phase-form");
        form.reset();
        $("#phase-job-id").value = job.id;
        $("#phase-owner").value = job.owner;
        $("#phase-start").value = dateFromTimelineDay(nextStart);
        openModal("#phase-modal");
      }
    }
    const addPhaseTask = event.target.closest("[data-add-phase-task]");
    if (addPhaseTask) {
      const job = getJob(addPhaseTask.dataset.jobId);
      const project = job && ensureJobPhaseHierarchy(job);
      const phase = project?.items.find(item => item.id === addPhaseTask.dataset.addPhaseTask && item.type === "phase");
      if (job && phase) {
        refreshStaffSelects();
        const form = $("#phase-task-form");
        form.reset();
        $("#phase-task-job-id").value = job.id;
        $("#phase-task-phase-id").value = phase.id;
        $("#phase-task-parent-name").textContent = phase.name;
        $("#phase-task-owner").value = phase.owner;
        $("#phase-task-due").value = dateFromTimelineDay(phase.start);
        openModal("#phase-task-modal");
      }
    }
    const jobAction = event.target.closest("[data-job-action]");
    if (jobAction) {
      const job = getJob(jobAction.dataset.jobId);
      if (!job) return;
      if (jobAction.dataset.jobAction === "duplicate") {
        const nextNumber = Math.max(...state.jobs.map(item=>Number(item.id.split("-")[1])||0))+1;
        const copy = structuredClone(job);
        copy.id = `JF-${nextNumber}`; copy.name = `${job.name} (copy)`; copy.status = "Planning"; copy.progress = 0; copy.billed = 0; copy.spent = 0;
        copy.notes = [{id:`note-${Date.now()}`,author:currentStaffName(),date:"2026-09-04",text:`Duplicated from ${job.id}.`}]; copy.documents = []; copy.history = [{id:`history-${Date.now()}`,date:new Date().toLocaleString(),timestamp:Date.now(),text:`Job duplicated from ${job.id}.`}];
        state.jobs.unshift(copy); if(!save())return; closeDrawer(); jobSection = "all"; render("jobs"); showToast(`${copy.id} created from ${job.id}.`);
      }
      if (jobAction.dataset.jobAction === "complete") { job.status="Complete"; job.progress=100; job.history.unshift({id:`history-${Date.now()}`,date:new Date().toLocaleString(),timestamp:Date.now(),text:`${currentStaffName()} marked the job complete.`}); if(!save())return; openJob(job.id,"history"); showToast(`${job.id} marked complete.`); }
      if (jobAction.dataset.jobAction === "hold") { job.status="On hold"; job.history.unshift({id:`history-${Date.now()}`,date:new Date().toLocaleString(),timestamp:Date.now(),text:`${currentStaffName()} put the job on hold.`}); if(!save())return; openJob(job.id,"history"); showToast(`${job.id} is now on hold.`); }
      if (jobAction.dataset.jobAction === "cancel") { job.status="Cancelled"; job.history.unshift({id:`history-${Date.now()}`,date:new Date().toLocaleString(),timestamp:Date.now(),text:`${currentStaffName()} cancelled the job.`}); if(!save())return; openJob(job.id,"history"); showToast(`${job.id} cancelled.`); }
    }
    const advance = event.target.closest(".status-advance");
    if (advance) {
      const job = getJob(advance.dataset.jobId);
      const flow = ["Planning","In progress","Review","Complete"];
      const current = job.status === "On hold" ? 0 : Math.max(0, flow.indexOf(job.status));
      job.status = flow[Math.min(flow.length - 1, current + 1)];
      job.progress = Math.min(100, job.progress + 12);
      if(!save())return; closeDrawer(); render(currentView); showToast(`${job.id} moved to ${job.status}.`);
    }
    const addTask = event.target.closest(".add-task");
    if (addTask) {
      const job = getJob(addTask.dataset.jobId);
      job.tasks.push(["New follow-up task", false, "2h"]); if(!save())return; openJob(job.id); showToast("A follow-up task was added.");
    }
    const quoteAction = event.target.closest(".quote-action");
    if (quoteAction) {
      const quote = state.quotes.find(q => q.id === quoteAction.dataset.quote);
      if (quote.status === "Accepted") {
        const id = `JF-${2430 + state.jobs.length}`;
        const newJob = {id,name:quote.title,client:quote.client,owner:currentStaffName(),due:"2026-10-16",start:"2026-09-07",status:"Planning",progress:0,budget:quote.value,billed:0,spent:0,priority:"medium",team:[currentStaffName()],tasks:[["Project kick-off",false,"4h"],["Delivery work",false,"24h"]],milestones:[["Kick-off","2026-09-09"],["Client review","2026-10-09"],["Final delivery","2026-10-16"]],contact:`${quote.client.split(" ")[0]} project team`,orderNo:`PO-${id.replace("JF-","26")}`,template:"Professional services",description:`Delivery of ${quote.title.toLowerCase()} for ${quote.client}.`,notes:[],documents:[],history:[{id:`history-${Date.now()}`,date:new Date().toLocaleString(),timestamp:Date.now(),text:`Job converted from ${quote.id}.`}]};
        state.jobs.push(newJob);
        state.timeline.projects.push({jobId:id,expanded:true,items:[{id:`tl-${Date.now()}-1`,name:"Project delivery",type:"phase",owner:newJob.owner,start:6,duration:32,progress:0,status:"Planned",dependency:""},{id:`tl-${Date.now()}-2`,name:"Final delivery",type:"milestone",owner:newJob.owner,start:41,duration:1,progress:0,status:"Planned",dependency:""}]});
        if(!save())return; render("jobs"); showToast(`${quote.id} converted into ${id}.`);
      } else showToast(`${quote.id} opened for review.`);
    }
    const invoiceAction = event.target.closest(".invoice-action");
    if (invoiceAction) {
      const invoice = state.invoices.find(i => i.id === invoiceAction.dataset.invoice);
      if (invoice.status !== "Paid") { invoice.status = "Paid"; if(!save())return; render("invoices"); showToast(`${invoice.id} marked as paid.`); }
      else showToast(`${invoice.id} payment details opened.`);
    }
    if (event.target.closest("#quick-time") || event.target.closest("#add-time")) {
      const job=workingJobs()[0],task=job&&state.timeline.projects.find(project=>project.jobId===job.id)?.items.find(item=>item.type==="task");if(!job||!task)return;const member=state.capacity.members.find(item=>item.name===task.owner);state.times.push({id:crypto.randomUUID(),jobId:job.id,job:job.name,taskId:task.id,task:task.name,memberId:member?.id,date:todayKey(),note:"New time entry",hours:1}); if(!save())return; render("timesheets"); showToast("A 1-hour draft entry was added.");
    }
    if (event.target.closest("#add-client")) showToast("Client creation is ready for your CRM connection.");
    if (event.target.closest("#new-quote")) {
      const next = Math.max(...state.quotes.map(q => Number(q.id.split("-")[1]))) + 1;
      state.quotes.unshift({id:`QT-${next}`,title:"Untitled project scope",client:state.jobs[0]?.client||"Client XXXX",value:0,date:"2026-09-04",valid:"2026-09-25",status:"Draft"});
      if(!save())return; render("quotes"); showToast(`Quote QT-${next} created as a draft.`);
    }
    if (event.target.closest("#new-invoice")) {
      const next = Math.max(...state.invoices.map(i => Number(i.id.split("-")[1]))) + 1;
      const job = workingJobs()[0];
      state.invoices.unshift({id:`INV-${next}`,client:job.client,job:job.name,value:Math.max(1000,job.budget-job.billed),issued:"2026-09-04",due:"2026-09-18",status:"Draft"});
      if(!save())return; render("invoices"); showToast(`Invoice INV-${next} created from unbilled work.`);
    }
    if (event.target.closest("#assign-capacity")) openAllocationModal();
    const assignTask = event.target.closest(".assign-task");
    if (assignTask) openAllocationModal(assignTask.dataset.taskId);
    if (event.target.closest("#add-time-off")) openTimeOffModal();
    if (event.target.closest("#capacity-settings")) openCapacitySettings();
    const scheduleModeButton = event.target.closest("[data-schedule-mode]");
    if (scheduleModeButton) { scheduleMode = scheduleModeButton.dataset.scheduleMode; render("schedule"); }
    if (event.target.closest("#timeline-columns")) openScheduleColumns();
    if (event.target.closest("#add-schedule-item")) openScheduleItemModal();
    const deleteTimeline=event.target.closest("[data-delete-timeline]");
    if(deleteTimeline){
      const result=deleteJobWorkItem(deleteTimeline.dataset.project,deleteTimeline.dataset.deleteTimeline);if(!result)return;$("#audit-panel")?.remove();render(currentView);if(currentView==="jobs")openJob(result.job.id,"phases");showToast(`${result.item.name} deleted with its child content.`);
    }
    const toggleProject = event.target.closest("[data-toggle-project]");
    if (toggleProject) {
      const project = state.timeline.projects.find(item=>item.jobId===toggleProject.dataset.toggleProject);
      project.expanded = !project.expanded; if(!save())return; render("schedule");
    }
    const resizeTimeline = event.target.closest("[data-gantt-resize]");
    if (resizeTimeline) {
      event.stopPropagation();
      const found = findTimelineItem(resizeTimeline.dataset.ganttProjectId,resizeTimeline.dataset.ganttItemId);
      if (!found.item) return;
      const oldDuration = found.item.duration;
      const nextDuration=Math.max(1,oldDuration+Number(resizeTimeline.dataset.ganttResize));
      if(nextDuration===oldDuration)return;
      if(!window.confirm(`Change “${found.item.name}” duration from ${oldDuration} to ${nextDuration} days?`))return;
      found.item.duration = nextDuration;
      if (found.item.type === "phase") shiftDependentItems(found.project,found.item.id,found.item.duration-oldDuration);
      found.project.items.forEach(updateDependencyRisk);recordScheduleHistory(getJob(found.project.jobId),"Changed duration",found.item,found.project,`${oldDuration} day${oldDuration===1?"":"s"}`,`${found.item.duration} day${found.item.duration===1?"":"s"}`);if(!save())return; render("schedule"); showToast(`${found.item.name} now spans ${found.item.duration} day${found.item.duration===1?"":"s"}.`);
    }
    const shiftTimeline = event.target.closest("[data-gantt-shift]");
    if (shiftTimeline) {
      event.stopPropagation();
      const found = findTimelineItem(shiftTimeline.dataset.ganttProjectId,shiftTimeline.dataset.ganttItemId);
      if (!found.item) return;
      const delta = Number(shiftTimeline.dataset.ganttShift);
      const oldDate=dateFromTimelineDay(found.item.start),newDate=dateFromTimelineDay(found.item.start+delta);
      if(!window.confirm(`Move “${found.item.name}” from ${shortDate(oldDate)} to ${shortDate(newDate)}?`))return;
      found.item.start = found.item.start+delta;
      if (found.item.type === "phase") shiftDependentItems(found.project,found.item.id,delta);
      updateDependencyRisk(found.item);found.project.items.forEach(updateDependencyRisk);recordScheduleHistory(getJob(found.project.jobId),"Moved date",found.item,found.project,shortDate(oldDate),shortDate(newDate));if(!save())return; render("schedule"); showToast(`${found.item.name} rescheduled by one day.`);
    }
    const weekButton = event.target.closest("[data-capacity-week]");
    if (weekButton) { capacityWeekOffset += Number(weekButton.dataset.capacityWeek); render("schedule"); }
    if (event.target.closest("[data-capacity-today]")) { capacityWeekOffset = Math.floor((timelineDay(todayKey())-6)/7); render("schedule"); }
    const adjust = event.target.closest("[data-adjust-allocation]");
    if (adjust) {
      event.stopPropagation();
      const found = findAllocation(adjust.dataset.memberId, adjust.dataset.allocationId);
      if (!found.allocation) return;
      const requested = Number(adjust.dataset.adjustAllocation);
      const queued = state.capacity.unassigned.find(item => item.title === found.allocation.title && item.task === found.allocation.task && item.client === found.allocation.client);
      const delta = requested > 0 && queued ? Math.min(requested, queued.remaining) : requested;
      const nextHours = Math.max(.5, found.allocation.hours + delta);
      const actualDelta = nextHours - found.allocation.hours;
      found.allocation.hours = nextHours;
      if (queued) { queued.remaining = Math.max(0, queued.remaining - actualDelta); queued.planned = Math.max(0, queued.planned + actualDelta); }
      if(!save())return; render("schedule"); showToast(`Allocation updated to ${nextHours}h.`);
    }
    const removeAllocation = event.target.closest("[data-remove-allocation]");
    if (removeAllocation) {
      event.stopPropagation();
      const found = findAllocation(removeAllocation.dataset.memberId, removeAllocation.dataset.removeAllocation);
      if (!found.allocation) return;
      returnAllocationToQueue(found.allocation);
      found.member.allocations = found.member.allocations.filter(item => item.id !== found.allocation.id);
      if(!save())return; render("schedule"); showToast("Work returned to the unassigned queue.");
    }
  });

  document.addEventListener("change", event => {
    if (event.target.matches("#job-status")) { jobFilter = event.target.value; render("jobs"); }
    if(event.target.matches("#job-template-filter")) {jobTemplateFilter=event.target.value;render("jobs");}
    if (event.target.matches("#calendar-event-filter")) { calendarEventFilter=event.target.value; render("jobs"); }
    if (event.target.matches("#board-department")) { boardDepartmentFilter=event.target.value; render("jobs"); }
    if (event.target.matches("#board-step")) { boardStepFilter=event.target.value; render("jobs"); }
    if (event.target.matches("#capacity-team")) { capacityFilters.team = event.target.value; render("schedule"); }
    if (event.target.matches("#capacity-client")) { capacityFilters.client = event.target.value; render("schedule"); }
    if (event.target.matches("#capacity-color")) { state.capacity.settings.colorMode = event.target.value; if(!save())return; render("schedule"); }
    if (event.target.matches("#timeline-group")) { timelineGroup = event.target.value; render("schedule"); }
    if (event.target.matches("#timeline-owner")) { timelineFilters.owner = event.target.value; render("schedule"); }
    if (event.target.matches("#timeline-status")) { timelineFilters.status = event.target.value; render("schedule"); }
    if (event.target.matches("#timeline-department")) { timelineFilters.department=event.target.value; render("schedule"); }
    if (event.target.matches("#schedule-project")) populateScheduleDependencies(event.target.value);
    if (event.target.matches("[data-timeline-owner]")) {
      const item = state.timeline.projects.flatMap(project=>project.items).find(candidate=>candidate.id===event.target.dataset.timelineOwner);
      if (item) {const previous=item.owner,project=state.timeline.projects.find(p=>p.items.includes(item));if(previous===event.target.value)return;if(!window.confirm(`Reassign “${item.name}” from ${previous} to ${event.target.value}?`)){render("schedule");return;}item.owner=event.target.value;if(project)recordScheduleHistory(getJob(project.jobId),"Changed owner",item,project,previous,item.owner);if(!save())return;showToast(`${item.name} reassigned to ${item.owner}.`);}
    }
    if (event.target.matches("[data-timeline-progress]")) {
      const item = state.timeline.projects.flatMap(project=>project.items).find(candidate=>candidate.id===event.target.dataset.timelineProgress);
      if (item) {
        const previous=item.progress,next=Number(event.target.value),project=state.timeline.projects.find(project=>project.items.some(candidate=>candidate.id===item.id));
        if(previous===next)return;
        if(!window.confirm(`Change “${item.name}” progress from ${previous}% to ${next}%?`)){render("schedule");return;}
        item.progress = next;
        item.status = item.progress === 100 ? "Complete" : item.progress > 0 ? "In progress" : "Planned";
        updateDependencyRisk(item);
        if (project) {if(item.type==="phase")project.items.filter(i=>i.parentPhaseId===item.id).forEach(i=>{i.progress=item.progress;i.status=item.status;});syncProjectProgress(project);recordScheduleHistory(getJob(project.jobId),"Changed progress",item,project,`${previous}%`,`${next}%`);}
        if(!save())return; render("schedule"); showToast(`${item.name} progress updated to ${item.progress}%.`);
      }
    }
    if (event.target.matches(".task-check")) {
      const job = getJob(event.target.dataset.jobId);
      const taskIndex = Number(event.target.dataset.task);
      const timelineTask = state.timeline.projects.flatMap(project => project.items).find(item => item.id === event.target.dataset.timelineTask);
      if(!job||!timelineTask)return;const previous=timelineTask.progress===100,next=event.target.checked;
      if(previous===next)return;
      if(!window.confirm(`${next?"Mark":"Reopen"} task “${timelineTask.name}”${next?" as complete":""}?`)){event.target.checked=previous;return;}
      if (job.tasks[taskIndex]) job.tasks[taskIndex][1] = event.target.checked;
      if (timelineTask) {
        timelineTask.progress = event.target.checked ? 100 : 0;
        timelineTask.status = event.target.checked ? "Complete" : "Planned";
      }
      syncProjectProgress(state.timeline.projects.find(p=>p.jobId===job.id));
      auditHistory(job,{source:"job",action:next?"Completed task":"Reopened task",entityType:"task",entityName:timelineTask.name,phaseName:schedulePhase(state.timeline.projects.find(p=>p.jobId===job.id),timelineTask)?.name||"",oldValue:previous?"Complete":"Not complete",newValue:next?"Complete":"Not complete",text:`${currentStaffName()} ${next?"completed":"reopened"} task “${timelineTask.name}”.`});
      if(!save())return; render(currentView); openJob(job.id,activeJobTab); showToast("Task progress updated.");
    }
    if(event.target.matches("[data-subtask-check]")){
      const {job,project,task}=findJobTask(event.target.dataset.jobId,event.target.dataset.taskId),subtask=task?.subtasks.find(item=>item.id===event.target.dataset.subtaskCheck);if(!job||!subtask)return;const previous=subtask.completed,next=event.target.checked;if(previous===next)return;if(!window.confirm(`${next?"Mark":"Reopen"} sub-task “${subtask.name}”${next?" as complete":""}?`)){event.target.checked=previous;return;}subtask.completed=next;auditHistory(job,{source:"job",action:next?"Completed sub-task":"Reopened sub-task",entityType:"sub-task",entityName:subtask.name,phaseName:schedulePhase(project,task)?.name||"",oldValue:previous?"Complete":"Not complete",newValue:subtask.completed?"Complete":"Not complete",text:`${currentStaffName()} ${next?"completed":"reopened"} sub-task “${subtask.name}”.`});if(!save())return;render(currentView);openJob(job.id,"phases");
    }
    if(event.target.matches("[data-work-check]")){
      const {job,project,task}=findJobTask(event.target.dataset.jobId,event.target.dataset.taskId),parent=event.target.dataset.subtaskId?task?.subtasks.find(item=>item.id===event.target.dataset.subtaskId):task,item=parent?.checklist.find(check=>check.id===event.target.dataset.workCheck);if(!job||!item)return;const previous=item.completed,next=event.target.checked;if(previous===next)return;if(!window.confirm(`${next?"Check":"Uncheck"} checklist item “${item.text}”?`)){event.target.checked=previous;return;}item.completed=next;auditHistory(job,{source:"job",action:next?"Checked checklist item":"Unchecked checklist item",entityType:"checklist",entityName:item.text,phaseName:schedulePhase(project,task)?.name||"",oldValue:previous?"Checked":"Unchecked",newValue:item.completed?"Checked":"Unchecked",text:`${currentStaffName()} ${next?"checked":"unchecked"} checklist item “${item.text}”.`});if(!save())return;render(currentView);openJob(job.id,"phases");
    }
  });

  document.addEventListener("input", event => {
    if(event.target.matches("[data-search-picker]")) {
      const kind=event.target.dataset.searchPicker,value=event.target.value;
      if(kind==="jobs")jobQuery=value;else if(kind==="schedule")timelineFilters.clientQuery=value;else if(kind==="capacity")capacityQuery=value;else if(kind==="clients")clientQuery=value;else if(kind==="quotes")quoteQuery=value;else if(kind==="staff")staffQuery=value;else {const key=kind.replace("dashboard-","");if(dashboardSectionFilters[key])dashboardSectionFilters[key].query=value;}
      renderSearchPickerSuggestions(kind,value);
    }
    if (event.target.matches("#board-client-search")) { boardClientQuery=event.target.value; renderBoardClientSuggestions(boardClientQuery); }
    if (event.target.matches("#global-search")) renderSearch(event.target.value);
    if (event.target.matches("[data-timeline-progress]")) {
      const item = state.timeline.projects.flatMap(project=>project.items).find(candidate=>candidate.id===event.target.dataset.timelineProgress);
      if (item) { event.target.nextElementSibling.textContent = `${Number(event.target.value)}%`; }
    }
  });

  document.addEventListener("pointerover",event=>{
    const button=event.target.closest("[data-calendar-tooltip]");
    if (button) showCalendarTooltip(button,event);
  });
  document.addEventListener("pointermove",event=>{
    const button=event.target.closest("[data-calendar-tooltip]");
    const tooltip=$("#calendar-tooltip");
    if (button && tooltip && !tooltip.hidden) positionCalendarTooltip(tooltip,event);
  });
  document.addEventListener("pointerout",event=>{
    const button=event.target.closest("[data-calendar-tooltip]");
    if (button && !button.contains(event.relatedTarget)) { const tooltip=$("#calendar-tooltip"); if(tooltip)tooltip.hidden=true; }
  });

  document.addEventListener("keydown", event => {
    if(event.target.matches("[data-search-picker]")&&event.key==="Enter"){
      const kind=event.target.dataset.searchPicker,first=searchPickerMatches(kind,event.target.value)[0];
      if(first){event.preventDefault();applySearchPicker(kind,first.value,first.label);}return;
    }
    if (event.target.matches("#board-client-search") && event.key==="Enter") {
      const first=boardClientMatches(event.target.value)[0];
      if (first) { event.preventDefault(); selectBoardClient(first.client); render("jobs"); }
      return;
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openModal("#search-modal"); renderSearch(); }
    if (event.key === "Escape") { $$(".modal-backdrop").forEach(modal => modal.hidden = true); closeDrawer(); }
    const row = event.target.closest("tr[data-job]");
    if (row && event.target===row && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); openJob(row.dataset.job); }
  });

  document.addEventListener("dragstart", event => {
    const timelineTask = event.target.closest("[data-gantt-task]");
    if (timelineTask) {
      event.dataTransfer.setData("application/x-jobflow-timeline-task",JSON.stringify({projectId:timelineTask.dataset.ganttProjectId,itemId:timelineTask.dataset.ganttTask}));
      event.dataTransfer.effectAllowed = "move";
      return;
    }
    const timelineProject = event.target.closest("[data-gantt-project-bar]");
    if (timelineProject) {
      event.dataTransfer.setData("application/x-jobflow-timeline-project",timelineProject.dataset.ganttProjectBar);
      event.dataTransfer.effectAllowed = "move";
      return;
    }
    const allocation = event.target.closest(".allocation-card");
    if (allocation) {
      event.dataTransfer.setData("application/x-jobflow-allocation", JSON.stringify({allocationId:allocation.dataset.allocation,memberId:allocation.dataset.member}));
      event.dataTransfer.effectAllowed = "move";
      return;
    }
    const unassigned = event.target.closest(".unassigned-task");
    if (unassigned) {
      event.dataTransfer.setData("application/x-jobflow-task", unassigned.dataset.unassigned);
      event.dataTransfer.effectAllowed = "copyMove";
      return;
    }
    const card = event.target.closest(".job-card");
    if (!card) return;
    event.dataTransfer.setData("text/plain", card.dataset.job);
    event.dataTransfer.effectAllowed = "move";
  });

  document.addEventListener("dragover", event => {
    const track = event.target.closest(".gantt-track");
    if (track) { event.preventDefault(); track.classList.add("drag-over"); }
    const cell = event.target.closest(".capacity-cell");
    if (cell) { event.preventDefault(); cell.classList.add("drag-over"); }
    if (event.target.closest(".kanban-column")) event.preventDefault();
  });

  document.addEventListener("dragleave", event => {
    const track = event.target.closest(".gantt-track");
    if (track && !track.contains(event.relatedTarget)) track.classList.remove("drag-over");
    const cell = event.target.closest(".capacity-cell");
    if (cell && !cell.contains(event.relatedTarget)) cell.classList.remove("drag-over");
  });

  document.addEventListener("drop", event => {
    const track = event.target.closest(".gantt-track");
    if (track) {
      event.preventDefault(); track.classList.remove("drag-over");
      const rect = track.getBoundingClientRect();
      const visibleDays=timelineVisibleDays();
      const targetDay = timelineOffset + Math.max(0,Math.min(visibleDays-1,Math.floor((event.clientX-rect.left)/rect.width*visibleDays)));
      const taskRaw = event.dataTransfer.getData("application/x-jobflow-timeline-task");
      if (taskRaw) {
        const moved = JSON.parse(taskRaw);
        const found = findTimelineItem(moved.projectId,moved.itemId);
        if (!found.item) return;
        const delta = targetDay-found.item.start;
        if(!delta)return;
        const oldDate=dateFromTimelineDay(found.item.start),newDate=dateFromTimelineDay(targetDay);
        if(!window.confirm(`Move “${found.item.name}” from ${shortDate(oldDate)} to ${shortDate(newDate)}?`))return;
        found.item.start = targetDay;
        if (found.item.type === "phase") shiftDependentItems(found.project,found.item.id,delta);
        updateDependencyRisk(found.item);
        found.project.items.forEach(updateDependencyRisk);
        recordScheduleHistory(getJob(found.project.jobId),"Moved date",found.item,found.project,shortDate(oldDate),shortDate(newDate));if(!save())return; render("schedule"); showToast(`${found.item.name} moved to ${shortDate(newDate)}.`);
        return;
      }
      const projectId = event.dataTransfer.getData("application/x-jobflow-timeline-project");
      if (projectId) {
        const project = state.timeline.projects.find(item=>item.jobId===projectId);
        if (!project) return;
        const job=getJob(projectId);
        const firstDay = timelineDay(job.start);
        const delta = targetDay-firstDay;
        if(!delta)return;
        const oldDates=`${shortDate(job.start)}–${shortDate(job.due)}`,nextStart=dateFromTimelineDay(timelineDay(job.start)+delta),nextDue=dateFromTimelineDay(timelineDay(job.due)+delta),newDates=`${shortDate(nextStart)}–${shortDate(nextDue)}`;
        if(!window.confirm(`Shift job “${job.name}” from ${oldDates} to ${newDates}?`))return;
        job.start=nextStart;job.due=nextDue;
        project.items.forEach(item=>{item.start=item.start+delta;});
        project.items.forEach(updateDependencyRisk);
        recordScheduleHistory(job,"Shifted job dates",null,project,oldDates,newDates);if(!save())return; render("schedule"); showToast(`${getJob(projectId)?.name || projectId} shifted by ${Math.abs(delta)} day${Math.abs(delta)===1?"":"s"}.`);
        return;
      }
    }
    const cell = event.target.closest(".capacity-cell");
    if (cell) {
      event.preventDefault();
      cell.classList.remove("drag-over");
      const targetMember = state.capacity.members.find(item => item.id === cell.dataset.capacityMember);
      const targetDay = Number(cell.dataset.capacityDay);
      if(!targetMember?.workDays[targetDay]){showToast("This member does not work on this day.");return;}
      const taskId = event.dataTransfer.getData("application/x-jobflow-task");
      if (taskId) { assignCapacityTask(taskId, targetMember.id, targetDay, 4); return; }
      const raw = event.dataTransfer.getData("application/x-jobflow-allocation");
      if (raw) {
        const moved = JSON.parse(raw);
        const source = findAllocation(moved.memberId, moved.allocationId);
        if (!source.allocation || !targetMember) return;
        source.member.allocations = source.member.allocations.filter(item => item.id !== source.allocation.id);
        source.allocation.day = targetDay;
        source.allocation.weekOffset = capacityWeekOffset;
        targetMember.allocations.push(source.allocation);
        if(!save())return; render("schedule"); showToast(`${source.allocation.task} reassigned to ${targetMember.name}.`);
        return;
      }
    }
    const column = event.target.closest(".kanban-column");
    if (!column) return;
    event.preventDefault();
    const job = getJob(event.dataTransfer.getData("text/plain"));
    if (!job) return;
    moveBoardJob(job,column.dataset.status);
  });

  document.addEventListener("submit", event => {
    if (event.target.matches("#job-info-form")) {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.target));
      const job = getJob(data.jobId);
      if (!job) return;
      if (!data.start || !data.due || data.due < data.start) {
        showToast("Due date must be on or after the start date.");
        return;
      }
      const project=ensureJobPhaseHierarchy(job);
      const shift=timelineDay(data.start)-timelineDay(job.start);
      const oldDue=job.due;
      if(shift)project.items.forEach(i=>{i.start+=shift;});
      project.items.filter(i=>i.type==="milestone" && dateFromTimelineDay(i.start-shift)===oldDue && /final|handoff|closeout|delivery|submission/i.test(i.name)).forEach(i=>i.start=timelineDay(data.due));
      auditHistory(job);
      ["client","clientSize","contact","name","owner","priority","orderNo","start","due","startReminder","deadlineReviewDate","template","description"].forEach(field=>{job[field]=data[field];});
      job.recurring=Boolean(data.recurring);
      job.recurringCadence=job.recurring?(data.recurringCadence||job.recurringCadence||"Monthly"):"";
      job.nextOccurrence=job.recurring?(data.nextOccurrence||job.nextOccurrence||job.start):"";
      if(data.budget!=null)job.budget=Number(data.budget);if(data.spent!=null)job.spent=Number(data.spent);if(data.billed!=null)job.billed=Number(data.billed);if(data.costRate!=null)job.costRate=Number(data.costRate);
      if(!job.team.includes(job.owner))job.team.unshift(job.owner);
      job.history.unshift({id:`history-${Date.now()}`,date:new Date().toLocaleString(),timestamp:Date.now(),text:`${currentStaffName()} updated job information.`});
      if(!save())return; openJob(job.id,"information"); render(currentView); showToast("Job information saved.");
    }
    if (event.target.matches("#job-note-form")) {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.target));
      const job = getJob(data.jobId);
      if (!job) return;
      job.notes.unshift({id:`note-${Date.now()}`,author:currentStaffName(),date:new Date().toLocaleString(),timestamp:Date.now(),text:data.note});
      job.history.unshift({id:`history-${Date.now()}`,date:new Date().toLocaleString(),timestamp:Date.now(),text:`${currentStaffName()} added a job note.`});
      if(!save())return; openJob(job.id,"notes"); showToast("Note added to the job.");
    }
    if (event.target.matches("#edit-note-form")) {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.target));
      const job = getJob(data.jobId),note=job?.notes.find(item=>item.id===data.noteId),nextText=String(data.note||"").trim();
      if(!job||!note||!nextText)return;
      const previousText=note.text;if(nextText===previousText){$("#audit-panel")?.remove();openJob(job.id,"notes");return;}
      note.text=nextText;note.editedAt=new Date().toLocaleString();
      auditHistory(job,{source:"job",action:"Edited note",entityType:"note",entityName:note.id,oldValue:previousText,newValue:nextText,text:`${currentStaffName()} edited a note in ${job.id}.`});
      if(!save())return;$("#audit-panel")?.remove();openJob(job.id,"notes");render(currentView);showToast("Note updated.");
    }
    if(event.target.matches("#job-task-detail-form")){
      event.preventDefault();const data=Object.fromEntries(new FormData(event.target)),{job,project,task}=findJobTask(data.jobId,data.taskId);if(!job||!task)return;
      if(data.due<dateFromTimelineDay(task.start)||data.due>job.due){showToast("Task deadline must be between its start date and the job due date.");return;}
      const nextName=data.name.trim(),nextHours=Number(data.hours);if(!nextName||!Number.isFinite(nextHours)||nextHours<=0){showToast("Enter a task name and positive estimated hours.");return;}
      const before=`${task.name} · ${task.owner} · ${task.due}`,row=job.tasks.find(item=>item[3]===task.id);task.name=nextName;task.owner=data.owner;task.due=data.due;task.duration=Math.max(1,timelineDay(data.due)-task.start+1);task.estimatedHours=nextHours;if(row){row[0]=task.name;row[2]=`${task.estimatedHours}h`;}
      auditHistory(job,{source:"job",action:"Updated task",entityType:"task",entityName:task.name,phaseName:schedulePhase(project,task)?.name||"",oldValue:before,newValue:`${task.name} · ${task.owner} · ${task.due}`,text:`${currentStaffName()} updated task “${task.name}” in ${job.id}.`});if(!save())return;$("#audit-panel")?.remove();render(currentView);openJob(job.id,"phases");showToast("Task updated.");
    }
    if(event.target.matches("#subtask-form")){
      event.preventDefault();const data=Object.fromEntries(new FormData(event.target)),{job,project,task}=findJobTask(data.jobId,data.taskId);if(!job||!task)return;
      if(data.due<dateFromTimelineDay(task.start)||data.due>job.due){showToast("Sub-task deadline must be between the task start and job due date.");return;}
      data.name=data.name.trim();if(!data.name){showToast("Enter a sub-task name.");return;}
      let subtask=task.subtasks.find(item=>item.id===data.subtaskId),action="Updated sub-task",before=subtask?`${subtask.name} · ${subtask.owner} · ${subtask.due}`:"Not present";
      if(subtask)Object.assign(subtask,{name:data.name,owner:data.owner,due:data.due});else{action="Added sub-task";subtask={id:crypto.randomUUID(),name:data.name,owner:data.owner,due:data.due,completed:false,checklist:[]};task.subtasks.push(subtask);}
      auditHistory(job,{source:"job",action,entityType:"sub-task",entityName:subtask.name,phaseName:schedulePhase(project,task)?.name||"",oldValue:before,newValue:`${subtask.name} · ${subtask.owner} · ${subtask.due}`,text:`${currentStaffName()} ${action.toLowerCase()} “${subtask.name}” under task “${task.name}”.`});if(!save())return;$("#audit-panel")?.remove();render(currentView);openJob(job.id,"phases");showToast(action==="Added sub-task"?"Sub-task added.":"Sub-task updated.");
    }
    if(event.target.matches("#checklist-item-form")){
      event.preventDefault();const data=Object.fromEntries(new FormData(event.target)),{job,project,task}=findJobTask(data.jobId,data.taskId);if(!job||!task)return;const parent=data.subtaskId?task.subtasks.find(item=>item.id===data.subtaskId):task,text=String(data.text||"").trim();if(!parent||!text)return;
      let item=parent.checklist.find(check=>check.id===data.checklistId),action="Edited checklist item",oldValue=item?.text||"Not present";if(item)item.text=text;else{action="Added checklist item";item={id:crypto.randomUUID(),text,completed:false};parent.checklist.push(item);}auditHistory(job,{source:"job",action,entityType:data.subtaskId?"sub-task checklist":"task checklist",entityName:text,phaseName:schedulePhase(project,task)?.name||"",oldValue,newValue:text,text:`${currentStaffName()} ${action.toLowerCase()} under “${data.subtaskId?parent.name:task.name}”.`});if(!save())return;$("#audit-panel")?.remove();render(currentView);openJob(job.id,"phases");showToast(action==="Added checklist item"?"Checklist item added.":"Checklist item updated.");
    }
    if (event.target.matches("#job-document-form")) {
      event.preventDefault();
      const data = new FormData(event.target);
      const job = getJob(data.get("jobId"));
      const file = data.get("document");
      if (!job || !file?.name) return;
      const size = file.size < 1048576 ? `${Math.max(1,Math.round(file.size/1024))} KB` : `${(file.size/1048576).toFixed(1)} MB`;
      job.documents.unshift({id:`doc-${Date.now()}`,name:file.name,type:"Uploaded file",added:"Sep 4, 2026",size});
      job.history.unshift({id:`history-${Date.now()}`,date:new Date().toLocaleString(),timestamp:Date.now(),text:`${file.name} added to documents.`});
      if(!save())return; openJob(job.id,"documents"); showToast(`${file.name} added.`);
    }
  });

  $("#job-form").addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    let newJob;
    try { newJob=createJobFromTemplate(data); }
    catch(error) { showToast(error.message); return; }
    if(!save())return; closeModal($("#job-modal")); event.target.reset(); render("jobs"); showToast(`${data.name} was created.`);
  });

  $("#allocation-form").addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    closeModal($("#allocation-modal"));
    assignCapacityTask(data.task, data.member, data.day, data.hours);
  });

  $("#time-off-form").addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const member = state.capacity.members.find(item => item.id === data.member);
    member.leaves.push({id:`leave-${Date.now()}`,day:Number(data.day),weekOffset:capacityWeekOffset,hours:Number(data.hours),reason:data.reason});
    if(!save())return; closeModal($("#time-off-modal")); render("schedule"); showToast(`${data.reason} added for ${member.name}.`);
  });

  $("#capacity-settings-form").addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const under = Number(data.under), over = Number(data.over);
    if (under >= over) { showToast("The overloaded threshold must be higher than the under-utilised threshold."); return; }
    state.capacity.settings = {under,over,colorMode:data.colorMode};
    state.capacity.members.forEach(member => { member.weeklyHours = Number(data[`hours-${member.id}`]); });
    if(!save())return; closeModal($("#capacity-settings-modal")); render("schedule"); showToast("Capacity rules and working hours updated.");
  });

  $("#phase-form").addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const job = getJob(data.jobId);
    if (!job) return;
    const project = ensureJobPhaseHierarchy(job);
    const phase = {
      id:`tl-phase-${Date.now()}`, name:data.name, type:"phase", owner:data.owner,
      start:timelineDay(data.start), duration:Number(data.duration), progress:0,
      status:"Planned", dependency:""
    };
    project.items.push(phase);
    project.items.sort((a,b) => a.start - b.start || (a.type === "phase" ? -1 : 1));
    job.history.unshift({id:`history-${Date.now()}`,date:new Date().toLocaleString(),timestamp:Date.now(),text:`Phase “${data.name}” was created.`});
    if(!save())return; closeModal($("#phase-modal")); event.target.reset(); openJob(job.id,"phases"); showToast(`${data.name} phase created.`);
  });

  $("#phase-task-form").addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const job = getJob(data.jobId);
    if (!job) return;
    const project = ensureJobPhaseHierarchy(job);
    const phase = project.items.find(item => item.id === data.phaseId && item.type === "phase");
    if (!phase) return;
    const hours = Number(data.hours);
    if(data.due<dateFromTimelineDay(phase.start)||data.due>job.due){showToast("Task deadline must be within the phase start and job due date.");return;}
    const task = {
      id:`tl-task-${Date.now()}`, name:data.name, type:"task", owner:data.owner,
      start:phase.start, due:data.due, duration:Math.max(1,timelineDay(data.due)-phase.start+1), estimatedHours:hours, progress:0,
      status:"Planned", dependency:"", parentPhaseId:phase.id,subtasks:[],checklist:[]
    };
    project.items.push(task);
    job.tasks.push([data.name,false,`${hours}h`,task.id]);
    job.history.unshift({id:`history-${Date.now()}`,date:new Date().toLocaleString(),timestamp:Date.now(),text:`Task “${data.name}” was added to phase “${phase.name}”.`});
    if(!save())return; closeModal($("#phase-task-modal")); event.target.reset(); openJob(job.id,"phases"); showToast(`${data.name} added to ${phase.name}.`);
  });

  $("#milestone-form").addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const job = getJob(data.jobId);
    if (!job) return;
    job.milestones.push([data.name,data.date]);
    job.milestones.sort((a,b) => new Date(`${a[1]}T12:00:00`) - new Date(`${b[1]}T12:00:00`));
    const project = ensureJobPhaseHierarchy(job);
    project.items.push({
      id:`tl-milestone-${Date.now()}`, name:data.name, type:"milestone", owner:job.owner,
      start:timelineDay(data.date), duration:1, progress:0, status:"Planned", dependency:""
    });
    project.items.sort((a,b) => a.start - b.start || (a.type === "milestone" ? 1 : -1));
    job.history.unshift({id:`history-${Date.now()}`,date:new Date().toLocaleString(),timestamp:Date.now(),text:`Milestone “${data.name}” was added for ${shortDate(data.date)}.`});
    if(!save())return; closeModal($("#milestone-modal")); event.target.reset(); openJob(job.id,"milestones"); showToast(`${data.name} milestone added.`);
  });

  $("#schedule-item-form").addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const project = state.timeline.projects.find(item=>item.jobId===data.project);
    if(!project)return;
    const job=getJob(project.jobId),phase=data.type==="task"?project.items.find(i=>i.id===data.parentPhaseId&&i.type==="phase")||project.items.find(i=>i.type==="phase"):null;
    if(!window.confirm(`Add ${data.type} “${data.name}” to ${job?.id||data.project}${phase?` under phase “${phase.name}”`:""} starting ${shortDate(data.start)}?`))return;
    const base = new Date("2026-09-01T00:00:00");
    const start = Math.round((new Date(`${data.start}T00:00:00`)-base)/86400000);
    const parentPhase = phase;
    const item = {id:`tl-${Date.now()}`,name:data.name,type:data.type,owner:data.owner,start,duration:data.type==="milestone"?1:Number(data.duration),progress:0,status:"Planned",dependency:data.dependency,parentPhaseId:parentPhase?.id || ""};
    project.items.push(item); project.items.sort((a,b)=>a.start-b.start);
    if (item.type === "milestone") job?.milestones.push([item.name,data.start,item.id]);
    if (item.type === "task") job?.tasks.push([item.name,false,`${item.duration*8}h`,item.id]);
    recordScheduleHistory(job,`Added ${item.type}`,item,project,"Not present",scheduleItemSummary(item,project));if(!save())return; closeModal($("#schedule-item-modal")); event.target.reset(); render("schedule"); showToast(`${item.name} added to the project schedule.`);
  });

  $("#schedule-columns-form").addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    state.timeline.columns = {owner:Boolean(data.owner),status:Boolean(data.status),progress:Boolean(data.progress)};
    if(!save())return; closeModal($("#schedule-columns-modal")); render("schedule"); showToast("Timeline columns updated.");
  });

  $$(".modal-backdrop").forEach(modal => modal.addEventListener("mousedown", event => { if (event.target === modal) closeModal(modal); }));

  seedJobTemplates();
  const seededBoardViews=seedBoardViews();
  state.jobTemplates.forEach(normalizeTemplateDetail);
  const seededDemoData=seedWorkforceAndJobs();
  const maskedDemoNames=anonymizeStateNames();
  const migratedRecurringJobs=migrateRecurringRecords();
  state.capacity.members.forEach(m=>{m.status??='active';m.email??='';});
  syncRelations();
  refreshStaffSelects();
  refreshClientSelects();
  if(window.JOBFLOW_CLOUD) {
    lastSavedState=JSON.stringify(state);
    window.JOBFLOW_CLOUD.onSaved=payload=>{
      if(!payload)return;
      state=structuredClone(payload);
      state.capacity.members.forEach(m=>{m.status??='active';m.email??='';});
      syncRelations();lastSavedState=JSON.stringify(state);render();
      if(activeJobId&&$('#detail-drawer').classList.contains('open'))openJob(activeJobId,activeJobTab);
    };
  }
  else if(seededBoardViews||seededDemoData||maskedDemoNames||migratedRecurringJobs)save();else lastSavedState=JSON.stringify(state);
  render();
})();
