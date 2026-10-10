"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import type { Mode } from "@/lib/types";

export function useHomeMotion(mode: Mode) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({ autoRaf: true, duration: 1.05, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const ctx = gsap.context(() => {
      gsap.from(".hero-word .char", { yPercent: 125, rotate: 3, duration: 1.15, stagger: 0.022, ease: "power4.out", delay: 0.12 });
      gsap.from(".hero-bottom", { y: 28, opacity: 0, duration: 0.9, delay: 0.8, ease: "power3.out" });
      gsap.to(".hero-orbit", { rotate: 110, scale: 1.08, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, { y: 54, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });

      gsap.utils.toArray<HTMLElement>(".project-chapter").forEach((section) => {
        const media = section.querySelector<HTMLElement>(".project-media");
        const image = section.querySelector<HTMLElement>(".project-image");
        if (media) gsap.fromTo(media, { clipPath: "inset(12% 18% 12% 18%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: section, start: "top 78%", end: "center 52%", scrub: 1 } });
        if (image) gsap.fromTo(image, { scale: 1.13, yPercent: -3 }, { scale: 1.02, yPercent: 3, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.2 } });
      });

      const track = document.querySelector<HTMLElement>(".horizontal-track");
      const shell = document.querySelector<HTMLElement>(".horizontal-shell");
      if (track && shell && window.innerWidth > 900) {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: shell, start: "top top", end: () => `+=${distance() + window.innerHeight * 0.65}`, scrub: 1, pin: true, invalidateOnRefresh: true } });
      }

      gsap.to(".scroll-progress-bar", { scaleX: 1, ease: "none", scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.2 } });
      gsap.from("[data-contact-title] span", { yPercent: 120, stagger: 0.08, duration: 0.9, ease: "power4.out", scrollTrigger: { trigger: ".contact-section", start: "top 62%" } });
    });

    return () => { ctx.revert(); lenis.destroy(); };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(".mode-content > *", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.58, ease: "power3.out" });
    gsap.fromTo(".mode-ghost", { opacity: 0, scale: 0.96 }, { opacity: 0.08, scale: 1, duration: 0.7, ease: "power3.out" });
  }, [mode]);
}
