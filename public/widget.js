/**
 * Copywrk Chat universal embed loader. Add to any site:
 * <script src="https://YOUR-CHAT-HOST/widget.js" defer></script>
 * Optional: data-label="Ask us anything".
 */
(function () {
  if (window.__copywrkChatInstalled) return;
  window.__copywrkChatInstalled=true;
  var script=document.currentScript;
  if (!script) return;
  var base=new URL('.',script.src).origin;
  var label=script.getAttribute('data-label')||'Have a question?';
  var css=document.createElement('style');
  css.textContent=`
    #cw-launcher{position:fixed;bottom:24px;right:24px;z-index:2147483000;border:1px solid #1f281c;background:#d4fa85;color:#101510;display:flex;align-items:center;gap:12px;border-radius:100px;padding:11px 16px 11px 12px;cursor:pointer;box-shadow:0 12px 34px rgba(0,0,0,.17);font-family:Arial,sans-serif;font-size:13px;font-weight:700;transition:transform .18s ease,box-shadow .18s ease}
    #cw-launcher:hover{transform:translateY(-3px);box-shadow:0 17px 35px rgba(0,0,0,.22)}
    #cw-launcher svg{width:25px;height:25px}
    #cw-frame-wrap{position:fixed;right:24px;bottom:89px;z-index:2147482999;width:390px;height:min(650px,calc(100dvh - 114px));border:1px solid rgba(0,0,0,.13);border-radius:17px;background:#f8f8f3;overflow:hidden;box-shadow:0 25px 85px rgba(0,0,0,.3);opacity:0;transform:translateY(12px) scale(.98);pointer-events:none;transition:opacity .22s ease,transform .22s ease}
    #cw-frame-wrap.cw-open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}
    #cw-frame-wrap iframe{display:block;width:100%;height:100%;border:0;background:#f7f7f1}
    #cw-launcher:focus-visible{outline:3px solid #31501f;outline-offset:3px}
    @media(max-width:520px){#cw-frame-wrap{inset:0;width:100%;height:100dvh;border:0;border-radius:0;bottom:auto;right:auto}#cw-launcher{right:15px;bottom:15px}#cw-launcher.cw-active{display:none}}
    @media(prefers-reduced-motion:reduce){#cw-launcher,#cw-frame-wrap{transition:none!important}}
  `;
  document.head.appendChild(css);
  var launcher=document.createElement('button');
  launcher.id='cw-launcher';launcher.type='button';launcher.setAttribute('aria-label','Open website chat');launcher.setAttribute('aria-expanded','false');
  launcher.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true" fill="none"><path d="M16 2.5v27M2.5 16h27M6.5 6.5l19 19m0-19-19 19" stroke="#1B2417" stroke-width="3" stroke-linecap="round"/></svg><span></span>';
  launcher.querySelector('span').textContent=label;
  var wrap=document.createElement('div');wrap.id='cw-frame-wrap';wrap.setAttribute('aria-hidden','true');
  var frame=document.createElement('iframe');frame.title='Copywrk Chat assistant';frame.loading='lazy';frame.src=base+'/embed';
  wrap.appendChild(frame);
  function setOpen(open){wrap.classList.toggle('cw-open',open);launcher.classList.toggle('cw-active',open);wrap.setAttribute('aria-hidden',String(!open));launcher.setAttribute('aria-expanded',String(open));launcher.querySelector('span').textContent=open?'Close chat':label;launcher.setAttribute('aria-label',open?'Close website chat':'Open website chat');if(open){setTimeout(function(){try{frame.contentWindow.focus()}catch(e){}},140)}}
  launcher.addEventListener('click',function(){setOpen(!wrap.classList.contains('cw-open'))});
  window.addEventListener('message',function(event){if(event.origin===base && event.source===frame.contentWindow && event.data && event.data.type==='copywrk-chat-close')setOpen(false)});
  document.addEventListener('keydown',function(event){if(event.key==='Escape' && wrap.classList.contains('cw-open'))setOpen(false)});
  document.body.append(wrap,launcher);
})();
