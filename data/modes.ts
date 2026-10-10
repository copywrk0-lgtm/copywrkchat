import type { Mode } from "@/lib/types";

export const modeContent: Record<Mode, { eyebrow: string; title: string; body: string; items: string[] }> = {
  design: {
    eyebrow: "ART DIRECTION / EXPERIENCE",
    title: "Make them feel it before they understand it.",
    body: "Composition, typography, image rhythm and motion designed as one continuous experience.",
    items: ["Creative direction", "Responsive art direction", "Motion systems", "Conversion hierarchy"],
  },
  build: {
    eyebrow: "ENGINEERING / PERFORMANCE",
    title: "Make the beautiful thing hold up under pressure.",
    body: "Responsive systems, fast delivery, accessible interactions and clean frontend execution.",
    items: ["Next.js / React", "GSAP / Lenis", "Performance + SEO", "Responsive QA"],
  },
};
