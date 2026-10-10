"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { SiteHeader, SiteFooter, whatsappUrl } from "./site-chrome";

const services = [
  { id: "01", slug:"websites", title: "Website design & development", copy: "Sharp, mobile-first websites built to turn attention into enquiries, calls, and conversations.", tag: "PRIMARY OFFER", color: "coral" },
  { id: "02", slug:"followup", title: "Follow-up automation", copy: "Optional follow-up systems that help businesses respond to and nurture the enquiries their website generates.", tag: "ADD-ON", color: "lime" },
];

function TypingText({text, delay=0, className=""}:{text:string;delay?:number;className?:string}) {
  const elementRef = useRef<HTMLParagraphElement>(null);
  const [started, setStarted] = useState(false);
  const [typedLength, setTypedLength] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setStarted(true); setTypedLength(text.length); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } }, {threshold:.45});
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [text]);
  useEffect(() => {
    if (!started) return;
    let typingTimer = 0;
    const startTimer = window.setTimeout(() => {
      typingTimer = window.setInterval(() => {
        setTypedLength(length => { if (length >= text.length) { window.clearInterval(typingTimer); return length; } return length + 1; });
      }, 24);
    }, delay);
    return () => { window.clearTimeout(startTimer); window.clearInterval(typingTimer); };
  }, [started, delay, text]);
  return <p ref={elementRef} className={`${className} ${typedLength === text.length ? "is-complete" : ""}`}><span className="typing-reserve" aria-hidden="true">{text}</span><span className="typing-live" aria-hidden="true">{text.slice(0, typedLength)}<i/></span><span className="sr-only">{text}</span></p>;
}

function DotField() {
  const dots = useMemo(() => Array.from({ length: 117 }), []);
  const [focus, setFocus] = useState({ x: 6, y: 4 });
  return <div className="dot-stage" onPointerMove={(e) => { const r=e.currentTarget.getBoundingClientRect(); setFocus({x:Math.round(((e.clientX-r.left)/r.width)*12),y:Math.round(((e.clientY-r.top)/r.height)*8)}); }}><div className="dot-grid" aria-hidden="true">{dots.map((_,i)=>{const x=i%13,y=Math.floor(i/13),d=Math.hypot(x-focus.x,y-focus.y);return <i key={i} style={{"--scale":Math.max(.35,2.7-d*.42),"--delay":`${(x+y)*-28}ms`} as React.CSSProperties}/>;})}</div><div className="stage-label"><span>LIVE SIGNAL</span><b>Move your pointer</b></div></div>;
}

