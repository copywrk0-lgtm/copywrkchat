"use client";

import { useEffect, useState } from "react";
import MenuOverlay from "./MenuOverlay";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.menuOpen = open ? "true" : "false";
    return () => { delete document.body.dataset.menuOpen; };
  }, [open]);

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Copywrk home">
          COPYWRK<sup>®</sup>
        </a>
        <div className="topbar-center">INDEPENDENT DIGITAL STUDIO</div>
        <div className="topbar-actions">
          <a className="header-project-link" href="mailto:hello@copywrk.website">Start a project ↗</a>
          <button
            className="menu-trigger"
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
