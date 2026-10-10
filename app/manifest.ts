import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Copywrk",
    short_name: "Copywrk",
    description: "Independent digital studio — design, development and motion.",
    start_url: "/",
    display: "standalone",
    background_color: "#ece8df",
    theme_color: "#11100f",
    icons: [{ src: "/icons/copywrk-mark.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
