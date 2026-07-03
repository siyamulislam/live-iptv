import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Modern Live TV",
    short_name: "Live TV",
    description: "A premium live television streaming experience.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090B",
    theme_color: "#6366F1",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
