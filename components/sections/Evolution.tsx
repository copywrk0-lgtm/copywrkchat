import Image from "next/image";
import SectionIndex from "@/components/ui/SectionIndex";

export default function Evolution() {
  return (
    <section className="proof-section">
      <div className="proof-image" data-reveal>
        <Image src="/images/copywrk-old.png" alt="Earlier Copywrk website direction" fill sizes="(max-width: 900px) 92vw, 45vw" />
      </div>
      <div className="proof-copy">
        <SectionIndex>06 / EVOLUTION</SectionIndex>
        <h2 data-reveal>Same business.<br /><em>Different gravity.</em></h2>
        <p data-reveal>Copywrk should demonstrate the standard before a client ever reads the pitch.</p>
        <div className="proof-rule" />
        <div className="proof-meta"><span>Previous direction</span><span>→</span><span>Experience-led system</span></div>
      </div>
    </section>
  );
}
