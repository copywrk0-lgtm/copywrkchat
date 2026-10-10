import SectionIndex from "@/components/ui/SectionIndex";
import { capabilities } from "@/data/capabilities";

export default function CapabilitiesRail() {
  return (
    <section className="horizontal-shell" id="capabilities">
      <div className="horizontal-track">
        <article className="h-panel h-panel-title">
          <SectionIndex>05 / WHAT WE BUILD</SectionIndex>
          <h2>One site.<br />Many <em>layers.</em></h2>
        </article>
        {capabilities.map((item) => (
          <article className="h-panel capability-panel" key={item.index}>
            <span>{item.index}</span><h3>{item.title}</h3><p>{item.body}</p>
            <div className="capability-line" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}
