function SplitWord({ text }: { text: string }) {
  return (
    <span className="hero-word-inner" aria-hidden="true">
      {text.split("").map((char, index) => (
        <span className="char" key={`${char}-${index}`}>{char === " " ? " " : char}</span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-meta hero-meta-left">01 — INDIA / WORLDWIDE</div>
      <div className="hero-meta hero-meta-right">SCROLL TO ENTER ↓</div>
      <div className="hero-orbit" aria-hidden="true"><div className="orbit-ring" /><div className="orbit-dot" /></div>
      <h1 className="hero-title" aria-label="Websites worth remembering">
        <span className="hero-word"><SplitWord text="WEBSITES" /></span>
        <span className="hero-word hero-word-indent"><SplitWord text="WORTH" /></span>
        <span className="hero-word hero-word-serif"><SplitWord text="REMEMBERING." /></span>
      </h1>
      <div className="hero-bottom">
        <p>Strategy, design and development for brands that would rather create a reaction than fill a template.</p>
        <a href="#work">Selected work ↓</a>
      </div>
    </section>
  );
}
