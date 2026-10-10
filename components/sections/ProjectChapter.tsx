import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/lib/types";

export default function ProjectChapter({ project, position, total }: { project: Project; position: number; total: number }) {
  const style = { "--accent": project.accent, "--image-position": project.imagePosition ?? "center" } as CSSProperties;
  return (
    <section className="project-chapter" id={project.slug} style={style}>
      <div className="project-head">
        <span>{project.index}</span><span>{project.type}</span><span>{String(position).padStart(2,"0")} / {String(total).padStart(2,"0")}</span>
      </div>
      <div className="project-sticky">
        <div className="project-media">
          <Image className="project-image" src={project.image} alt={`${project.name} project showcase`} fill sizes="100vw" priority={position === 1} />
          <div className="project-shade" />
          <div className="project-caption"><h3>{project.name}</h3><p>{project.line}</p></div>
        </div>
      </div>
      <div className="project-detail" data-reveal>
        <p>{project.summary}</p>
        <div>{project.services.map((service) => <span key={service}>{service}</span>)}</div>
      </div>
    </section>
  );
}
