(() => {
  const $=id=>document.getElementById(id);
  const messagesEl=$('messages'), suggestionsEl=$('suggestions'), textInput=$('chat-input');
  const chatForm=$('chat-form'), leadForm=$('lead-form');
  const isPreview=new URLSearchParams(location.search).get('preview')==='1';
  const cacheKey='copywrk-chat-session-v1';
  let messages=[],busy=false,config=null,visitorId='';
  try { visitorId=sessionStorage.getItem('copywrk-visitor-id')||crypto.randomUUID();sessionStorage.setItem('copywrk-visitor-id',visitorId); } catch{visitorId='ephemeral'}
  if(isPreview) $('close-btn').style.display='none';
  function scrollBottom() { requestAnimationFrame(()=>{messagesEl.scrollTop=messagesEl.scrollHeight;}); }
  function saveHistory(){try{sessionStorage.setItem(cacheKey,JSON.stringify(messages.slice(-16)))}catch{}}
  function addBubble(role,content,save=true){
    const row=document.createElement('div');row.className='message-row '+role;
    if(role==='assistant'){const avatar=document.createElement('div');avatar.className='msg-avatar';avatar.textContent='✳';avatar.setAttribute('aria-hidden','true');row.appendChild(avatar)}
    const bubble=document.createElement('div');bubble.className='bubble';bubble.textContent=content;row.appendChild(bubble);
    messagesEl.appendChild(row);scrollBottom();
    if(save){messages.push({role,content});saveHistory()}
    return row;
  }
  function toggleBusy(isBusy){busy=isBusy;textInput.disabled=isBusy;$('send-btn').disabled=isBusy;suggestionsEl.querySelectorAll('button').forEach(b=>b.disabled=isBusy)}
  function typing(){const row=document.createElement('div');row.className='message-row assistant';const avatar=document.createElement('div');avatar.className='msg-avatar';avatar.textContent='✳';const bubble=document.createElement('div');bubble.className='typing-bubble';bubble.innerHTML='<i></i><i></i><i></i>';row.append(avatar,bubble);messagesEl.appendChild(row);scrollBottom();return row;}
  async function sendMessage(text){
    text=text.trim();if(!text || busy)return;
    suggestionsEl.classList.add('collapsed');addBubble('user',text);textInput.value='';toggleBusy(true);
    const indicator=typing();
    try {
      const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),22000);
      let response;
      try {response=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:messages.slice(-16)}),signal:controller.signal})}finally{clearTimeout(timeout)}
      const result=await response.json();
      if(!response.ok)throw new Error(result.error||'Something went wrong.');
      indicator.remove();addBubble('assistant',result.reply);
      if(messages.length>=5){$('brief-btn').classList.add('attention')}
    }catch(e){indicator.remove();addBubble('assistant',e.name==='AbortError'?'That took too long. Please try again or send a project brief.':(e.message||'Something went wrong.'))}
    finally{toggleBusy(false);textInput.focus();}
  }
  function showBrief(show){$('brief-overlay').classList.toggle('hidden',!show);$('form-error').classList.add('hidden');if(show){$('lead-name').focus()}else{textInput.focus()}}
  function showSuggestions(labels){suggestionsEl.replaceChildren();(labels||[]).slice(0,4).forEach(label=>{const btn=document.createElement('button');btn.type='button';btn.textContent=label;btn.addEventListener('click',()=>sendMessage(label));suggestionsEl.appendChild(btn)})}
  $('brief-btn').addEventListener('click',()=>showBrief(true));
  $('back-btn').addEventListener('click',()=>showBrief(false));
  $('success-back').addEventListener('click',()=>showBrief(false));
  $('close-btn').addEventListener('click',()=>{if(window.parent!==window)window.parent.postMessage({type:'copywrk-chat-close'},window.location.origin)});
  document.addEventListener('keydown',event=>{if(event.key==='Escape' && window.parent!==window) window.parent.postMessage({type:'copywrk-chat-close'},window.location.origin)});
  chatForm.addEventListener('submit',e=>{e.preventDefault();sendMessage(textInput.value)});
  $('handoff-btn').addEventListener('click',()=>{if(config?.handoffUrl)window.open(config.handoffUrl,'_blank','noopener,noreferrer');else addBubble('assistant','WhatsApp isn’t connected yet. You can still send your brief here.')});
  leadForm.addEventListener('submit',async event=>{
    event.preventDefault();if(!leadForm.reportValidity())return;
    const button=$('lead-submit'),errorEl=$('form-error');errorEl.classList.add('hidden');
    button.disabled=true;button.querySelector('span').textContent='···';
    const fd=new FormData(leadForm);
    const payload={name:fd.get('name'),contact:fd.get('contact'),projectType:fd.get('projectType'),budget:fd.get('budget'),timeline:fd.get('timeline'),message:fd.get('message'),consent:$('lead-consent').checked,companySite:fd.get('companySite'),visitorId};
    try{
      const resp=await fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      const result=await resp.json();if(!resp.ok)throw new Error(result.error||'Could not send your brief.');
      $('brief-content').classList.add('hidden');$('brief-success').classList.remove('hidden');
      $('success-description').textContent=result.storage==='local-demo-file'?'This brief was saved in the local demo inbox. Email notifications are not configured yet.':result.notificationDelivered?'Your brief has been received and the team has been notified.':'Your brief has been saved for the Copywrk team.';
      addBubble('assistant','Your project brief has been received. Thank you for telling us about it!');
      try{sessionStorage.removeItem(cacheKey)}catch{}
    }catch(e){
      errorEl.textContent=(e.message||'Unable to send your brief.')+' You can send it manually via WhatsApp below.';
      errorEl.classList.remove('hidden');
      let fallback=$('lead-manual-fallback');
      if(!fallback){
        fallback=document.createElement('button');fallback.type='button';fallback.id='lead-manual-fallback';fallback.className='manual-fallback';fallback.textContent='Send brief via WhatsApp ↗';
        errorEl.insertAdjacentElement('afterend',fallback);
      }
      fallback.onclick=()=>{
        const note=`Hi Copywrk, I'd like to discuss a project.\nName: ${payload.name}\nContact: ${payload.contact}\nService: ${payload.projectType}\nBudget: ${payload.budget||'Not sure'}\nTimeline: ${payload.timeline||'Flexible'}\nDetails: ${payload.message||'To discuss'}`;
        const whatsappNumber=(config?.handoffUrl||'').match(/wa\.me\/(\d+)/)?.[1];
        if(whatsappNumber)window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(note)}`,'_blank','noopener,noreferrer');
        else window.location.href=`mailto:copywrk0@gmail.com?subject=${encodeURIComponent('Copywrk project brief')}&body=${encodeURIComponent(note)}`;
      };
    }
    finally{button.disabled=false;button.querySelector('span').textContent='↗'}
  });
  async function init(){
    try{
      const response=await fetch('/api/chat-config',{cache:'no-store'});if(!response.ok)throw new Error('Config unavailable');config=await response.json();
      $('mode-label').textContent=config.mode==='ai'?'AI ASSISTANT':'SCRIPTED DEMO';
      $('privacy-note').textContent=config.mode==='ai'?'Messages are processed by an AI provider to answer you. Please avoid sharing sensitive details.':'Scripted demo: chat history stays in this browser session. Please avoid sharing sensitive details.';
      document.querySelector('.header-name').firstChild.textContent=config.brand+' ';
      let stored=null;try{stored=sessionStorage.getItem(cacheKey)}catch{}
      if(stored){try{const records=JSON.parse(stored);if(Array.isArray(records)&&records.length){records.forEach(m=>{if(['user','assistant'].includes(m.role)&&typeof m.content==='string')addBubble(m.role,m.content,false)});messages=records;}}catch{sessionStorage.removeItem(cacheKey)}}
      if(!messages.length)addBubble('assistant',config.welcome);
      showSuggestions(config.quickReplies);
      $('handoff-btn').classList.toggle('hidden',!config.hasWhatsApp);
    }catch(e){$('mode-label').textContent='OFFLINE';addBubble('assistant','I can’t connect right now. You can email copywrk0@gmail.com or use WhatsApp to speak to the studio.');showSuggestions([])}
  }
  init();
})();
