"use client";

const links = [
  ["01", "Work", "#work"],
  ["02", "Approach", "#method"],
  ["03", "Capabilities", "#capabilities"],
  ["04", "Contact", "#contact"],
] as const;

export default function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <aside id="site-menu" className={`menu-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="menu-background-word" aria-hidden="true">COPYWRK</div>
      <div className="menu-meta"><span>MENU / INDEX</span><span>INDIA → WORLDWIDE</span></div>
      <nav className="menu-nav" aria-label="Primary navigation">
        {links.map(([index, label, href]) => (
          <a key={href} href={href} onClick={onClose} tabIndex={open ? 0 : -1}>
            <span>{index}</span><strong>{label}</strong><i>↗</i>
          </a>
        ))}
      </nav>
      <div className="menu-footer">
        <a href="mailto:hello@copywrk.website" tabIndex={open ? 0 : -1}>hello@copywrk.website ↗</a>
        <span>DESIGN / DEVELOPMENT / MOTION</span>
      </div>
    </aside>
  );
}
