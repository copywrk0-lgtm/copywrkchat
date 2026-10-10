"use client";

import { useEffect, useRef, useState } from "react";
import "./copywrk-chat-widget.css";

/** The assistant is an unobtrusive overlay. It never navigates away from the portfolio. */
export default function CopywrkChatWidget() {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const show = () => { setStarted(true); setOpen(true); };
  const hide = () => { setOpen(false); buttonRef.current?.focus(); };

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) hide();
    };
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== iframeRef.current?.contentWindow) return;
      if (event.data?.type === "copywrk-chat-close") hide();
    };
    window.addEventListener("keydown", keydown);
    window.addEventListener("message", receive);
    return () => {
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("message", receive);
    };
  }, [open]);

  return (
    <aside className="cw-chat-root" aria-label="Copywrk website assistant">
      <section
        className={`cw-chat-panel ${open ? "is-visible" : ""}`}
        id="copywrk-assistant-panel"
        role="dialog"
        aria-label="Chat with Copywrk"
        aria-hidden={!open}
        inert={!open}
      >
        {started ? (
          <iframe
            ref={iframeRef}
            title="Copywrk project enquiry assistant"
            src="/copywrk-chat/embed.html"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : null}
      </section>
      <button
        type="button"
        ref={buttonRef}
        className={`cw-chat-launcher ${open ? "is-open" : ""}`}
        aria-controls="copywrk-assistant-panel"
        aria-expanded={open}
        aria-label={open ? "Close Copywrk chat" : "Chat with Copywrk"}
        onClick={() => open ? hide() : show()}
      >
        <span className="cw-chat-indicator" aria-hidden="true" />
        <span className="cw-chat-launcher-label">{open ? "CLOSE CHAT" : "ASK COPYWRK"}</span>
        <span className="cw-chat-icon" aria-hidden="true">
          {open ? (
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none"><path d="M4 5.5h16v11H9l-5 3v-14Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          )}
        </span>
      </button>
    </aside>
  );
}
