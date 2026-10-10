export type Mode = "design" | "build";

export type Project = {
  index: string;
  slug: string;
  name: string;
  type: string;
  line: string;
  summary: string;
  image: string;
  imagePosition?: string;
  accent: string;
  services: string[];
};
