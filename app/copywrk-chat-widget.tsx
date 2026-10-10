"use client";

import { useEffect, useRef, useState } from "react";
import "./copywrk-chat-widget.css";

/** Small on-page launcher. The assistant itself loads only when opened. */
export default function CopywrkChatWidget() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  const chatFrame = useRef<HTMLIFrameElement>(null);

  function show() { setLoaded(true); setOpen(true); }
  function hide() { setOpen(false); launcher.current?.focus(); }

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) { if (event.key === "Escape" && open) hide(); }
    function handleMessage(event: MessageEvent) {
      if (event.origin === window.location.origin &&
          event.source === chatFrame.current?.contentWindow &&
          event.data?.type === "copywrk-chat-close") hide();
    }
    window.addEventListener("keydown", handleEscape);
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("message", handleMessage);
    };
  }, [open]);

  return (
    <aside className="cw-chat-root" aria-label="Copywrk website assistant">
      <section
        className={`cw-chat-panel ${open ? "cw-visible" : ""}`}
        id="copywrk-assistant-panel"
        role="dialog"
        aria-label="Chat with Copywrk"
        aria-hidden={!open}
        inert={!open}
      >
        {loaded ? (
          <iframe
            ref={chatFrame}
            title="Chat with Copywrk — project enquiries"
            src="/copywrk-chat/embed.html"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : null}
      </section>
      <button
        className="cw-chat-launcher"
        ref={launcher}
        type="button"
        aria-controls="copywrk-assistant-panel"
        aria-expanded={open}
        aria-label={open ? "Close Copywrk chat" : "Ask Copywrk a question"}
        onClick={() => open ? hide() : show()}
      >
        <span className="cw-chat-pulse" aria-hidden="true" />
        <span className="cw-chat-label">{open ? "CLOSE CHAT" : "ASK COPYWRK"}</span>
        <span className="cw-chat-bubble" aria-hidden="true">
          {open
            ? <svg viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            : <svg viewBox="0 0 24 24" fill="none"><path d="M4 5h16v12H9l-5 3V5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M8 10h8m-8 3h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>}
        </span>
      </button>
    </aside>
  );
}
