import type { ReactNode } from "react";

export default function SectionIndex({ children }: { children: ReactNode }) {
  return <span className="section-index">{children}</span>;
}
