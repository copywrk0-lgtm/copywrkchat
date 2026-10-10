"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import type { Mode } from "@/lib/types";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import SiteHeader from "@/components/ui/SiteHeader";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Hero from "@/components/sections/Hero";
import Principle from "@/components/sections/Principle";
import ModeExperience from "@/components/sections/ModeExperience";
import WorkIntro from "@/components/sections/WorkIntro";
import ProjectChapter from "@/components/sections/ProjectChapter";
import CapabilitiesRail from "@/components/sections/CapabilitiesRail";
import Evolution from "@/components/sections/Evolution";
import ContactCTA from "@/components/sections/ContactCTA";
import SiteFooter from "@/components/ui/SiteFooter";

export default function HomeExperience() {
  const [mode, setMode] = useState<Mode>("design");
  useHomeMotion(mode);

  return (
    <main className={`site mode-${mode}`}>
      <ScrollProgress />
      <SiteHeader />
      <Hero />
      <Principle />
      <ModeExperience mode={mode} onModeChange={setMode} />
      <WorkIntro />
      <div id="work" className="projects-wrap">
        {projects.map((project, index) => (
          <ProjectChapter
            key={project.slug}
            project={project}
            position={index + 1}
            total={projects.length}
          />
        ))}
      </div>
      <CapabilitiesRail />
      <Evolution />
      <ContactCTA />
      <SiteFooter />
    </main>
  );
}
