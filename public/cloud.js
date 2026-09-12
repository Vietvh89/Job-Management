(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const message = text => { $('cloud-auth-message').textContent = text; };
  let client, loaded = false, loading = false, saving = false, blocked = false;
  let revision = 0, pendingPayload = null, activeEmail = '';
  let pollTimer;
  let polling=false;
  const authError = error => error?.code==='PGRST301'||error?.status===401;
  function requestLogin(text){
    blocked=true;
    document.body.classList.add('cloud-locked');$('cloud-auth').hidden=false;message(text);
  }
  const api = async (action,args={}) => {
    const {data,error}=await client.rpc('jobflow_access',{action,args}).abortSignal(AbortSignal.timeout(25000));
    if(error) throw error;
    return data;
  };
  const dialog = $('cloud-saving');
  const form = $('cloud-login');
  function failSave(text) {
    blocked = true; saving = false;
    $('cloud-save-title').textContent = 'Chưa xác nhận lưu thành công';
    $('cloud-save-message').textContent = text;
    $('cloud-recovery').hidden = false;
    $('cloud-status').textContent = 'Cần xử lý thay đổi chưa lưu';
    if (!dialog.open) dialog.showModal();
  }
  function download(payload) {
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));
    const a=document.createElement('a');a.href=url;a.download='jobflow-unsaved-changes.json';a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  async function persist(payload) {
    try {
      const data = await api('save',{payload,revision,accessVersion:window.JOBFLOW_CLOUD.accessVersion});
      if(!data?.revision) {
        failSave('Dữ liệu đã được người khác sửa hoặc quyền truy cập đã thay đổi. Không ghi đè dữ liệu máy chủ. Tải bản thay đổi về máy rồi tải lại để kiểm tra.');return;
      }
      revision=data.revision;pendingPayload=null;saving=false;
      window.JOBFLOW_CLOUD.onSaved?.(data.payload);
      $('cloud-status').textContent='Đã lưu lúc '+new Date(data.updated_at).toLocaleTimeString();
      dialog.close();
    } catch {
      failSave('Mất kết nối hoặc máy chủ từ chối lưu. Trạng thái có thể chưa được xác nhận. Hãy tải bản thay đổi về máy trước khi tải lại; không tự động ghi đè hoặc thử lại.');
    }
  }
  async function loadWorkspace(session) {
    if (loaded || loading || !session) return;
    loading=true;message('Đang tải dữ liệu…');
    try {
      const membership=await api('load');
      if(!membership) {message('Email này chưa được cấp quyền. Hãy liên hệ quản trị viên.');await client.auth.signOut();return;}
      const row=membership;
      if(!row?.payload?.jobs || !row.payload.capacity || !row.payload.timeline) throw new Error('Dữ liệu chưa được khởi tạo.');
      revision=row.revision;activeEmail=membership.email;
      window.JOBFLOW_CLOUD={initialState:row.payload,email:membership.email,role:membership.role,staffId:membership.staffId,permissions:membership.permissions,accessVersion:membership.accessVersion,
        groups:membership.groups||[],members:membership.members||[],
        async saveStaff(member,groupId){
          if(saving||blocked)throw new Error('Vui lòng chờ thay đổi hiện tại được lưu.');
          saving=true;
          try{
            let response=await client.rpc('jobflow_save_staff',{args:{member,groupId,revision}}).abortSignal(AbortSignal.timeout(25000));
            if(response.error?.code==='PT409'||response.error?.status===409){
              const fresh=await api('load');revision=fresh.revision;
              Object.assign(this,{groups:fresh.groups||[],members:fresh.members||[],permissions:fresh.permissions,accessVersion:fresh.accessVersion});
              response=await client.rpc('jobflow_save_staff',{args:{member,groupId,revision}}).abortSignal(AbortSignal.timeout(25000));
            }
            if(authError(response.error)){
              const refreshed=await client.auth.refreshSession();
              if(refreshed.error||!refreshed.data.session){requestLogin('Phiên đăng nhập đã hết hạn. Đăng nhập lại để giữ nguyên form và tiếp tục lưu.');throw new Error('Phiên đăng nhập đã hết hạn. Nội dung đang nhập vẫn được giữ nguyên.');}
              response=await client.rpc('jobflow_save_staff',{args:{member,groupId,revision}}).abortSignal(AbortSignal.timeout(25000));
            }
            const {data,error}=response;if(error)throw error;
            if(!data?.payload||!data?.revision)throw new Error('Máy chủ chưa xác nhận lưu nhân sự.');
            revision=data.revision;
            Object.assign(this,{groups:data.groups||this.groups,members:data.members||this.members,permissions:data.permissions||this.permissions,accessVersion:data.accessVersion??this.accessVersion});
            $('cloud-status').textContent='Đã lưu nhân sự và Group Access';
            return data;
          }catch(error){
            $('cloud-status').textContent='Chưa lưu nhân sự — kiểm tra thông báo trong form';
            throw error;
          }finally{saving=false;}
        },
        async setStaffPassword(email,password){
          if(this.role!=='admin')throw new Error('Only Account Owners can manage login passwords.');
          const {data,error}=await client.functions.invoke('jobflow-user-password',{body:{email,password},signal:AbortSignal.timeout(25000)});
          if(error){
            let detail=error.message;
            try{const payload=await error.context?.json();if(payload?.error)detail=payload.error;}catch{}
            throw new Error(detail||'The login password could not be updated.');
          }
          if(!data?.ok)throw new Error(data?.error||'The login password could not be updated.');
          return data;
        },
        async manage(action,args){
          if(saving||blocked)throw new Error('Vui lòng chờ thay đổi hiện tại được lưu.');
          saving=true;
          try {
            await api(action,{...args,revision});
            const fresh=await api('load');revision=fresh.revision;
            Object.assign(this,{groups:fresh.groups||[],members:fresh.members||[],permissions:fresh.permissions,accessVersion:fresh.accessVersion});
            return fresh;
          } finally {saving=false;}
        },save(payload){
        if(saving||blocked) return false;
        if(membership.role!=='admin'&&!Object.entries(this.permissions||{}).some(([key,value])=>key!=='jobManager'&&Number(value)>=2)) {alert('Tài khoản này chỉ có quyền xem.');return false;}
        if(new Blob([JSON.stringify(payload)]).size>7500000) {alert('Dữ liệu vượt giới hạn lưu 7,5 MB. Hãy giảm dung lượng tài liệu đính kèm.');return false;}
        pendingPayload=payload;saving=true;
        $('cloud-save-title').textContent='Đang lưu dữ liệu…';
        $('cloud-save-message').textContent='Vui lòng chờ máy chủ xác nhận.';
        $('cloud-recovery').hidden=true;dialog.showModal();
        $('cloud-status').textContent='Đang lưu…';
        void persist(payload);return true;
      }};
      const script=document.createElement('script');script.src='./app.js?v=20260912-todo-1';
      await new Promise((resolve,reject)=>{script.onload=resolve;script.onerror=()=>reject(new Error('Không tải được ứng dụng.'));document.body.appendChild(script);});
      loaded=true;$('cloud-auth').hidden=true;document.body.classList.remove('cloud-locked');
      $('cloud-bar').hidden=false;$('cloud-user').textContent=membership.email+' · '+membership.role;
      $('cloud-status').textContent='Đã kết nối dữ liệu chung';
      const profile=document.querySelector('.profile strong');if(profile)profile.textContent=membership.email;
      const role=document.querySelector('.profile small');if(role)role.textContent=membership.role;
      pollTimer=setInterval(async()=>{
        if(saving||blocked||polling||document.hidden)return;
        polling=true;
        try {
          const data=await api('status');
          if(saving||blocked)return;
          if(data.accessVersion!==window.JOBFLOW_CLOUD.accessVersion){$('cloud-status').textContent='Quyền truy cập đã thay đổi — bấm Tải dữ liệu mới';return;}
          if(data.revision!==revision)$('cloud-status').textContent='Có dữ liệu mới — bấm Tải dữ liệu mới';
        } catch(error) {
          if(saving||blocked)return;
          $('cloud-status').textContent=authError(error)?'Phiên cần được xác nhận lại khi lưu — nội dung đang nhập được giữ nguyên':'Kết nối tạm gián đoạn — nội dung đang nhập được giữ nguyên';
        } finally {polling=false;}
      },15000);
    } catch(error) {message('Không thể tải dữ liệu. '+(error?.message||'Kiểm tra kết nối rồi thử lại.'));}
    finally {loading=false;}
  }
  dialog.addEventListener('cancel',event=>event.preventDefault());
  $('cloud-download').onclick=()=>pendingPayload&&download(pendingPayload);
  $('cloud-reload').onclick=()=>{if(confirm('Tải lại sẽ bỏ thay đổi chưa lưu trên màn hình. Bạn đã tải bản thay đổi cần giữ chưa?'))location.reload();};
  $('cloud-refresh').onclick=()=>{if(!saving&&confirm('Tải dữ liệu mới? Nội dung đang nhập nhưng chưa lưu sẽ bị bỏ.'))location.reload();};
  $('cloud-auth-reload').onclick=()=>location.reload();
  $('cloud-logout').onclick=async()=>{if(saving||blocked)return;const {error}=await client.auth.signOut();if(error)alert('Chưa đăng xuất được. Hãy thử lại.');};
  window.addEventListener('beforeunload',event=>{if(saving||blocked){event.preventDefault();event.returnValue='';}});
  function busy(value){for(const button of form.querySelectorAll('button'))button.disabled=value;}
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(!client)return;busy(true);message('Đang đăng nhập…');
    try {const {data,error}=await client.auth.signInWithPassword({email:form.elements.email.value.trim(),password:form.elements.password.value});
      if(error)throw error;form.elements.password.value='';
      if(loaded&&data.session.user.email?.toLowerCase()===activeEmail){blocked=false;$('cloud-auth').hidden=true;document.body.classList.remove('cloud-locked');$('cloud-status').textContent='Đã xác nhận lại phiên — bấm Save changes để lưu';}
      else await loadWorkspace(data.session);
    }catch(error){message(error.message||'Không đăng nhập được.');}finally{busy(false);}
  });
  try {
    if(!window.supabase?.createClient)throw new Error('Không tải được thư viện đăng nhập.');
    client=window.supabase.createClient(window.JOBFLOW_CONFIG.url,window.JOBFLOW_CONFIG.publishableKey,{db:{retry:false},auth:{storageKey:'jobflow-supabase-auth',persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    client.auth.onAuthStateChange((event,session)=>{
      if(event==='SIGNED_OUT'&&loaded){requestLogin('Phiên đăng nhập đã hết hạn. Đăng nhập lại để giữ nguyên nội dung đang nhập.');}
      else if(session&&loaded&&session.user.email?.toLowerCase()!==activeEmail)location.reload();
      else if(session&&!loaded)setTimeout(()=>void loadWorkspace(session),0);
    });
    client.auth.getSession().then(({data,error})=>{if(error)message(error.message);else if(data.session)void loadWorkspace(data.session);else message('Nhập email và mật khẩu để tiếp tục.');}).catch(()=>message('Không kết nối được dịch vụ đăng nhập.'));
  } catch(error) {message(error.message);}
})();
