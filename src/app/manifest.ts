import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Datto - AI-powered Software",
    short_name: "Datto",
    description:
      "Developer portfolio and blog by Datto. Showcasing projects, technical articles, and experience in AI-powered software development.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
