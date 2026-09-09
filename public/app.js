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
  state.capacity.members.forEach((member,index)=>{member.staffId??=`HAN${String(index+1).padStart(3,"0")}`;member.targetUtilization??=80;});
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
  const currentStaffName = () => window.JOBFLOW_CLOUD?.email || state.capacity.members[0]?.name || "User";
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
      return sectionMatch && filterMatch && quickMatch && searchMatch && clientMatch && boardMatch;
    });
  }

  function jobDepartment(job) {
    const names=[job.owner,...(job.team||[])];
    return names.map(name=>state.capacity.members.find(member=>member.name===name||member.shortName===name)?.department).find(Boolean) || "Unassigned";
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
    const listTools = `<div class="toolbar job-toolbar"><div class="quick-filters">${[["all","All"],["starting","Starting soon"],["due","Due this week"],["overdue","Overdue"]].map(([key,label])=>`<button class="quick-filter ${jobQuickFilter===key?"active":""}" data-job-quick="${key}">${label}<span>${counts[key]}</span></button>`).join("")}</div>${searchControl}${clientFilterChip}${filterControls}<button class="button ghost" data-display-options>${icon("filter")}Display options</button><span class="toolbar-spacer"></span><span class="date-chip">${jobs.length} jobs</span></div>`;
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
      <div class="timesheet-grid"><section class="card"><div class="day-tabs">${[["Mon","7.5h"],["Tue","8h"],["Wed","7.25h"],["Thu","9h"],["Fri",`${logged.toFixed(2)}h`],["Sat","0h"],["Sun","0h"]].map((d,i)=>`<button class="day-tab ${i===4?"active":""}"><strong>${d[0]}</strong><small>${d[1]}</small></button>`).join("")}</div>
      <div id="time-list">${state.times.map((entry,i)=>`<div class="time-entry"><div><strong>${esc(entry.job)}</strong><small>${esc(entry.task)}</small></div><div><strong>${esc(entry.note)}</strong><small>${i === 2 ? "Non-billable" : "Billable"}</small></div><span class="hours">${entry.hours}h</span><button class="icon-btn" aria-label="Time entry options">${icon("more")}</button></div>`).join("")}</div><button class="button add-entry" id="quick-time">${icon("plus")}Add another entry</button></section>
      <aside class="card timer-card"><p class="eyebrow">Live timer</p><h2 id="timer-job">No timer running</h2><p id="timer-task">Select start to track your current task</p><div class="timer-clock" id="timer-clock">00:00:00</div><button class="button" id="timer-card-button">${icon("play")}Start timer</button></aside></div>`;
  }

  function clientData() {
    const colors = ["#2f6fce", "#0c9c8b", "#7556bd", "#d77b2d", "#456a78"];
    return [...new Set(state.jobs.map(job => job.client))].map((client, i) => {
      const jobs = state.jobs.filter(job => job.client === client);
      return { client, code: initials(client), active: jobs.filter(j => j.status !== "Complete").length, value: total(jobs,"budget"), outstanding: total(state.invoices.filter(inv => inv.client === client && inv.status !== "Paid"),"value"), color: colors[i % colors.length] };
    });
  }

  function renderClients() {
    const clients=clientData().filter(item=>!clientSearchSelection||item.client===clientSearchSelection);
    return `${pageHead("Relationships", "Clients", "Keep contacts, jobs, and commercial history together.", `<button class="button primary" id="add-client">${icon("plus")}New client</button>`)}
      <div class="toolbar">${searchPickerMarkup("clients","client-search",clientQuery,"Search clients…",clientSearchSelection?clientQuery:"")}<span class="toolbar-spacer"></span><span class="date-chip">${clients.length} of ${clientData().length} clients</span></div>
      <section class="client-grid">${clients.map(item => `<article class="card client-card"><div class="client-top"><span class="client-logo" style="--client-color:${item.color}">${item.code}</span><button class="icon-btn" aria-label="Client menu">${icon("more")}</button></div><h3>${esc(item.client)}</h3><p>Primary account · active since 2024</p><div class="client-stats"><div><span>Active jobs</span><strong>${item.active}</strong></div><div><span>Total value</span><strong>${money(item.value)}</strong></div></div>${item.outstanding ? `<div class="insight"><strong>${money(item.outstanding)} outstanding</strong>Across open invoices</div>` : ""}</article>`).join("")}</section>`;
  }

  function renderQuotes() {
    const quotes=state.quotes.filter(quote=>!quoteSearchSelection||quote.id===quoteSearchSelection);
    return `${pageHead("Pipeline", "Quotes", "Build clear scopes, track decisions, and convert approved work into jobs.", `<button class="button primary" id="new-quote">${icon("plus")}New quote</button>`)}
      <div class="toolbar">${searchPickerMarkup("quotes","quote-search",quoteQuery,"Search quotes…",quoteSearchSelection?quoteQuery:"")}<select class="filter-select"><option>All statuses</option><option>Draft</option><option>Sent</option><option>Accepted</option><option>Declined</option></select><span class="toolbar-spacer"></span><div class="date-chip">Pipeline ${money(total(state.quotes.filter(q=>q.status!=="Declined"),"value"))}</div></div>
      <section class="document-list">${quotes.map(quote => `<article class="document-row"><div><strong>${esc(quote.title)}</strong><small>${quote.id} · ${esc(quote.client)}</small></div><div><small>Value</small><strong>${money(quote.value)}</strong></div><div><small>Valid until</small><strong>${shortDate(quote.valid)}</strong></div><span class="status ${statusClass(quote.status)}">${quote.status}</span><button class="button ghost quote-action" data-quote="${quote.id}">${quote.status === "Accepted" ? "Create job" : quote.status === "Draft" ? "Edit" : "View"}</button></article>`).join("")}</section>`;
  }

  function renderInvoices() {
    const outstanding = total(state.invoices.filter(inv => inv.status !== "Paid"), "value");
    return `${pageHead("Finance", "Invoices", "Turn completed work into cash and stay ahead of overdue accounts.", `<button class="button primary" id="new-invoice">${icon("plus")}New invoice</button>`)}
      <section class="week-summary"><div class="summary-tile"><span>Outstanding</span><strong>${money(outstanding)}</strong></div><div class="summary-tile"><span>Overdue</span><strong>${money(total(state.invoices.filter(inv=>inv.status==="Overdue"),"value"))}</strong></div><div class="summary-tile"><span>Paid this month</span><strong>${money(total(state.invoices.filter(inv=>inv.status==="Paid"),"value"))}</strong></div><div class="summary-tile"><span>Average payment</span><strong>12 days</strong></div></section>
      <section class="document-list">${state.invoices.map(invoice => `<article class="document-row"><div><strong>${invoice.id}</strong><small>${esc(invoice.client)} · ${esc(invoice.job)}</small></div><div><small>Amount</small><strong>${money(invoice.value)}</strong></div><div><small>Due</small><strong>${shortDate(invoice.due)}</strong></div><span class="status ${statusClass(invoice.status)}">${invoice.status}</span><button class="button ghost invoice-action" data-invoice="${invoice.id}">${invoice.status === "Paid" ? "View" : "Mark paid"}</button></article>`).join("")}</section>`;
  }

  function renderReports() {
    const months = [{m:"Apr",r:68,c:44},{m:"May",r:74,c:49},{m:"Jun",r:62,c:45},{m:"Jul",r:86,c:54},{m:"Aug",r:79,c:51},{m:"Sep",r:92,c:57}];
    const jobs = workingJobs().slice(0,5).map(job => ({name:job.name, margin:Math.max(0, Math.round((job.budget-job.spent)/job.budget*100))})).sort((a,b)=>b.margin-a.margin);
    const marginWatch=jobs.at(-1);
    return `${pageHead("Insights", "Profitability", "See revenue, cost, utilisation, and job margin in one view.", `<select class="filter-select"><option>Last 6 months</option><option>This quarter</option><option>This year</option></select><button class="button ghost">Export report</button>`)}
      <section class="metrics">${metric("Revenue","$461k","+14.2%","vs prior period","chart","#0a8e80","#e4f7f4")}${metric("Gross profit","$168k","+9.7%","vs prior period","receipt","#376bd8","#eaf0ff")}${metric("Average margin","36.4%","+1.2%","vs target","briefcase","#7857c5","#f0ebfb")}${metric("Utilisation","81.6%","+3.5%","team average","clock","#d27a25","#fff2e4")}</section>
      <div class="report-grid"><section class="card chart-card"><div class="card-head"><div><h2>Revenue and cost</h2><p>Monthly performance, USD thousands</p></div><button class="icon-btn">${icon("more")}</button></div><div class="bar-chart">${months.map(x=>`<div class="bar-group"><div class="bar cost" style="height:${x.c}%" title="Cost $${x.c}k"></div><div class="bar" style="height:${x.r}%" title="Revenue $${x.r}k"></div><span class="bar-label">${x.m}</span></div>`).join("")}</div><div class="chart-legend"><span>Revenue</span><span class="cost">Cost</span></div></section>
      <section class="card"><div class="card-head"><div><h2>Job margin</h2><p>Current forecast by active job</p></div></div><div class="profit-list">${jobs.map(job=>`<div class="profit-row"><div class="profit-row-top"><strong>${esc(job.name)}</strong><strong>${job.margin}%</strong></div><div class="progress-track"><span style="width:${Math.min(100,job.margin*2)}%;background:${job.margin<25?"var(--orange)":"var(--teal)"}"></span></div></div>`).join("")}${marginWatch?`<div class="insight"><strong>Margin watch</strong>${esc(marginWatch.name)} currently has the lowest forecast margin at ${marginWatch.margin}%.</div>`:""}</div></section></div>`;
  }

  function empty(iconName, title, copy) {
    return `<div class="empty-state"><div class="empty-icon">${icon(iconName)}</div><h3>${title}</h3><p>${copy}</p></div>`;
  }

  let templateDraft = null;
  let templateDraftBaseline = null;
  let settingsSection = "templates";
  let clientQuery = "";
  let clientSearchSelection = "";
  let quoteQuery = "";
  let quoteSearchSelection = "";
  let staffQuery = "";
  let staffSearchSelection = "";
  let staffRankFilter = "All ranks";
  let staffDepartmentFilter = "All departments";

  function seedJobTemplates() {
    if(Array.isArray(state.jobTemplates))return;
    const presets=[
      ["audit-service","Audit Service","Mẫu tổ chức công việc kiểm toán; điều chỉnh theo phạm vi từng hợp đồng.",[
        ["Acceptance & planning",["Confirm scope and engagement","Collect client information","Prepare audit plan"]],
        ["Fieldwork",["Collect supporting documents","Perform testing and document findings","Discuss outstanding items"]],
        ["Review",["Review working papers","Resolve review points","Review draft report with client"]],
        ["Reporting & closeout",["Finalize deliverables","Deliver report","Archive engagement files"]]
      ]],
      ["accounting-service","Accounting Service","Mẫu xử lý và hoàn tất công việc kế toán theo kỳ.",[
        ["Data collection",["Request period documents","Check document completeness","Confirm opening balances"]],
        ["Processing",["Record transactions","Reconcile bank and balances","Review outstanding entries"]],
        ["Period close",["Prepare closing adjustments","Prepare reporting package","Internal review"]],
        ["Delivery",["Discuss reports with client","Deliver agreed reports","Archive period records"]]
      ]],
      ["transfer-pricing","Transfer Pricing","Mẫu quản lý hồ sơ và phân tích giao dịch liên kết; tùy chỉnh theo phạm vi dịch vụ.",[
        ["Scoping & data",["Confirm service scope","Collect transaction and financial data","Prepare information request list"]],
        ["Analysis",["Document business and functions","Analyze related-party transactions","Prepare comparison analysis"]],
        ["Documentation",["Draft agreed documentation","Internal technical review","Resolve information gaps"]],
        ["Finalization",["Discuss draft with client","Finalize deliverables","Deliver and archive files"]]
      ]],
      ["booking-service","Booking Service","Mẫu tiếp nhận, sắp lịch và xác nhận lịch làm việc với khách hàng và nhân sự.",[
        ["Booking request",["Collect requested dates and scope","Confirm client availability","Check staffing requirements"]],
        ["Schedule planning",["Check staff capacity and leave","Prepare proposed schedule","Resolve scheduling conflicts"]],
        ["Confirmation",["Confirm schedule with client","Confirm assigned team","Record booking details"]],
        ["Follow-up",["Send preparation checklist","Track schedule changes","Close booking request"]]
      ]]
    ];
    state.jobTemplates=presets.map(([id,name,description,phases])=>({id:`template-${id}`,name,description,phases:phases.map(([name,tasks],pi)=>({id:crypto.randomUUID(),name,startOffset:pi*5,duration:5,tasks:tasks.map((name,ti)=>({id:crypto.randomUUID(),name,startOffset:ti,duration:1,estimatedHours:8,checklist:[{id:crypto.randomUUID(),text:"Attach supporting evidence"}],subtasks:ti===0?[{id:crypto.randomUUID(),name:`Review ${name.toLowerCase()}`,owner:"Job owner",dueOffset:0,checklist:[{id:crypto.randomUUID(),text:"Record review result"}]}]:[]}))}))}));
  }

  function seedBoardViews() {
    let changed=false;
    if(!Array.isArray(state.boardViews)||!state.boardViews.length){
      state.boardViews=[{id:"board-view-delivery",name:"Delivery workflow",isDefault:true,steps:[
        {id:crypto.randomUUID(),name:"Planning",status:"Planning",visible:true},
        {id:crypto.randomUUID(),name:"In Progress",status:"In progress",visible:true,aliases:["Review"]},
        {id:crypto.randomUUID(),name:"On Hold",status:"On hold",visible:true},
        {id:crypto.randomUUID(),name:"Complete",status:"Complete",visible:true},
        {id:crypto.randomUUID(),name:"Cancel",status:"Cancelled",visible:true}
      ]}];changed=true;
    }
    state.boardViews.forEach((view,index)=>{
      view.id||=`board-view-${crypto.randomUUID()}`;view.name||=`Board view ${index+1}`;view.steps=Array.isArray(view.steps)?view.steps:[];
      view.steps.forEach(step=>{step.id||=crypto.randomUUID();step.name||=step.status||"New step";step.status||=step.name;step.visible=step.visible!==false;step.aliases=Array.isArray(step.aliases)?step.aliases:[];});
    });
    if(!state.boardViews.some(view=>view.isDefault)){state.boardViews[0].isDefault=true;changed=true;}
    const fallback=state.boardViews.find(view=>view.isDefault)?.id||state.boardViews[0].id;
    state.jobTemplates.forEach(template=>{if(!state.boardViews.some(view=>view.id===template.boardViewId)){template.boardViewId=fallback;changed=true;}});
    if(!selectedBoardViewId||!state.boardViews.some(view=>view.id===selectedBoardViewId))selectedBoardViewId=fallback;
    return changed;
  }

  function defaultBoardView() {
    return state.boardViews?.find(view=>view.isDefault)||state.boardViews?.[0]||null;
  }

  function staffCode(shortName="") {
    return shortName.replace(/[^a-z0-9]/gi,"").slice(0,2).toUpperCase() || "NA";
  }

  const privacyCodes = ["MNYO","EFUN","ZBBA","WEPH","ZNML","UXLT","CXLF","IUSF","MNBN","YHKV","KBAZ","AFTH","LZZS","FHLT","PBVU","XQVU","GRSC","ABVZ","NZEN","FSFO","SLAE","TBWV","YWIL","AFUO","PVCO","RPLL","OTVC","BCGM","XCVH","HZFY","TPQM","PZGV","YUME","GGTU","SRAD","JLTG","WJDU","CKOT","TUZP","MWIW","LOBJ","UODL","LTPE","RAGQ","QOQP","KZEY","CVUP","LGKV","CGIU","AJTR","ZHTV","KVEA","QFYH","ABSI","TMTE","ZGGD","RAMI","LWBS","GZJQ","UDBL","NWOW","SSXS","ILEV","RDKU","VQQI","EWVR","FDKL","GPEO","ZUNN","AXDE","SUJH","FBTM","WMGA","WGMH","ILSO","GQJD","DJRU","MSNV","DVSL","EIHB","GFSM","JEYW","MYZX","CQDN","ZUAW","ASOO","HWOR","FOWY","XONR","WHDC","XVPS","EEIM","KJLX","LDIX","PZBW","UEMO","XMNE","QYSU","PEDL","DFXJ","XLJI","VESX","HSXS","SZZR","ULTK","AREU","EWFR","WMPF","KHYO","DFRQ","TCVX","WQSI","BEYW","XLXP","EZHW","XENE","SFJM","FBZW","FBLL","SGGL","KAMO","KERI","RKGO","AYTN","NNYG","RXTY","QBAJ","MRFC","BWTR","BQOG","DUJV","BQTJ","XDZL","JNWD","GPZN","WZJT","IJKB","NRYD","AEXY","LGQH","IBQZ","AYYS","QMZD","MZXB","MGQD","OXHY","CWNU","ZWIU","GGVN","RFVJ","DZFR","SONT","JVJD","TTSB","NXOC","NNSA","YEOQ","EXOZ","FTOD","HYTT"];

  function replaceLastNameWord(value,code) {
    const words=String(value||"").trim().split(/\s+/).filter(Boolean);
    if(!words.length)return code;
    words[words.length-1]=code;
    return words.join(" ");
  }

  function anonymizeStateNames() {
    if(state.nameMaskVersion>=1)return false;
    const personAliases=new Map();
    state.capacity.members.forEach((member,index)=>{
      const sequence=Number(String(member.id||"").match(/staff-(\d+)/)?.[1])||index+1;
      const code=privacyCodes[(sequence-1)%94];
      const oldNames=[member.name,member.shortName,member.fullName].filter(Boolean);
      oldNames.forEach(name=>personAliases.set(name,code));
      member.fullName=replaceLastNameWord(member.fullName||member.name,code);
      member.shortName=code;member.name=code;member.code=staffCode(code);
    });
    const replacePeople=value=>{
      let text=String(value||"");
      [...personAliases.entries()].sort((a,b)=>b[0].length-a[0].length).forEach(([oldName,code])=>{text=text.split(oldName).join(code);});
      return text;
    };
    state.jobs.forEach(job=>{job.owner=personAliases.get(job.owner)||job.owner;job.team=(job.team||[]).map(name=>personAliases.get(name)||name);job.history?.forEach(entry=>{entry.actor=personAliases.get(entry.actor)||entry.actor;if(entry.text)entry.text=replacePeople(entry.text);if(entry.oldValue)entry.oldValue=replacePeople(entry.oldValue);if(entry.newValue)entry.newValue=replacePeople(entry.newValue);});});
    state.timeline.projects.forEach(project=>project.items.forEach(item=>{item.owner=personAliases.get(item.owner)||item.owner;}));
    state.recurring.forEach(item=>{item.owner=personAliases.get(item.owner)||item.owner;});

    const clientRecords=[...state.jobs,...state.quotes,...state.invoices,...state.recurring,...state.capacity.unassigned,...state.capacity.members.flatMap(member=>member.allocations)].filter(item=>item?.client&&item.client!=="Internal");
    const clients=[...new Set(clientRecords.map(item=>item.client))].sort((a,b)=>a.localeCompare(b));
    const clientMap=new Map(clients.map((client,index)=>[client,/\b[A-Z]{4}$/.test(client)?client:replaceLastNameWord(client,privacyCodes[94+(index%(privacyCodes.length-94))])]));
    state.jobs.forEach(job=>{
      const oldClient=job.client,newClient=clientMap.get(oldClient)||oldClient,oldBase=oldClient.replace(/^Công ty\s+/i,""),newBase=newClient.replace(/^Công ty\s+/i,"");
      job.client=newClient;
      if(job.name?.includes(oldBase))job.name=job.name.split(oldBase).join(newBase);
      if(job.contact?.includes(oldClient))job.contact=job.contact.split(oldClient).join(newClient);
      if(job.description?.includes(oldClient))job.description=job.description.split(oldClient).join(newClient);
      job.history?.forEach(entry=>{for(const field of ["text","oldValue","newValue","entityName"]){if(entry[field]?.includes(oldClient))entry[field]=entry[field].split(oldClient).join(newClient);if(entry[field]?.includes(oldBase))entry[field]=entry[field].split(oldBase).join(newBase);}});
    });
    for(const collection of [state.quotes,state.invoices,state.recurring,state.capacity.unassigned,...state.capacity.members.map(member=>member.allocations)])for(const item of collection)if(item?.client)item.client=clientMap.get(item.client)||item.client;
    state.nameMaskVersion=1;
    return true;
  }

  function seedWorkforceAndJobs() {
    if(state.demoDataVersion>=3)return false;
    const members=workforceSeed.map((person,index)=>({...structuredClone(person),staffId:person.staffId||`HAN${String(index+1).padStart(3,"0")}`,targetUtilization:person.targetUtilization||80,name:person.shortName,team:person.department,code:staffCode(person.shortName),weeklyHours:40,workDays:[1,1,1,1,1],allocations:[],leaves:[]}));
    if(!members.length)return false;
    state.capacity={settings:state.capacity?.settings||{under:70,over:100,colorMode:"capacity"},members,unassigned:[]};
    state.timeline={columns:state.timeline?.columns||{owner:true,status:true,progress:true},projects:[]};
    state.jobs=[];state.times=[];state.invoices=[];
    const by=(department,ranks)=>members.filter(member=>member.department===department&&ranks.includes(member.rank));
    const auditLeads=by("AUD HAN",["AD","AP","SM","M","AM"]),auditSics=by("AUD HAN",["S3","S2","S1"]),auditAssistants=by("AUD HAN",["A2","A1"]),auditInterns=by("AUD HAN",["Intern"]);
    const advisory=members.filter(member=>member.department==="ADV HAN"),advisoryLeads=advisory.filter(member=>["AP","S1"].includes(member.rank));
    const choose=(pool,index)=>pool[index%pool.length]||members[index%members.length];
    const serviceSpecs=[
      ...[
        ["Alpha Manufacturing Việt XMNE","Kiểm toán BCTC 2026"],["Bắc Hà PEDL","Kiểm toán BCTC 2026"],["GreenTech EWFR","Kiểm toán BCTC 2026"],["Dược phẩm An HSXS","Kiểm toán BCTC 2026"],["Sunrise FBZW","Kiểm toán BCTC 2026"],
        ["Hạ tầng Đông WMPF","Kiểm toán BCTC 2026"],["Pacific Foods Việt EZHW","Kiểm toán BCTC 2026"],["Năng lượng Minh WQSI","Kiểm toán BCTC 2026"],["Sakura Components Việt SFJM","Kiểm toán BCTC 2026"],["Thương mại Thành SGGL","Kiểm toán BCTC 2026"],
        ["BlueRiver DFXJ","Kiểm toán BCTC 2026"],["Thiết bị Y tế Việt FBLL","Kiểm toán BCTC 2026"],["Golden Field AREU","Kiểm toán BCTC 2026"],["Du lịch VESX","Kiểm toán BCTC 2026"],["Nova BEYW","Kiểm toán BCTC 2026"]
      ].map((row,index)=>({template:"Audit Service",client:`Công ty ${row[0]}`,name:`${row[1]} – ${row[0]}`,budget:24000+index*1250,startOffset:index*2,team:[choose(auditLeads,index),choose(auditSics,index*2),choose(auditAssistants,index*3),choose(auditInterns,index*4)]})),
      ...[["OceanView XLXP","Đặt lịch dịch vụ quý IV"],["Mekong Retail TCVX","Đặt lịch quyết toán cuối năm"],["RedSun XENE","Đặt lịch triển khai tháng 10"],["Lotus DFRQ","Đặt lịch hỗ trợ tại khách hàng"],["VinaPort KAMO","Đặt lịch kiểm tra định kỳ"]].map((row,index)=>({template:"Booking Service",client:`Công ty ${row[0]}`,name:`${row[1]} – ${row[0]}`,budget:4500+index*500,startOffset:3+index*5,team:[choose(advisoryLeads,index),choose(advisory,index+3),choose(advisory,index+8)]})),
      ...[["Horizon KHYO","Dịch vụ kế toán tháng 09/2026"],["EverSpring SZZR","Dịch vụ kế toán quý III/2026"],["Delta XLJI","Hoàn thiện sổ sách kế toán 2026"]].map((row,index)=>({template:"Accounting Service",client:`Công ty ${row[0]}`,name:`${row[1]} – ${row[0]}`,budget:12000+index*1800,startOffset:6+index*7,team:[choose(advisoryLeads,index+2),choose(advisory,index+5),choose(advisory,index+10)]})),
      ...[["GlobalLink ULTK","Hồ sơ xác định giá giao dịch liên kết 2026"],["Asia Components QYSU","Local File và tờ khai GDLK 2026"]].map((row,index)=>({template:"Transfer Pricing",client:`Công ty ${row[0]}`,name:`${row[1]} – ${row[0]}`,budget:28000+index*6000,startOffset:10+index*10,team:[choose(advisoryLeads,index+4),choose(advisory,index+1),choose(advisory,index+6),choose(advisory,index+11)]}))
    ];
    const statuses=["Planning","In progress","In progress","Review","Planning"];
    serviceSpecs.forEach((spec,index)=>{
      const template=state.jobTemplates.find(item=>item.name===spec.template);if(!template)return;
      const jobId=`JF-${2601+index}`,base=6+spec.startOffset,start=dateFromTimelineDay(base),due=dateFromTimelineDay(base+templateSpan(template)-1),progress=[0,25,45,70,10][index%5];
      const team=[...new Map(spec.team.filter(Boolean).map(member=>[member.id,member])).values()],owner=team[0];
      const job={id:jobId,name:spec.name,client:spec.client,clientSize:["Large","Medium","Small"][index%3],owner:owner.shortName,start,due,startReminder:start,deadlineReviewDate:start,status:statuses[index%statuses.length],progress,budget:spec.budget,spent:Math.round(spec.budget*progress/100*.55),billed:Math.round(spec.budget*progress/100*.65),priority:index%6===0?"high":index%4===0?"low":"medium",team:team.map(member=>member.shortName),teamMemberIds:team.map(member=>member.id),tasks:[],milestones:[],template:template.name,templateId:template.id,templateSnapshot:structuredClone(template),description:template.description,contact:`Kế toán trưởng – ${spec.client}`,orderNo:`PO-26-${String(index+1).padStart(3,"0")}`,notes:[],documents:[],history:[{id:`history-${jobId}`,date:"Sep 5, 2026 · 10:00 AM",timestamp:1788592800000+index,text:`${owner.shortName} created the job from ${template.name}.`}]};
      const project={jobId,expanded:index<6,items:[]};let taskIndex=0,previousPhase="";
      for(const [phaseIndex,phase] of template.phases.entries()){
        const phaseId=`${jobId}-phase-${phaseIndex+1}`,phaseOwner=team[Math.min(phaseIndex,team.length-1)];
        project.items.push({id:phaseId,type:"phase",name:phase.name,owner:phaseOwner.shortName,start:base+phase.startOffset,duration:phase.duration,progress:0,status:"Planned",dependency:previousPhase});
        previousPhase=phaseId;
        for(const task of phase.tasks){
          const taskId=`${jobId}-task-${++taskIndex}`,taskOwner=team[(taskIndex-1)%team.length],taskProgress=taskIndex<=Math.floor(template.phases.reduce((sum,item)=>sum+item.tasks.length,0)*progress/100)?100:0;
          project.items.push({id:taskId,type:"task",name:task.name,owner:taskOwner.shortName,start:base+phase.startOffset+task.startOffset,duration:task.duration,estimatedHours:task.estimatedHours,parentPhaseId:phaseId,progress:taskProgress,status:taskProgress===100?"Complete":"Planned",dependency:""});
          job.tasks.push([task.name,taskProgress===100,`${task.estimatedHours}h`,taskId]);
          const relative=base+phase.startOffset+task.startOffset-6,weekOffset=Math.floor(relative/7),day=Math.min(4,((relative%7)+7)%7);
          const plannedHours=Math.min(4,task.estimatedHours);
          taskOwner.allocations.push({id:`allocation-${jobId}-${taskIndex}`,day,weekOffset,jobId,taskId,title:job.name,task:task.name,client:job.client,hours:plannedHours,actual:taskProgress===100?plannedHours:0,baselineActual:taskProgress===100?plannedHours:0,billable:true});
          if(index<8&&taskIndex===1)state.times.push({id:`time-${jobId}`,jobId,job:job.name,taskId,task:task.name,memberId:taskOwner.id,date:dateFromTimelineDay(base+phase.startOffset+task.startOffset),note:"Thực hiện công việc theo kế hoạch",hours:Math.min(4,task.estimatedHours)});
        }
      }
      const planningId=`${jobId}-milestone-planning`,finalId=`${jobId}-milestone-final`;
      job.milestones=[["Planning approved",dateFromTimelineDay(base+4),planningId],["Final delivery",due,finalId]];
      project.items.push({id:planningId,type:"milestone",name:"Planning approved",owner:owner.shortName,start:base+4,duration:1,progress:progress>=25?100:0,status:progress>=25?"Complete":"Planned",dependency:""},{id:finalId,type:"milestone",name:"Final delivery",owner:owner.shortName,start:base+templateSpan(template)-1,duration:1,progress:0,status:"Planned",dependency:previousPhase});
      state.jobs.push(job);state.timeline.projects.push(project);
    });
    state.invoices=state.jobs.filter((_,index)=>index%5===1).slice(0,5).map((job,index)=>({id:`INV-${2301+index}`,client:job.client,jobId:job.id,job:job.name,value:Math.round(job.budget*.3),issued:dateFromTimelineDay(7+index*5),due:dateFromTimelineDay(21+index*5),status:index===0?"Paid":"Sent"}));
    state.recurring=(state.recurring||[]).map((item,index)=>({...item,owner:members[index%members.length].shortName}));
    state.demoDataVersion=3;
    return true;
  }

  function templateSpan(template) {
    return Math.max(1,...template.phases.flatMap(p=>[p.startOffset+p.duration,...p.tasks.map(t=>p.startOffset+t.startOffset+t.duration)]));
  }

  function templateOptions(selected="") {
    return `<option value="">Blank job</option>${state.jobTemplates.map(t=>`<option value="${esc(t.id)}" ${selected===t.id?"selected":""}>${esc(t.name)}</option>`).join("")}`;
  }

  function prepareJobTemplate(selected="") {
    refreshStaffSelects();
    refreshClientSelects();
    const form=$("#job-form");form.elements.template.innerHTML=templateOptions(selected);
    if(!$("#template-preview"))form.elements.template.closest("label").insertAdjacentHTML("afterend",'<p id="template-preview" class="template-preview" aria-live="polite"></p>');
    updateTemplatePreview(true);
  }

  function updateTemplatePreview(setDue=false) {
    const form=$("#job-form"),template=state.jobTemplates.find(t=>t.id===form.elements.template.value);
    const preview=$("#template-preview");
    if(preview){const tasks=template?.phases.flatMap(phase=>phase.tasks)||[],subtasks=tasks.reduce((sum,task)=>sum+(task.subtasks?.length||0),0),checks=tasks.reduce((sum,task)=>sum+(task.checklist?.length||0)+(task.subtasks||[]).reduce((count,subtask)=>count+(subtask.checklist?.length||0),0),0);preview.textContent=template?`${template.phases.length} phases · ${tasks.length} tasks · ${subtasks} sub-tasks · ${checks} checklist items · ${templateSpan(template)} calendar days.`:"Create a job without predefined tasks.";}
    if(setDue && form.elements.start.value){if(template)form.elements.due.value=dateFromTimelineDay(timelineDay(form.elements.start.value)+templateSpan(template)-1);if(form.elements.startReminder)form.elements.startReminder.value=form.elements.start.value;}
  }

  function newTemplateDraft() {return {id:crypto.randomUUID(),name:"",description:"",phases:[]};}

  function setTemplateDraft(draft) {
    if(draft)normalizeTemplateDetail(draft);
    templateDraft=draft;
    templateDraftBaseline=draft?JSON.stringify(draft):null;
  }

  function readTemplateDraft() {
    const form=$("#template-editor");if(!form||!templateDraft)return;
    templateDraft.name=form.elements.templateName.value;
    templateDraft.description=form.elements.description.value;
    for(const phase of templateDraft.phases){
      for(const key of ["name","startOffset","duration"])phase[key]=key==="name"?form.elements[`phase-${phase.id}-${key}`].value:Number(form.elements[`phase-${phase.id}-${key}`].value);
      for(const task of phase.tasks){
        for(const key of ["name","startOffset","duration","estimatedHours"])task[key]=key==="name"?form.elements[`task-${task.id}-${key}`].value:Number(form.elements[`task-${task.id}-${key}`].value);
        for(const item of task.checklist||[])item.text=form.elements[`check-${item.id}-text`].value;
        for(const subtask of task.subtasks||[]){subtask.name=form.elements[`subtask-${subtask.id}-name`].value;subtask.owner=form.elements[`subtask-${subtask.id}-owner`].value;subtask.dueOffset=Number(form.elements[`subtask-${subtask.id}-dueOffset`].value);for(const item of subtask.checklist||[])item.text=form.elements[`check-${item.id}-text`].value;}
      }
    }
  }

  function templateHasUnsavedChanges(syncForm=true) {
    if(!templateDraft)return false;
    if(syncForm)readTemplateDraft();
    return JSON.stringify(templateDraft)!==templateDraftBaseline;
  }

  function validateTemplate(template) {
    if(!template.name.trim())return "Enter a template name.";
    if(state.jobTemplates.some(t=>t.id!==template.id && t.name.trim().toLowerCase()===template.name.trim().toLowerCase()))return "A template with this name already exists.";
    for(const p of template.phases){
      if(!p.name.trim()||!Number.isInteger(p.startOffset)||p.startOffset<0||!Number.isInteger(p.duration)||p.duration<1)return "Each phase needs a name, a non-negative start offset and a positive whole-day duration.";
      for(const t of p.tasks){
        if(!t.name.trim()||!Number.isInteger(t.startOffset)||t.startOffset<0||!Number.isInteger(t.duration)||t.duration<1||!Number.isFinite(t.estimatedHours)||t.estimatedHours<=0||t.startOffset+t.duration>p.duration)return "Each task needs a name, positive hours/duration and dates within its phase.";
        if((t.checklist||[]).some(item=>!item.text.trim()))return "Checklist items need a description.";
        if((t.subtasks||[]).some(item=>!item.name.trim()||!item.owner||!Number.isInteger(item.dueOffset)||item.dueOffset<0))return "Each sub-task needs a name, owner and non-negative deadline offset.";
        if((t.subtasks||[]).some(item=>(item.checklist||[]).some(check=>!check.text.trim())))return "Sub-task checklist items need a description.";
      }
    }
    return "";
  }

  function renderTemplateSettings() {
    const list=state.jobTemplates.map(t=>{const tasks=t.phases.flatMap(p=>p.tasks),subtasks=tasks.reduce((n,task)=>n+(task.subtasks?.length||0),0);return `<button class="template-choice ${templateDraft?.id===t.id?"active":""}" data-edit-template="${esc(t.id)}"><strong>${esc(t.name)}</strong><small>${t.phases.length} phases · ${tasks.length} tasks · ${subtasks} sub-tasks</small></button>`;}).join("");
    const d=templateDraft;
    const staffOptions=owner=>["Job owner",...state.capacity.members.map(member=>member.shortName)].map(value=>`<option ${value===owner?"selected":""}>${esc(value)}</option>`).join("");
    const checklistRow=(item,parentAttrs)=>`<div class="template-check-row"><input name="check-${item.id}-text" value="${esc(item.text)}" required placeholder="Checklist item"><button type="button" class="icon-btn" data-template-remove-check="${item.id}" ${parentAttrs} aria-label="Remove checklist item">×</button></div>`;
    const taskEditor=t=>`<section class="template-task-block"><div class="template-task"><label>Task name<input name="task-${t.id}-name" value="${esc(t.name)}" required></label><label>Offset<input name="task-${t.id}-startOffset" type="number" min="0" step="1" value="${t.startOffset}" required></label><label>Days<input name="task-${t.id}-duration" type="number" min="1" step="1" value="${t.duration}" required></label><label>Hours<input name="task-${t.id}-estimatedHours" type="number" min="0.5" step="0.5" value="${t.estimatedHours}" required></label><button type="button" class="icon-btn" data-template-remove-task="${t.id}" aria-label="Remove ${esc(t.name)||"task"}">×</button></div><div class="template-nested-actions"><button type="button" class="text-btn" data-template-add-subtask="${t.id}">+ Sub-task</button><button type="button" class="text-btn" data-template-add-check="${t.id}">+ Checklist</button></div>${(t.checklist||[]).length?`<div class="template-check-list"><strong>Task checklist</strong>${t.checklist.map(item=>checklistRow(item,`data-template-task="${t.id}"`)).join("")}</div>`:""}<div class="template-subtask-list">${(t.subtasks||[]).map(subtask=>`<article class="template-subtask"><div class="template-subtask-fields"><label>Sub-task name<input name="subtask-${subtask.id}-name" value="${esc(subtask.name)}" required></label><label>Owner<select name="subtask-${subtask.id}-owner">${staffOptions(subtask.owner)}</select></label><label>Deadline offset<input name="subtask-${subtask.id}-dueOffset" type="number" min="0" step="1" value="${subtask.dueOffset}" required></label><button type="button" class="icon-btn" data-template-remove-subtask="${subtask.id}" data-template-task="${t.id}" aria-label="Remove ${esc(subtask.name)||"sub-task"}">×</button></div><div class="template-nested-actions"><button type="button" class="text-btn" data-template-add-subtask-check="${subtask.id}" data-template-task="${t.id}">+ Checklist</button></div>${(subtask.checklist||[]).length?`<div class="template-check-list">${subtask.checklist.map(item=>checklistRow(item,`data-template-task="${t.id}" data-template-subtask="${subtask.id}"`)).join("")}</div>`:""}</article>`).join("")}</div></section>`;
    const editor=!d?`<div class="empty-state"><h3>Select a template</h3><p>Choose a service template to edit its phases, tasks, sub-tasks and checklists.</p></div>`:`<form id="template-editor"><div class="template-fields"><label>Template name<input name="templateName" value="${esc(d.name)}" required maxlength="120"></label><label>Description<textarea name="description" rows="2">${esc(d.description)}</textarea></label></div><div class="section-title"><h3>Phases, tasks & work details</h3><button type="button" class="button ghost" data-template-add-phase>+ Phase</button></div><p class="template-help">Only phases and tasks appear in Schedule. Sub-tasks and checklists stay inside Job Manager.</p>${d.phases.map(p=>`<article class="template-phase"><div class="template-phase-fields"><label>Phase name<input name="phase-${p.id}-name" value="${esc(p.name)}" required></label><label>Start offset<input name="phase-${p.id}-startOffset" type="number" min="0" step="1" value="${p.startOffset}" required></label><label>Duration (days)<input name="phase-${p.id}-duration" type="number" min="1" step="1" value="${p.duration}" required></label><button type="button" class="button danger" data-template-remove-phase="${p.id}">Remove phase</button></div><div class="template-task-list">${p.tasks.map(taskEditor).join("")}</div><button type="button" class="text-btn" data-template-add-task="${p.id}">+ Task</button></article>`).join("")||'<p class="template-help">No phases yet. Use + Phase to create a parent heading.</p>'}<div class="template-save"><button class="button primary" type="submit">Save template</button><button class="button ghost" type="button" data-template-cancel>Cancel</button>${state.jobTemplates.some(t=>t.id===d.id)?`<button class="button ghost" type="button" data-use-template="${d.id}">New job from saved template</button><button class="button danger" type="button" data-template-delete="${d.id}">Delete template</button>`:""}</div><p class="template-help">Save applies to future jobs only. Existing jobs keep their own structure.</p></form>`;
    return `<div class="template-layout"><aside class="card template-list">${list||'<p>No templates yet.</p>'}</aside><section class="card template-editor-card">${editor}</section></div>`;
  }

  function renderStaffSettings() {
    const ranks=[...new Set(state.capacity.members.map(member=>member.rank).filter(Boolean))].sort();
    const departments=[...new Set(state.capacity.members.map(member=>member.department).filter(Boolean))].sort();
    const members=state.capacity.members.filter(member=>(staffRankFilter==="All ranks"||member.rank===staffRankFilter)&&(staffDepartmentFilter==="All departments"||member.department===staffDepartmentFilter)&&(!staffSearchSelection||member.id===staffSearchSelection));
    return `<div class="toolbar staff-toolbar">${searchPickerMarkup("staff","staff-search",staffQuery,"Search staff…",staffSearchSelection?staffQuery:"")}<select class="filter-select" id="staff-rank"><option>All ranks</option>${ranks.map(rank=>`<option ${staffRankFilter===rank?"selected":""}>${esc(rank)}</option>`).join("")}</select><select class="filter-select" id="staff-department"><option>All departments</option>${departments.map(department=>`<option ${staffDepartmentFilter===department?"selected":""}>${esc(department)}</option>`).join("")}</select><span class="toolbar-spacer"></span><span class="date-chip">${members.length} of ${state.capacity.members.length} staff</span></div><section class="card table-card staff-table-card"><table class="jobs-table staff-table"><thead><tr><th>Staff ID</th><th>Short name</th><th>Full name</th><th>Rank</th><th>Department</th><th>Position / Role</th><th>Target utilization</th><th></th></tr></thead><tbody>${members.map(member=>`<tr><td><strong>${esc(member.staffId)}</strong></td><td><span class="staff-short"><span class="avatar">${esc(member.code)}</span><strong>${esc(member.shortName)}</strong></span></td><td>${esc(member.fullName)}</td><td><span class="rank-chip">${esc(member.rank)}</span></td><td>${esc(member.department)}</td><td>${esc(member.role)}</td><td><strong>${member.targetUtilization}%</strong></td><td><div class="staff-actions"><button class="text-btn" data-edit-staff="${member.id}">Edit</button><button class="text-btn danger-text" data-delete-staff="${member.id}">Delete</button></div></td></tr>`).join("")}</tbody></table></section>`;
  }

  function openBoardViewSelector() {
    const views=state.boardViews||[];
    showPanel("Select Board view",`<div class="board-selector-intro"><div><strong>Choose a workflow</strong><p>Each view includes every job created from its assigned templates.</p></div><span>${views.length} view${views.length===1?"":"s"}</span></div><div class="board-view-list">${views.map(view=>{const templates=boardViewTemplates(view),jobs=boardViewJobs(view),selected=view.id===activeBoardView()?.id;return `<article class="board-view-list-item ${selected?"selected":""}"><button type="button" data-choose-board-view="${view.id}"><span class="board-view-identity"><i>${esc(view.name.slice(0,2).toUpperCase())}</i><span><strong>${esc(view.name)}</strong><small>${templates.map(template=>template.name).join(" · ")||"No templates assigned"}</small></span></span><span class="board-view-stats"><span><b>${jobs.length}</b><small>Jobs</small></span><span><b>${templates.length}</b><small>Templates</small></span><span><b>${view.steps.filter(step=>step.visible).length}</b><small>Columns</small></span></span><span class="board-view-select-state">${selected?`${icon("check")} Selected`:`Open ${icon("chevron")}`}</span></button><button type="button" class="button ghost board-view-edit" data-edit-board-view="${view.id}" aria-label="Edit ${esc(view.name)}">Edit</button></article>`;}).join("")||'<div class="empty-list">No Board views yet.</div>'}</div><div class="panel-form-actions board-selector-actions"><button class="button primary" data-create-board-view>${icon("plus")}Create view</button><button class="button ghost" data-settings-board-views>Manage in Settings</button></div>`);
  }

  function readBoardViewDraft() {
    const form=$("#board-view-form");if(!form||!boardViewDraft)return;
    boardViewDraft.name=form.elements.name.value;
    boardViewDraft.isDefault=form.elements.isDefault.checked;
    boardViewDraft.templateIds=[...form.querySelectorAll('[name="templateIds"]:checked')].map(input=>input.value);
    for(const row of form.querySelectorAll("[data-board-step-row]")){
      const step=boardViewDraft.steps.find(item=>item.id===row.dataset.boardStepRow);if(!step)continue;
      step.name=row.querySelector('[name="stepName"]')?.value||"";step.visible=Boolean(row.querySelector('[name="stepVisible"]')?.checked);
    }
  }

  function openBoardViewEditor(viewId="") {
    const existing=state.boardViews?.find(view=>view.id===viewId);
    boardViewDraft=existing?structuredClone({...existing,templateIds:boardViewTemplates(existing).map(template=>template.id)}):{id:`board-view-${crypto.randomUUID()}`,name:"",isDefault:!state.boardViews?.length,templateIds:[],steps:["Planning","In progress","Review","On hold","Complete","Cancelled"].map(name=>({id:crypto.randomUUID(),name,status:name,visible:true,aliases:name==="Planning"?["Not started","Planned"]:[]}))};
    renderBoardViewEditor();
  }

  function updateBoardViewScopeSummary() {
    const form=$("#board-view-form"),summary=$("#board-view-scope-summary");if(!form||!summary)return;
    const ids=[...form.querySelectorAll('[name="templateIds"]:checked')].map(input=>input.value);
    const templates=state.jobTemplates.filter(template=>ids.includes(template.id));
    const jobs=state.jobs.filter(job=>templates.some(template=>jobUsesTemplate(job,template)));
    summary.innerHTML=`<strong>${jobs.length} jobs</strong><span>from ${templates.length} selected template${templates.length===1?"":"s"} will appear in this view.</span>`;
  }

  function renderBoardViewEditor() {
    const draft=boardViewDraft;if(!draft)return;
    const saved=state.boardViews?.some(view=>view.id===draft.id);
    showPanel(saved?"Edit Board view":"Create Board view",`<form id="board-view-form" class="board-view-form"><section class="board-form-section"><div class="board-form-section-head"><span>1</span><div><h3>View details</h3><p>Name the view and choose how it opens.</p></div></div><div class="board-detail-grid"><label>View name<input name="name" value="${esc(draft.name)}" placeholder="e.g. Transfer Pricing" maxlength="100" required></label><label class="board-default-toggle"><input name="isDefault" type="checkbox" ${draft.isDefault?"checked":""}><span><strong>Default view</strong><small>Open automatically in the Board tab.</small></span></label></div></section><section class="board-form-section"><div class="board-form-section-head"><span>2</span><div><h3>Job scope</h3><p>Select the templates whose jobs belong in this view.</p></div></div><fieldset class="board-template-picker"><legend class="sr-only">Assigned templates</legend>${state.jobTemplates.map(template=>{const count=state.jobs.filter(job=>jobUsesTemplate(job,template)).length;return `<label><input type="checkbox" name="templateIds" value="${template.id}" ${draft.templateIds.includes(template.id)?"checked":""}><span><strong>${esc(template.name)}</strong><small>${count} job${count===1?"":"s"} currently use this template</small></span><b>${draft.templateIds.includes(template.id)?"Included":"Add"}</b></label>`;}).join("")}</fieldset><div class="board-scope-summary" id="board-view-scope-summary"></div></section><section class="board-form-section"><div class="board-form-section-head"><span>3</span><div><h3>Workflow columns</h3><p>Rename columns or hide any that are not needed.</p></div><button type="button" class="button ghost" data-add-board-step>+ Step</button></div><div class="board-step-editor">${draft.steps.map((step,index)=>`<div class="board-step-row" data-board-step-row="${step.id}"><span class="board-step-index">${index+1}</span><label>Column name<input name="stepName" value="${esc(step.name)}" placeholder="Column name" maxlength="60" required></label><label class="board-visible-toggle"><input type="checkbox" name="stepVisible" ${step.visible?"checked":""}> Visible</label><button type="button" class="icon-btn danger-text" data-remove-board-step="${step.id}" aria-label="Remove ${esc(step.name)}">×</button></div>`).join("")}</div></section><div class="panel-form-actions board-form-actions"><button class="button ghost" type="button" data-cancel-board-view>Cancel</button><button class="button primary" type="submit">${saved?"Save changes":"Create Board view"}</button></div></form>`);
    updateBoardViewScopeSummary();
  }

  function renderBoardViewSettings() {
    const views=state.boardViews||[];
    return `<section class="card settings-matrix board-view-settings"><div class="card-head"><div><h2>Board views</h2><p>Define workflow steps, choose visible columns and assign one Board view to each service template.</p></div><button class="button primary" data-create-board-view>${icon("plus")}Create view</button></div>${views.length?`<div class="board-settings-list">${views.map(view=>`<article><div><strong>${esc(view.name)}</strong>${view.isDefault?'<span class="default-view-badge">Default</span>':""}<small>${view.steps.filter(step=>step.visible).map(step=>step.name).join(" · ")||"No visible steps"}</small></div><div><span>${boardViewTemplates(view).length} templates</span><button class="button ghost" data-edit-board-view="${view.id}">Edit</button></div></article>`).join("")}</div>`:""}<form id="template-board-view-form"><table class="jobs-table"><thead><tr><th>Template</th><th>Assigned Board view</th><th>Visible workflow</th></tr></thead><tbody>${state.jobTemplates.map(template=>{const view=views.find(item=>item.id===template.boardViewId);return `<tr><td><strong>${esc(template.name)}</strong><small class="table-note">${state.jobs.filter(job=>job.templateId===template.id||job.template===template.name).length} jobs use this template</small></td><td><select name="template-${template.id}" aria-label="Board view for ${esc(template.name)}"><option value="">Not assigned</option>${views.map(option=>`<option value="${option.id}" ${option.id===template.boardViewId?"selected":""}>${esc(option.name)}${option.isDefault?" — Default":""}</option>`).join("")}</select></td><td>${view?.steps.filter(step=>step.visible).map(step=>step.name).join(" → ")||"Not assigned"}</td></tr>`;}).join("")}</tbody></table><div class="matrix-actions"><button class="button primary" type="submit" ${views.length?"":"disabled"}>Save template assignments</button></div></form></section>`;
  }

  function renderSettings() {
    const actions=settingsSection==="templates"?'<button class="button primary" data-new-template>+ Template</button>':settingsSection==="staff"?'<button class="button primary" data-new-staff>+ Staff member</button>':settingsSection==="board-views"?'<button class="button primary" data-create-board-view>+ Board view</button>':'';
    const sections={templates:renderTemplateSettings,staff:renderStaffSettings,"board-views":renderBoardViewSettings};
    if(!sections[settingsSection])settingsSection="templates";
    return `${pageHead("Administration","Settings","Manage reusable templates, staff and Board workflows.",actions)}<nav class="job-tabs" aria-label="Settings sections">${[["templates","Templates"],["staff","Staff master"],["board-views","Board views"]].map(([key,label])=>`<button class="job-tab ${settingsSection===key?"active":""}" data-settings-section="${key}">${label}</button>`).join("")}</nav>${sections[settingsSection]()}`;
  }

  function openStaffEditor(memberId="") {
    const member=state.capacity.members.find(item=>item.id===memberId)||{id:"",staffId:`HAN${String(state.capacity.members.length+1).padStart(3,"0")}`,rank:"",department:"AUD HAN",role:"Supporter",fullName:"",shortName:"",targetUtilization:80};
    showPanel(member.id?"Edit staff member":"Add staff member",`<form id="staff-form"><input type="hidden" name="id" value="${esc(member.id)}"><label>Staff ID<input name="staffId" value="${esc(member.staffId)}" required maxlength="40"></label><label>Full name<input name="fullName" value="${esc(member.fullName)}" required maxlength="160"></label><label>Short name<input name="shortName" value="${esc(member.shortName)}" required maxlength="40"><small>Displayed in Job Manager, Schedule and capacity views.</small></label><label>Rank<input name="rank" value="${esc(member.rank)}" required maxlength="30"></label><label>Department<input name="department" value="${esc(member.department)}" required maxlength="80"></label><label>Position / Role<input name="role" value="${esc(member.role)}" required maxlength="120"></label><label>Target utilization (%)<input name="targetUtilization" type="number" min="1" max="150" step="1" value="${member.targetUtilization}" required></label><button class="button primary" type="submit">${member.id?"Save changes":"Add staff member"}</button></form>`);
  }

  function refreshStaffSelects() {
    const options=state.capacity.members.map(member=>`<option value="${esc(member.shortName)}">${esc(member.shortName)} · ${esc(member.fullName)}</option>`).join("");
    for(const selector of ['#job-form [name="owner"]','#recurring-form [name="owner"]','#phase-owner','#phase-task-owner']){const select=$(selector);if(select)select.innerHTML=options;}
  }

  function refreshClientSelects() {
    const clients=[...new Set(state.jobs.map(job=>job.client))].sort(),options=clients.map(client=>`<option>${esc(client)}</option>`).join("");
    const jobSelect=$("#job-form [name=\"client\"]"),recurringSelect=$("#recurring-form [name=\"client\"]");
    if(jobSelect)jobSelect.innerHTML=`<option value="">Select a client</option>${options}`;
    if(recurringSelect)recurringSelect.innerHTML=options;
  }

  function updateRecurringFields(form) {
    const enabled=Boolean(form?.elements.recurring?.checked);
    const options=form?.querySelector(".recurring-job-options");
    if(options)options.hidden=!enabled;
    for(const name of ["recurringCadence","nextOccurrence"])if(form?.elements[name])form.elements[name].disabled=!enabled;
  }

  function prepareNewJobForm(recurring=false) {
    const form=$("#job-form");form.reset();
    form.elements.start.value=todayKey();form.elements.startReminder.value=todayKey();
    form.elements.recurring.checked=recurring;
    form.elements.recurringCadence.value="Monthly";
    form.elements.nextOccurrence.value=dateFromTimelineDay(timelineDay(todayKey())+30);
    $("#new-job-title").textContent=recurring?"New recurring job":"New job";
    prepareJobTemplate("");form.elements.due.value=dateFromTimelineDay(timelineDay(todayKey())+7);
    updateRecurringFields(form);
  }

  function createJobFromTemplate(data) {
    const template=state.jobTemplates.find(t=>t.id===data.template);
    if(data.template && !template)throw Error("This template is no longer available. Select another template.");
    if(!data.name?.trim()||!data.client?.trim()||!data.start||!data.due||data.due<data.start)throw Error("Enter a job name, client and valid start/due dates.");
    const legacyBudget=data.budget==null||data.budget===""?0:Number(data.budget);if(!Number.isFinite(legacyBudget)||legacyBudget<0)throw Error("Budget must be zero or greater.");
    if(template && timelineDay(data.due)<timelineDay(data.start)+templateSpan(template)-1)throw Error("Due date is before the selected template finishes. Extend the due date or edit the template.");
    const id=`JF-${Math.max(0,...state.jobs.map(j=>Number(j.id.split("-")[1])||0))+1}`;
    const selectedMember=state.capacity.members.find(member=>member.name===data.owner);
    const recurring=Boolean(data.recurring);
    const job={id,name:data.name.trim(),client:data.client,clientSize:data.clientSize||"Medium",owner:data.owner,start:data.start,due:data.due,startReminder:data.startReminder||data.start,deadlineReviewDate:dateFromTimelineDay(timelineDay(data.start)+7),status:"Planning",priority:"medium",progress:0,budget:legacyBudget,spent:0,billed:0,team:[data.owner],teamMemberIds:selectedMember?[selectedMember.id]:[],tasks:[],milestones:[],template:template?.name||"Blank job",templateId:template?.id||null,templateSnapshot:template?structuredClone(template):null,description:template?.description||"",contact:"",orderNo:"",notes:[],documents:[],history:[],recurring,recurringCadence:recurring?(data.recurringCadence||"Monthly"):"",nextOccurrence:recurring?(data.nextOccurrence||data.start):""};
    const project={jobId:id,expanded:true,items:[]},base=timelineDay(data.start);
    for(const phase of template?.phases||[]){
      const phaseId=crypto.randomUUID();
      project.items.push({id:phaseId,type:"phase",name:phase.name,owner:job.owner,start:base+phase.startOffset,duration:phase.duration,progress:0,status:"Planned",dependency:""});
      for(const task of phase.tasks){
        const taskId=crypto.randomUUID(),taskStart=base+phase.startOffset+task.startOffset,taskDue=dateFromTimelineDay(taskStart+task.duration-1);
        const checklist=(task.checklist||[]).map(item=>({id:crypto.randomUUID(),text:item.text,completed:false}));
        const subtasks=(task.subtasks||[]).map(subtask=>({id:crypto.randomUUID(),name:subtask.name,owner:subtask.owner==="Job owner"?job.owner:subtask.owner,due:dateFromTimelineDay(taskStart+(subtask.dueOffset||0)),completed:false,checklist:(subtask.checklist||[]).map(item=>({id:crypto.randomUUID(),text:item.text,completed:false}))}));
        project.items.push({id:taskId,type:"task",name:task.name,owner:job.owner,start:taskStart,due:taskDue,duration:task.duration,estimatedHours:task.estimatedHours,parentPhaseId:phaseId,progress:0,status:"Planned",dependency:"",checklist,subtasks});
        job.tasks.push([task.name,false,`${task.estimatedHours}h`,taskId]);
      }
    }
    if(data.milestone?.trim())job.milestones.push([data.milestone.trim(),data.start]);job.milestones.push(["Final delivery",data.due]);
    job.history.push({id:crypto.randomUUID(),date:new Date().toLocaleString(),timestamp:Date.now(),text:`Job created from ${job.template}.`});state.jobs.unshift(job);state.timeline.projects.unshift(project);return job;
  }

  function migrateRecurringRecords() {
    if(state.recurringJobsVersion>=1)return false;
    for(const item of state.recurring||[]){
      if(state.jobs.some(job=>job.recurringSourceId===item.id))continue;
      let job;
      try {job=createJobFromTemplate({name:item.name,client:item.client,owner:item.owner,start:item.next,due:dateFromTimelineDay(timelineDay(item.next)+6),startReminder:item.next,clientSize:"Medium",budget:item.budget,template:"",milestone:"",recurring:"on",recurringCadence:item.cadence,nextOccurrence:item.next});}
      catch {continue;}
      state.jobs.splice(state.jobs.indexOf(job),1);state.jobs.push(job);
      const project=state.timeline.projects.find(candidate=>candidate.jobId===job.id);if(project){state.timeline.projects.splice(state.timeline.projects.indexOf(project),1);state.timeline.projects.push(project);}
      job.recurringSourceId=item.id;
      job.description="Recurring delivery";
    }
    state.recurringJobsVersion=1;
    return true;
  }

  document.addEventListener("click",event=>{
    const target=event.target;
    const settingsTab=target.closest("[data-settings-section]");if(settingsTab){if(settingsTab.dataset.settingsSection===settingsSection)return;if(settingsSection==="templates"&&templateHasUnsavedChanges()&&!window.confirm("Discard unsaved template edits?"))return;settingsSection=settingsTab.dataset.settingsSection;setTemplateDraft(null);render("settings");return;}
    if(target.closest("[data-new-staff]")){openStaffEditor();return;}
    const editStaff=target.closest("[data-edit-staff]");if(editStaff){openStaffEditor(editStaff.dataset.editStaff);return;}
    const deleteStaff=target.closest("[data-delete-staff]");if(deleteStaff){const member=state.capacity.members.find(item=>item.id===deleteStaff.dataset.deleteStaff);if(!member)return;const assigned=state.jobs.some(job=>job.owner===member.shortName||job.team?.includes(member.shortName))||state.timeline.projects.some(project=>project.items.some(item=>item.owner===member.shortName))||member.allocations.length;if(assigned){showToast("This staff member is assigned to jobs or scheduled work and cannot be deleted.");return;}if(!window.confirm(`Delete ${member.shortName}?`))return;state.capacity.members=state.capacity.members.filter(item=>item.id!==member.id);if(!save())return;render("settings");showToast("Staff member deleted.");return;}
    const edit=target.closest("[data-edit-template]"),fresh=target.closest("[data-new-template]");
    if(edit||fresh){if(edit&&templateDraft?.id===edit.dataset.editTemplate)return;if(templateHasUnsavedChanges()&&!window.confirm("Discard unsaved template edits?"))return;setTemplateDraft(edit?structuredClone(state.jobTemplates.find(t=>t.id===edit.dataset.editTemplate)):newTemplateDraft());render("settings");}
    if(target.closest("[data-template-cancel]")){if(templateHasUnsavedChanges()&&!window.confirm("Discard unsaved template edits?"))return;setTemplateDraft(null);render("settings");}
    const remove=target.closest("[data-template-delete]");if(remove){if(!window.confirm("Delete this template? Existing jobs will be kept."))return;state.jobTemplates=state.jobTemplates.filter(t=>t.id!==remove.dataset.templateDelete);if(!save())return;setTemplateDraft(null);render("settings");}
    const use=target.closest("[data-use-template]");if(use){const form=$("#job-form");form.reset();form.elements.start.value=todayKey();form.elements.startReminder.value=todayKey();prepareJobTemplate(use.dataset.useTemplate);openModal("#job-modal");}
    if(target.closest("[data-dashboard-reset]")){dashboardFilters={period:"Month",service:"All services",staff:"All staff",jobStatus:"All job statuses",jobStage:"All stages",taskStatus:"All task statuses",deadlineStatus:"All deadline statuses"};dashboardSectionFilters={pipeline:{query:"",selected:"",metric:"All statuses"},tasks:{query:"",selected:"",metric:"All deadline statuses"},risk:{query:"",selected:"",metric:"All risk levels"}};expandedDashboardSections.clear();render("dashboard");return;}
    const expandSection=target.closest("[data-dashboard-expand]");if(expandSection){const key=expandSection.dataset.dashboardExpand;expandedDashboardSections.has(key)?expandedDashboardSections.delete(key):expandedDashboardSections.add(key);render("dashboard");return;}
    if(target.closest('[data-dashboard-module="schedule"]')){scheduleMode="timeline";render("schedule");return;}
    const reviewed=target.closest("[data-review-deadline]");if(reviewed){const job=getJob(reviewed.dataset.reviewDeadline);if(!job||!window.confirm(`Mark the weekly deadline review complete for ${job.id}?`))return;const previous=job.deadlineReviewDate,base=Math.max(timelineDay(todayKey()),timelineDay(previous));job.deadlineReviewDate=dateFromTimelineDay(base+7);auditHistory(job,{source:"dashboard",action:"Reviewed deadlines",entityType:"job",entityName:job.name,oldValue:previous,newValue:job.deadlineReviewDate,text:`${currentStaffName()} completed the weekly deadline review for ${job.id}.`});if(!save())return;render("dashboard");showToast(`Next review scheduled for ${shortDate(job.deadlineReviewDate)}.`);return;}
    if(!templateDraft)return;
    const addPhase=target.closest("[data-template-add-phase]"),addTask=target.closest("[data-template-add-task]"),removePhase=target.closest("[data-template-remove-phase]"),removeTask=target.closest("[data-template-remove-task]"),addSubtask=target.closest("[data-template-add-subtask]"),removeSubtask=target.closest("[data-template-remove-subtask]"),addCheck=target.closest("[data-template-add-check]"),addSubtaskCheck=target.closest("[data-template-add-subtask-check]"),removeCheck=target.closest("[data-template-remove-check]");
    if(addPhase||addTask||removePhase||removeTask||addSubtask||removeSubtask||addCheck||addSubtaskCheck||removeCheck){
      readTemplateDraft();const tasks=templateDraft.phases.flatMap(phase=>phase.tasks),task=tasks.find(item=>item.id===(addSubtask?.dataset.templateAddSubtask||addCheck?.dataset.templateAddCheck||addSubtaskCheck?.dataset.templateTask||removeSubtask?.dataset.templateTask||removeCheck?.dataset.templateTask));
      if(addPhase)templateDraft.phases.push({id:crypto.randomUUID(),name:"New phase",startOffset:templateDraft.phases.length?templateSpan(templateDraft):0,duration:5,tasks:[]});
      if(addTask)templateDraft.phases.find(p=>p.id===addTask.dataset.templateAddTask).tasks.push({id:crypto.randomUUID(),name:"New task",startOffset:0,duration:1,estimatedHours:8,subtasks:[],checklist:[]});
      if(addSubtask&&task)task.subtasks.push({id:crypto.randomUUID(),name:"New sub-task",owner:"Job owner",dueOffset:0,checklist:[]});
      if(addCheck&&task)task.checklist.push({id:crypto.randomUUID(),text:"New checklist item"});
      if(addSubtaskCheck&&task){const subtask=task.subtasks.find(item=>item.id===addSubtaskCheck.dataset.templateAddSubtaskCheck);if(subtask)subtask.checklist.push({id:crypto.randomUUID(),text:"New checklist item"});}
      if(removePhase){const phase=templateDraft.phases.find(p=>p.id===removePhase.dataset.templateRemovePhase),phaseTasks=phase?.tasks||[],subtasks=phaseTasks.reduce((sum,item)=>sum+(item.subtasks?.length||0),0),checks=phaseTasks.reduce((sum,item)=>sum+(item.checklist?.length||0)+(item.subtasks||[]).reduce((count,subtask)=>count+(subtask.checklist?.length||0),0),0);if(!window.confirm(`Remove phase “${phase?.name||"this phase"}” from the template?\n\nIts ${phaseTasks.length} task(s), ${subtasks} sub-task(s), and ${checks} checklist item(s) will also be removed from this draft.`))return;templateDraft.phases=templateDraft.phases.filter(p=>p.id!==removePhase.dataset.templateRemovePhase);}
      if(removeTask){const removedTask=tasks.find(item=>item.id===removeTask.dataset.templateRemoveTask),subtasks=removedTask?.subtasks?.length||0,checks=(removedTask?.checklist?.length||0)+(removedTask?.subtasks||[]).reduce((sum,item)=>sum+(item.checklist?.length||0),0);if(!window.confirm(`Remove task “${removedTask?.name||"this task"}” from the template?\n\nIts ${subtasks} sub-task(s) and ${checks} checklist item(s) will also be removed from this draft.`))return;templateDraft.phases.forEach(p=>p.tasks=p.tasks.filter(t=>t.id!==removeTask.dataset.templateRemoveTask));}
      if(removeSubtask&&task){const subtask=task.subtasks.find(item=>item.id===removeSubtask.dataset.templateRemoveSubtask),checks=subtask?.checklist?.length||0;if(!window.confirm(`Remove sub-task “${subtask?.name||"this sub-task"}” from the template?\n\nIts ${checks} checklist item(s) will also be removed from this draft.`))return;task.subtasks=task.subtasks.filter(item=>item.id!==removeSubtask.dataset.templateRemoveSubtask);}
      if(removeCheck&&task){const parent=removeCheck.dataset.templateSubtask?task.subtasks.find(item=>item.id===removeCheck.dataset.templateSubtask):task,item=parent?.checklist.find(check=>check.id===removeCheck.dataset.templateRemoveCheck);if(!parent||!item||!window.confirm(`Remove checklist item “${item.text}” from the template draft?`))return;parent.checklist=parent.checklist.filter(check=>check.id!==removeCheck.dataset.templateRemoveCheck);}
      render("settings");
    }
  });
  document.addEventListener("input",event=>{if(event.target.closest("#template-editor"))readTemplateDraft();});
  document.addEventListener("change",event=>{if(event.target.matches('#job-form [name="template"],#job-form [name="start"]'))updateTemplatePreview(true);if(event.target.matches('#board-view-form [name="templateIds"]')){readBoardViewDraft();updateBoardViewScopeSummary();event.target.closest("label")?.querySelector("b")?.replaceChildren(event.target.checked?"Included":"Add");}});
  document.addEventListener("change",event=>{if(event.target.matches('#job-form [name="recurring"],#job-info-form [name="recurring"]'))updateRecurringFields(event.target.form);});
  document.addEventListener("submit",event=>{if(event.target.id!=="board-view-form")return;event.preventDefault();readBoardViewDraft();const previous=state.boardViews.find(view=>view.id===boardViewDraft.id),name=boardViewDraft.name.trim(),steps=boardViewDraft.steps.map(step=>{const savedStep=previous?.steps.find(item=>item.id===step.id),stepName=step.name.trim();return {...step,name:stepName,status:savedStep&&savedStep.name===stepName?savedStep.status:stepName};});if(!name){showToast("Enter a view name.");return;}if(state.boardViews.some(view=>view.id!==boardViewDraft.id&&view.name.trim().toLowerCase()===name.toLowerCase())){showToast("A Board view with this name already exists.");return;}if(!boardViewDraft.templateIds.length){showToast("Select at least one template so the view can display jobs.");return;}if(!steps.length||steps.some(step=>!step.name)){showToast("Each view needs at least one named step.");return;}if(new Set(steps.map(step=>step.name.toLowerCase())).size!==steps.length){showToast("Step names must be unique within a view.");return;}if(!steps.some(step=>step.visible)){showToast("Choose at least one step to display.");return;}const copy={id:boardViewDraft.id,name,isDefault:Boolean(boardViewDraft.isDefault),steps};if(previous){const templates=boardViewTemplates(previous);for(const oldStep of previous.steps){const next=steps.find(step=>step.id===oldStep.id);if(next&&next.status!==oldStep.status)state.jobs.filter(job=>templates.some(template=>jobUsesTemplate(job,template))).forEach(job=>{if(boardViewStepForStatus({steps:[oldStep]},job.status))job.status=next.status;});}}const index=state.boardViews.findIndex(view=>view.id===copy.id);if(index<0)state.boardViews.push(copy);else state.boardViews[index]=copy;if(copy.isDefault)state.boardViews.forEach(view=>{if(view.id!==copy.id)view.isDefault=false;});if(!state.boardViews.some(view=>view.isDefault))copy.isDefault=true;state.jobTemplates.forEach(template=>{if(boardViewDraft.templateIds.includes(template.id))template.boardViewId=copy.id;else if(template.boardViewId===copy.id)template.boardViewId="";});selectedBoardViewId=copy.id;boardStepFilter="All steps";boardViewDraft=null;if(!save())return;$("#audit-panel")?.remove();render(currentView);showToast(`${copy.name} saved.`);});
  document.addEventListener("submit",event=>{if(event.target.id!=="template-board-view-form")return;event.preventDefault();const data=new FormData(event.target);state.jobTemplates.forEach(template=>{template.boardViewId=String(data.get(`template-${template.id}`)||"");});if(!save())return;render("settings");showToast("Template Board views saved.");});
  document.addEventListener("submit",event=>{if(event.target.id!=="template-editor")return;event.preventDefault();readTemplateDraft();const error=validateTemplate(templateDraft);if(error){showToast(error);return;}const copy=structuredClone(templateDraft);copy.name=copy.name.trim();const index=state.jobTemplates.findIndex(t=>t.id===copy.id);if(index<0)state.jobTemplates.push(copy);else state.jobTemplates[index]=copy;if(!save())return;setTemplateDraft(structuredClone(copy));render("settings");showToast("Template saved for future jobs.");});
  document.addEventListener("submit",event=>{if(event.target.id!=="staff-form")return;event.preventDefault();const data=Object.fromEntries(new FormData(event.target)),required=["staffId","fullName","shortName","rank","department","role"];for(const field of required)data[field]=String(data[field]||"").trim();if(required.some(field=>!data[field])){showToast("Complete all staff fields.");return;}const duplicate=state.capacity.members.find(member=>member.id!==data.id&&(member.shortName.toLowerCase()===data.shortName.toLowerCase()||member.staffId.toLowerCase()===data.staffId.toLowerCase()));if(duplicate){showToast("Staff ID and short name must be unique.");return;}const targetUtilization=Number(data.targetUtilization);if(!Number.isFinite(targetUtilization)||targetUtilization<1||targetUtilization>150){showToast("Target utilization must be between 1% and 150%.");return;}let member=state.capacity.members.find(item=>item.id===data.id);if(member){const previous=member.shortName;Object.assign(member,{staffId:data.staffId,fullName:data.fullName,shortName:data.shortName,name:data.shortName,rank:data.rank,department:data.department,team:data.department,role:data.role,targetUtilization,code:staffCode(data.shortName)});if(previous!==data.shortName){state.jobs.forEach(job=>{if(job.owner===previous)job.owner=data.shortName;if(job.team)job.team=job.team.map(name=>name===previous?data.shortName:name);});state.timeline.projects.forEach(project=>project.items.forEach(item=>{if(item.owner===previous)item.owner=data.shortName;}));state.recurring.forEach(item=>{if(item.owner===previous)item.owner=data.shortName;});}}else{member={id:crypto.randomUUID(),staffId:data.staffId,fullName:data.fullName,shortName:data.shortName,name:data.shortName,rank:data.rank,department:data.department,team:data.department,role:data.role,targetUtilization,code:staffCode(data.shortName),email:"",weeklyHours:40,workDays:[1,1,1,1,1],allocations:[],leaves:[]};state.capacity.members.push(member);}state.capacity.unassigned.forEach(queue=>{const task=findTimelineItem(queue.jobId,queue.taskId).item;if(task?.owner===member.shortName)queue.team=member.department;});if(!save())return;refreshStaffSelects();$("#audit-panel")?.remove();render("settings");showToast(data.id?"Staff information updated.":"Staff member added.");});
  document.addEventListener("change",event=>{if(event.target.matches("#staff-rank")){staffRankFilter=event.target.value;render("settings");}if(event.target.matches("#staff-department")){staffDepartmentFilter=event.target.value;render("settings");}});
  document.addEventListener("change",event=>{const fields={"dashboard-period":"period","dashboard-service":"service","dashboard-staff":"staff","dashboard-job-status":"jobStatus","dashboard-job-stage":"jobStage","dashboard-task-status":"taskStatus","dashboard-deadline-status":"deadlineStatus"},key=fields[event.target.id];if(!key)return;dashboardFilters[key]=event.target.value;render("dashboard");});
  document.addEventListener("change",event=>{const key=event.target.dataset.dashboardSectionMetric;if(!key||!dashboardSectionFilters[key])return;dashboardSectionFilters[key].metric=event.target.value;render("dashboard");});

  const renderers = { settings:renderSettings, dashboard: renderDashboard, jobs: renderJobs, schedule: renderSchedule, clients: renderClients };

  function render(view = currentView) {
    if(!renderers[view])view="dashboard";
    currentView = view;
    $("#view-root").innerHTML = renderers[view]();
    $$(".nav-item").forEach(button => button.classList.toggle("active", button.dataset.view === view));
    $("#jobs-count").textContent = workingJobs().length;
    document.title = `${$(".page-head h1")?.textContent || "JobFlow"} — JobFlow`;
    $("#sidebar").classList.remove("open");
    syncTimerUI();
    for(const n of state.hiddenJobColumns||[]) $(".jobs-table-full tr").forEach(row=>{if(row.children[n-1])row.children[n-1].hidden=true;});
    const selectAll=$("[data-select-all]"); if(selectAll){const jobs=filteredJobs();selectAll.checked=jobs.length>0&&jobs.every(j=>selectedJobs.has(j.id));selectAll.indeterminate=jobs.some(j=>selectedJobs.has(j.id))&&!selectAll.checked;}
    if (view === "schedule" && scheduleFocusJobId) {
      const focusId = scheduleFocusJobId;
      requestAnimationFrame(() => {
        const row = document.querySelector(`[data-schedule-job="${focusId}"]`);
        row?.scrollIntoView({ behavior:"smooth", block:"center", inline:"nearest" });
        setTimeout(() => row?.classList.remove("schedule-focus"), 3200);
        scheduleFocusJobId = null;
      });
    }
  }

  function jobHours(job) {
    const estimated = job.tasks.reduce((sum,task)=>sum+(Number.parseFloat(task[2])||0),0);
    const used = Math.round(total(state.times.filter(t=>t.jobId===job.id),"hours")*100)/100;
    return { estimated, used, remaining:Math.max(0,Math.round((estimated-used)*10)/10) };
  }

  function renderJobOverview(job) {
    const remainingTasks = job.tasks.filter(task=>!task[1]).length;
    const remainingDays = Math.max(0,Math.ceil((new Date(`${job.due}T12:00:00`)-new Date(`${todayKey()}T12:00:00`))/86400000));
    const project=ensureJobPhaseHierarchy(job),tasks=project.items.filter(item=>item.type==="task"),subtaskCount=tasks.reduce((sum,task)=>sum+task.subtasks.length,0),checkCount=tasks.reduce((sum,task)=>sum+task.checklist.length+task.subtasks.reduce((n,subtask)=>n+subtask.checklist.length,0),0);
    return `<section class="job-overview-grid">
      <article class="overview-card wide"><div class="overview-card-head"><span>Delivery progress</span><strong class="on-track">${job.status}</strong></div><div class="time-value">${job.progress}<small>% complete</small></div><div class="overview-meter"><span style="width:${job.progress}%"></span></div><div class="meter-labels"><span>${job.tasks.length-remainingTasks} tasks complete</span><span>${remainingTasks} remaining</span></div></article>
      <article class="overview-card"><span>Work breakdown</span><div class="time-value">${job.tasks.length}<small> tasks</small></div><div class="profit-key"><span>${subtaskCount} sub-tasks</span><span>${checkCount} checklist items</span></div></article>
      <article class="overview-card margin-card"><span>Due date</span><strong>${shortDate(job.due)}</strong><small class="${remainingDays===0?"danger-text":"on-track"}">${remainingDays} days remaining</small></article>
    </section><div class="job-stat-strip"><div><span>Phases</span><strong>${project.items.filter(item=>item.type==="phase").length}</strong></div><div><span>Team members</span><strong>${job.team.length}</strong></div><div><span>Remaining tasks</span><strong>${remainingTasks}</strong></div><div><span>Remaining days</span><strong>${remainingDays}</strong></div></div>
    <div class="section-title"><h3>Job information</h3><span class="save-hint">Edit fields and save changes</span></div><form class="job-info-form" id="job-info-form"><input type="hidden" name="jobId" value="${job.id}"><label>Client<input name="client" value="${esc(job.client)}" required></label><label>Client size<select name="clientSize">${["Large","Medium","Small"].map(size=>`<option ${size===job.clientSize?"selected":""}>${size}</option>`).join("")}</select></label><label>Contact<input name="contact" value="${esc(job.contact)}"></label><label>Job name<input name="name" value="${esc(job.name)}" required></label><label>Client order number<input name="orderNo" value="${esc(job.orderNo)}"></label><label>Owner<select name="owner">${state.capacity.members.map(m=>`<option ${m.name===job.owner?"selected":""}>${esc(m.name)}</option>`).join("")}</select></label><label>Priority<select name="priority">${["low","medium","high"].map(p=>`<option ${p===job.priority?"selected":""}>${p}</option>`).join("")}</select></label><label>Start date<input type="date" name="start" value="${esc(job.start)}" required></label><label>Due date<input type="date" name="due" value="${esc(job.due)}" required></label><label>Start reminder<input type="date" name="startReminder" value="${esc(job.startReminder)}" required></label><label>Next deadline review<input type="date" name="deadlineReviewDate" value="${esc(job.deadlineReviewDate)}" required></label><label>Current stage<input value="${esc(jobStage(job))}" readonly></label><label>Template<input value="${esc(job.template||"Blank job")}" readonly><input type="hidden" name="template" value="${esc(job.template||"Blank job")}"></label><label>Budget (USD)<input type="number" name="budget" min="0" step="100" value="${job.budget}"></label><label>Recorded cost (USD)<input name="spent" type="number" min="0" step="0.01" value="${job.spent}"></label><label>Invoiced total (USD)<input name="billed" type="number" min="0" step="0.01" value="${job.billed}"></label><label>Forecast cost / hour (USD)<input name="costRate" type="number" min="0" step="0.01" value="${job.costRate??145}"></label><label class="field-wide recurring-check"><input type="checkbox" name="recurring" ${job.recurring?"checked":""}> Recurring job</label><label class="recurring-dependent">Frequency<select name="recurringCadence" ${job.recurring?"":"disabled"}>${["Weekly","Monthly","Quarterly","Annually"].map(value=>`<option ${value===(job.recurringCadence||"Monthly")?"selected":""}>${value}</option>`).join("")}</select></label><label class="recurring-dependent">Next occurrence<input type="date" name="nextOccurrence" value="${esc(job.nextOccurrence||job.start)}" ${job.recurring?"":"disabled"}></label><label class="field-wide">Description<textarea name="description" rows="3">${esc(job.description)}</textarea></label><div class="field-wide form-actions-inline"><button class="button primary" type="submit">Save job information</button></div></form>`;
  }

  function renderJobPhases(job) {
    const project = ensureJobPhaseHierarchy(job);
    const phases = project.items.filter(item => item.type === "phase").sort((a,b) => a.start - b.start);
    const checklistMarkup=(items,taskId,subtaskId="")=>items.map(item=>`<div class="checklist-row"><input type="checkbox" data-work-check="${item.id}" data-task-id="${taskId}" data-subtask-id="${subtaskId}" data-job-id="${job.id}" ${item.completed?"checked":""} aria-label="${item.completed?"Uncheck":"Check"} ${esc(item.text)}"><span class="work-type-badge checklist-badge">Checklist</span><span class="checklist-copy ${item.completed?"completed":""}">${esc(item.text)}</span><span class="nested-row-actions"><button type="button" class="text-btn" data-edit-checklist="${item.id}" data-task-id="${taskId}" data-subtask-id="${subtaskId}" data-job-id="${job.id}">Edit</button><button type="button" class="text-btn danger-text" data-delete-checklist="${item.id}" data-task-id="${taskId}" data-subtask-id="${subtaskId}" data-job-id="${job.id}">Delete</button></span></div>`).join("");
    const phaseCards = phases.map(phase => {
      const tasks = project.items.filter(item => item.type === "task" && item.parentPhaseId === phase.id).sort((a,b) => a.start - b.start);
      const progress = tasks.length ? Math.round(tasks.reduce((sum,task) => sum + task.progress,0) / tasks.length) : phase.progress;
      const status = progress === 100 ? "Complete" : progress > 0 ? "In progress" : "Planned";
      const taskRows = tasks.length ? tasks.map(task => {
        const taskIndex = job.tasks.findIndex(candidate => candidate[3]===task.id);
        const subtasks=(task.subtasks||[]).map(subtask=>`<article class="subtask-row"><input type="checkbox" data-subtask-check="${subtask.id}" data-task-id="${task.id}" data-job-id="${job.id}" ${subtask.completed?"checked":""} aria-label="${subtask.completed?"Reopen":"Complete"} ${esc(subtask.name)}"><span class="subtask-copy"><span class="work-type-badge subtask-badge">Sub-task</span><strong><button class="text-btn" data-edit-subtask="${subtask.id}" data-task-id="${task.id}" data-job-id="${job.id}">${esc(subtask.name)}</button></strong></span><span class="subtask-owner">${esc(subtask.owner)}</span><time class="subtask-deadline" datetime="${subtask.due}">${shortDate(subtask.due)}</time><span class="nested-row-actions"><button type="button" class="text-btn" data-edit-subtask="${subtask.id}" data-task-id="${task.id}" data-job-id="${job.id}">Edit</button><button type="button" class="text-btn danger-text" data-delete-subtask="${subtask.id}" data-task-id="${task.id}" data-job-id="${job.id}">Delete</button></span>${subtask.checklist?.length?`<div class="subtask-checklist-panel"><div class="nested-section-label">Checklist under ${esc(subtask.name)}</div><div class="work-check-list">${checklistMarkup(subtask.checklist,task.id,subtask.id)}</div></div>`:""}<button class="text-btn nested-add subtask-add-checklist" data-add-subtask-checklist="${subtask.id}" data-task-id="${task.id}" data-job-id="${job.id}">+ Checklist</button></article>`).join("");
        return `<section class="phase-task-block"><div class="phase-task-row"><input class="task-check" type="checkbox" ${task.progress===100?"checked":""} data-job-id="${job.id}" data-task="${taskIndex}" data-timeline-task="${task.id}" aria-label="${task.progress===100?"Reopen":"Complete"} ${esc(task.name)}"><span class="phase-task-name"><strong><button class="text-btn" data-manage-task="${task.id}" data-job-id="${job.id}">${esc(task.name)}</button></strong><small>Task · ${task.subtasks.length} sub-task${task.subtasks.length===1?"":"s"} · ${task.checklist.length} checklist item${task.checklist.length===1?"":"s"}</small></span><span>${esc(task.owner)}</span><span>${shortDate(task.due)}</span><span><span class="status ${statusClass(task.status)}">${task.status}</span><small>${task.progress}% complete</small></span><span class="task-row-actions"><button type="button" class="icon-btn" data-manage-task="${task.id}" data-job-id="${job.id}" aria-label="Edit ${esc(task.name)}">${icon("more")}</button><button type="button" class="icon-btn danger-text" data-delete-work-item="${task.id}" data-job-id="${job.id}" aria-label="Delete ${esc(task.name)}">${icon("x")}</button></span></div><div class="task-breakdown">${task.checklist.length?`<div class="task-checklist"><div class="nested-section-label">Task checklist</div><div class="work-check-list">${checklistMarkup(task.checklist,task.id)}</div></div>`:""}${subtasks}<div class="task-nested-actions"><button class="text-btn" data-add-subtask="${task.id}" data-job-id="${job.id}">+ Sub-task</button><button class="text-btn" data-add-task-checklist="${task.id}" data-job-id="${job.id}">+ Checklist</button></div></div></section>`;
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
    activeJobTab = tab;
    const tabs = [["information","Information"],["phases","Phases"],["milestones","Milestones"],["notes","Notes"],["documents","Documents"]];
    $("#drawer-content").innerHTML = `<div class="drawer-body"><p class="eyebrow">Job Manager / ${job.id}</p><div class="drawer-title-row"><div><h2>${job.id} · ${esc(job.name)}</h2><p>${esc(job.client)} · owned by ${esc(job.owner)} · due ${shortDate(job.due)}</p></div><span class="status ${statusClass(job.status)}">${job.status}</span></div><div class="drawer-actions job-action-bar"><div class="job-actions-wrap"><button class="button ghost job-actions-trigger" data-job-menu aria-haspopup="menu" aria-expanded="false">Job actions${icon("arrow-down")}</button><div class="job-actions-menu" id="job-actions-menu" role="menu" hidden><button role="menuitem" data-job-action="duplicate" data-job-id="${job.id}">${icon("file")}<span><strong>Duplicate job</strong><small>Create a new copy of this job</small></span></button><button role="menuitem" data-job-action="complete" data-job-id="${job.id}">${icon("check")}<span><strong>Mark complete</strong><small>Set progress to 100%</small></span></button><button role="menuitem" data-job-action="hold" data-job-id="${job.id}" ${job.status==="On hold"?"disabled":""}>${icon("clock")}<span><strong>On hold</strong><small>Pause work without cancelling the job</small></span></button><button class="danger" role="menuitem" data-job-action="cancel" data-job-id="${job.id}">${icon("x")}<span><strong>Cancel job</strong><small>Stop work on this job</small></span></button></div></div><button class="button ghost" data-print-job>${icon("file")}Print</button><button class="button ghost" data-drawer-tab="history">${icon("clock")}History</button><button class="button primary" data-timer-job="${esc(job.name)}">${icon("play")}Track time</button></div><nav class="drawer-tabs">${tabs.map(([key,label])=>`<button class="drawer-tab ${activeJobTab===key?"active":""}" data-drawer-tab="${key}">${label}</button>`).join("")}</nav><div class="drawer-tab-content">${renderJobTab(job)}</div></div>`;
    $("#detail-drawer").classList.add("open");
    $("#detail-drawer").setAttribute("aria-hidden", "false");
    $("#drawer-scrim").hidden = false;
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
    for (const phase of project.items.filter(i=>i.type==="phase")) {
      const children=project.items.filter(i=>i.parentPhaseId===phase.id);
      if(children.length) {phase.progress=Math.round(children.reduce((s,i)=>s+i.progress,0)/children.length);phase.status=phase.progress===100?"Complete":phase.progress?"In progress":"Planned";}
    }
    const work = project.items.filter(item=>item.type==="task");
    const job = getJob(project.jobId);
    if (!job) return;
    if (!work.length) {job.progress=0;if(job.status==="Complete")job.status="Planning";return;}
    const progress = Math.round(work.reduce((sum,item)=>sum+item.progress,0)/work.length);
    job.progress = progress;
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
    job.status = column.dataset.status;
    if (job.status === "Complete") {job.progress = 100;ensureJobPhaseHierarchy(job).items.forEach(i=>{i.progress=100;i.status="Complete";});}
    auditHistory(job);
    if(!save())return; render("jobs"); showToast(`${job.id} moved to ${job.status}.`);
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
  syncRelations();
  refreshStaffSelects();
  refreshClientSelects();
  if(window.JOBFLOW_CLOUD) lastSavedState=JSON.stringify(state);
  else if(seededBoardViews||seededDemoData||maskedDemoNames||migratedRecurringJobs)save();else lastSavedState=JSON.stringify(state);
  render();
})();
