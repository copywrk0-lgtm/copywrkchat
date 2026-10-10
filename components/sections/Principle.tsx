import SectionIndex from "@/components/ui/SectionIndex";

export default function Principle() {
  return (
    <section className="statement">
      <SectionIndex>02 / PRINCIPLE</SectionIndex>
      <p className="statement-kicker" data-reveal>THE WEBSITE IS NOT THE CONTAINER.</p>
      <h2 data-reveal>It is the <em>experience</em> people use to decide what your business feels like.</h2>
      <div className="statement-grid" data-reveal>
        <span>FAST ON EVERY SCREEN.</span><span>CLEAR WHERE IT COUNTS.</span><span>NEVER FROM A TEMPLATE.</span>
      </div>
    </section>
  );
}
