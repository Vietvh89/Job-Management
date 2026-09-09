(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const message = text => { $('cloud-auth-message').textContent = text; };
  let client, loaded = false, loading = false, saving = false, blocked = false;
  let revision = 0, pendingPayload = null, activeEmail = '';
  let pollTimer;
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
      const {data,error} = await client.from('jobflow_workspace').update({payload,revision:revision+1})
        .eq('id','main').eq('revision',revision).select('revision,updated_at').abortSignal(AbortSignal.timeout(25000));
      if(error) throw error;
      if(!data?.length) {
        failSave('Dữ liệu đã được người khác sửa hoặc quyền truy cập đã thay đổi. Không ghi đè dữ liệu máy chủ. Tải bản thay đổi về máy rồi tải lại để kiểm tra.');return;
      }
      revision=data[0].revision;pendingPayload=null;saving=false;
      $('cloud-status').textContent='Đã lưu lúc '+new Date(data[0].updated_at).toLocaleTimeString();
      dialog.close();
    } catch {
      failSave('Mất kết nối hoặc máy chủ từ chối lưu. Trạng thái có thể chưa được xác nhận. Hãy tải bản thay đổi về máy trước khi tải lại; không tự động ghi đè hoặc thử lại.');
    }
  }
  async function loadWorkspace(session) {
    if (loaded || loading || !session) return;
    loading=true;message('Đang tải dữ liệu…');
    try {
      const {data:membership,error:memberError}=await client.from('jobflow_members').select('email,role').maybeSingle().abortSignal(AbortSignal.timeout(15000));
      if(memberError) throw memberError;
      if(!membership) {message('Email này chưa được cấp quyền. Hãy liên hệ quản trị viên.');await client.auth.signOut();return;}
      const {data:row,error}=await client.from('jobflow_workspace').select('payload,revision').eq('id','main').single().abortSignal(AbortSignal.timeout(20000));
      if(error || !row?.payload?.jobs || !row.payload.capacity || !row.payload.timeline) throw error || new Error('Dữ liệu chưa được khởi tạo.');
      revision=row.revision;activeEmail=membership.email;
      window.JOBFLOW_CLOUD={initialState:row.payload,email:membership.email,role:membership.role,save(payload){
        if(saving||blocked) return false;
        if(membership.role==='viewer') {alert('Tài khoản này chỉ có quyền xem.');return false;}
        if(new Blob([JSON.stringify(payload)]).size>7500000) {alert('Dữ liệu vượt giới hạn lưu 7,5 MB. Hãy giảm dung lượng tài liệu đính kèm.');return false;}
        pendingPayload=payload;saving=true;
        $('cloud-save-title').textContent='Đang lưu dữ liệu…';
        $('cloud-save-message').textContent='Vui lòng chờ máy chủ xác nhận.';
        $('cloud-recovery').hidden=true;dialog.showModal();
        $('cloud-status').textContent='Đang lưu…';
        void persist(payload);return true;
      }};
      const script=document.createElement('script');script.src='./app.js';
      await new Promise((resolve,reject)=>{script.onload=resolve;script.onerror=()=>reject(new Error('Không tải được ứng dụng.'));document.body.appendChild(script);});
      loaded=true;$('cloud-auth').hidden=true;document.body.classList.remove('cloud-locked');
      $('cloud-bar').hidden=false;$('cloud-user').textContent=membership.email+' · '+membership.role;
      $('cloud-status').textContent='Đã kết nối dữ liệu chung';
      const profile=document.querySelector('.profile strong');if(profile)profile.textContent=membership.email;
      const role=document.querySelector('.profile small');if(role)role.textContent=membership.role;
      pollTimer=setInterval(async()=>{
        if(saving||blocked||document.hidden)return;
        try {
          const {data,error}=await client.from('jobflow_workspace').select('revision').eq('id','main').maybeSingle().abortSignal(AbortSignal.timeout(10000));
          if(error||!data) {$('cloud-status').textContent='Không thể kiểm tra dữ liệu mới';return;}
          if(data.revision!==revision)$('cloud-status').textContent='Có dữ liệu mới — bấm Tải dữ liệu mới';
        } catch {$('cloud-status').textContent='Mất kết nối';}
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
      if(error)throw error;form.elements.password.value='';await loadWorkspace(data.session);
    }catch(error){message(error.message||'Không đăng nhập được.');}finally{busy(false);}
  });
  $('cloud-signup').onclick=async()=>{
    if(!client||!form.reportValidity())return;busy(true);message('Đang tạo tài khoản…');
    try {const {data,error}=await client.auth.signUp({email:form.elements.email.value.trim(),password:form.elements.password.value,options:{emailRedirectTo:location.origin+'/'}});
      if(error)throw error;form.elements.password.value='';
      if(data.session)await loadWorkspace(data.session);else message('Kiểm tra email và xác nhận tài khoản, sau đó quay lại đây đăng nhập. Nếu chưa nhận email, liên hệ quản trị viên kiểm tra cấu hình gửi mail.');
    }catch(error){message(error.message||'Không tạo được tài khoản.');}finally{busy(false);}
  };
  try {
    if(!window.supabase?.createClient)throw new Error('Không tải được thư viện đăng nhập.');
    client=window.supabase.createClient(window.JOBFLOW_CONFIG.url,window.JOBFLOW_CONFIG.publishableKey,{auth:{storageKey:'jobflow-supabase-auth',persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    client.auth.onAuthStateChange((event,session)=>{
      if(event==='SIGNED_OUT'&&loaded){clearInterval(pollTimer);document.body.classList.add('cloud-locked');$('cloud-auth').hidden=false;location.reload();}
      else if(session&&loaded&&session.user.email?.toLowerCase()!==activeEmail)location.reload();
      else if(session&&!loaded)setTimeout(()=>void loadWorkspace(session),0);
    });
    client.auth.getSession().then(({data,error})=>{if(error)message(error.message);else if(data.session)void loadWorkspace(data.session);else message('Nhập email và mật khẩu để tiếp tục.');}).catch(()=>message('Không kết nối được dịch vụ đăng nhập.'));
  } catch(error) {message(error.message);}
})();