export default function MotionSite() {
  const [flow, setFlow] = useState<"desktop"|"mobile">("desktop");
  const [introReady, setIntroReady] = useState(false);
  const introCopy = "Websites built to convert. Copywrk designs and develops premium websites for service businesses—fast, mobile-first, and built to turn visitors into real enquiries.";
  useEffect(()=>{const timer=window.setTimeout(()=>setIntroReady(true),950);return()=>window.clearTimeout(timer);},[]);
  useEffect(()=>{const nodes=[...document.querySelectorAll<HTMLElement>("[data-reveal], [data-contact-reveal]")];const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle("seen",entry.isIntersecting)),{threshold:.14});nodes.forEach(node=>observer.observe(node));return()=>observer.disconnect();},[]);
  return <main className={introReady?"intro-ready":""}>
    <div className={`intro-reveal ${introReady?"is-done":""}`} aria-hidden="true"/><SiteHeader/>
    <section className="hero" id="top"><div className="hero-kicker"><span>WEBSITE DESIGN & DEVELOPMENT</span><span>INDIA · WORLDWIDE</span></div><div className="hero-grid"><div className="hero-copy"><h1><span>WEBSITE DESIGN</span><span className="outline">FOR SERVICE</span><span>BUSINESSES<i>.</i></span></h1><div className="hero-bottom"><TypingText text={introCopy} delay={1050} className="typed-intro"/><div className="hero-actions"><a href="#proof">See our work <b>↓</b></a><a className="hero-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Start a project <b>↗</b></a></div></div></div><DotField/></div></section>
    <div className="ticker" aria-label="Copywrk services"><div>WEB DESIGN <i>✦</i> WEB DEVELOPMENT <i>✦</i> MOBILE-FIRST <i>✦</i> PERFORMANCE <i>✦</i> SEO FOUNDATION <i>✦</i> WEB DESIGN <i>✦</i></div></div>
    <section className="section seo-intro"><div className="seo-intro-copy" data-reveal><span>THE CORE OFFER</span><h2>Your website should make the business look worth contacting.</h2><div><p>Copywrk designs and develops premium websites for service businesses that need a stronger digital presence and a clearer path from visitor to enquiry.</p><p>Every project is built mobile-first, responsive across devices, performance-conscious, and structured around the actions you want visitors to take.</p><p>From dental clinics and automotive businesses to wedding brands and professional services, the goal is simple: make the business look credible and make contacting it easy.</p></div></div><div className="seo-paths" data-reveal><Link href="/website-development"><span>01</span><strong>Website development</strong><i>↗</i></Link><Link href="/work"><span>02</span><strong>Selected work</strong><i>↗</i></Link></div></section>
    <section className="section services" id="services"><div className="section-head" data-reveal><span>01 / SERVICES</span><h2>Design first.<br/>Built to <em>perform.</em></h2><TypingText text="Website design and development is the core offer. Automation can be added when the business needs it." delay={300} className="typed-service-copy"/></div><div className="service-grid">{services.map((s,index)=><Link href={`/services/${s.slug}`} className={`service-card ${s.color} reveal-delay-${index}`} key={s.id} data-reveal><div className="card-top"><span>{s.id}</span><b>{s.tag}</b></div><h3>{s.title}</h3><p>{s.copy}</p><div className="card-action"><span>{s.id==="01"?"Explore websites":"Explore automation"}</span><i>↗</i></div><div className="card-orbit" aria-hidden="true"><i/><i/><i/></div></Link>)}</div></section>
    <section className="section system" id="system"><div className="system-intro" data-reveal><span>02 / BUILD STANDARD</span><h2>Sharp on every<br/>screen.</h2><p>We build intentionally for mobile, tablet, and desktop—not a desktop design that gets squeezed down later.</p><a className="system-explore" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Discuss your website ↗</a></div><div className="flow-lab" data-reveal><div className="lab-head"><span>WEBSITE_BUILD.CW</span><div><button className={flow==="desktop"?"active":""} onClick={()=>setFlow("desktop")}>DESKTOP</button><button className={flow==="mobile"?"active":""} onClick={()=>setFlow("mobile")}>MOBILE</button></div></div><div className="flow-track">{(flow==="desktop"?["Strategy","Visual design","Development","Launch"]:["Responsive layout","Touch UX","Performance","QA"]).map((item,i)=><div className="flow-node" key={item}><span>{String(i+1).padStart(2,"0")}</span><i/><strong>{item}</strong>{i<3&&<b>→</b>}</div>)}</div><div className="lab-console"><span>STATUS</span><b>● PRODUCTION READY</b><code>{flow==="desktop"?"strategy → design → develop → deploy":"responsive → optimise → test → ship"}</code></div></div></section>
    <section className="section proof" id="proof"><div className="proof-line" data-reveal><span>SELECTED WORK / REAL BUILDS</span><h2>Judge us by<br/>the <em>work.</em></h2></div><div className="workflow-proof" data-reveal><div className="workflow-proof-screen"><div className="workflow-window"><div className="workflow-top"><span>COPYWRK / WEBSITE BUILD</span><b>LIVE</b></div><div className="workflow-canvas"><div className="wf-node"><small>01</small><strong>Brief</strong></div><i>→</i><div className="wf-node"><small>02</small><strong>Design</strong></div><i>→</i><div className="wf-node"><small>03</small><strong>Build</strong></div><i>→</i><div className="wf-node"><small>04</small><strong>Launch</strong></div></div></div></div><div className="workflow-proof-copy"><span>ACTUAL CLIENT-STYLE WORK</span><h3>Premium design without template sameness.</h3><p>Explore our selected website work across service businesses. Each build is designed around the brand, audience, content, and conversion goal rather than forcing every client into the same layout.</p><Link href="/work">View selected work ↗</Link></div></div><div className="metric-strip" data-reveal><div><b>01</b><span>Core service</span></div><div><b>100%</b><span>Responsive builds</span></div><div><b>SEO</b><span>Technical foundation</span></div><div><b>↗</b><span>Conversion-focused UX</span></div></div></section>
    <section className="section process" id="process"><div className="section-head compact" data-reveal><span>03 / PROCESS</span><h2>From idea<br/>to <em>live site.</em></h2></div><ol className="steps">{[['01','Understand the business','We map the offer, audience, pages, content, references, and primary conversion goal.'],['02','Design the experience','We establish the visual direction, hierarchy, responsive behaviour, and interaction style.'],['03','Build and refine','The approved direction becomes a fast, responsive production website with focused revision rounds.'],['04','Launch and hand over','We connect the domain, deploy the site, test the important paths, and hand over the project.']].map((s,i)=><li key={s[0]} className={`reveal-step-${i}`} data-reveal><span>{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p><i>↘</i></li>)}</ol></section>
    <section className="contact" id="contact" data-contact-reveal><div className="contact-signal" aria-hidden="true">{Array.from({length:36},(_,i)=><i key={i}/>)}</div><span>READY FOR A BETTER WEBSITE?</span><h2>Make the<br/><em>first impression</em><br/>count.</h2><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">Start a project <b>↗</b></a></section><SiteFooter/>
  </main>;
}
