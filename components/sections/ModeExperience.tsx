import SectionIndex from "@/components/ui/SectionIndex";
import { modeContent } from "@/data/modes";
import type { Mode } from "@/lib/types";

export default function ModeExperience({ mode, onModeChange }: { mode: Mode; onModeChange: (mode: Mode) => void }) {
  const content = modeContent[mode];
  return (
    <section className="mode-section" id="method">
      <div className="mode-top">
        <SectionIndex>03 / TWO SIDES</SectionIndex>
        <div className="mode-switch" role="group" aria-label="Choose design or build perspective">
          <button className={mode === "design" ? "active" : ""} onClick={() => onModeChange("design")}>DESIGN</button>
          <span>↔</span>
          <button className={mode === "build" ? "active" : ""} onClick={() => onModeChange("build")}>BUILD</button>
        </div>
      </div>
      <div className="mode-stage" data-mode-stage>
        <div className="mode-ghost" aria-hidden="true">{mode === "design" ? "FORM" : "SYSTEM"}</div>
        <div className="mode-content">
          <p>{content.eyebrow}</p>
          <h2>{content.title}</h2>
          <div className="mode-bottom">
            <p>{content.body}</p>
            <div className="mode-list">{content.items.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
