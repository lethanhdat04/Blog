export const siteConfig = {
  name: "Datto",
  title: "Datto - AI-powered Software",
  description:
    "Developer portfolio and blog by Datto. Showcasing projects, technical articles, and experience in AI-powered software development.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  author: {
    name: "Datto",
    email: "datto@example.com",
    title: "Full Stack Developer & AI Engineer",
    bio: "Building AI-powered software solutions. Passionate about clean code, scalable architecture, and developer experience.",
    avatar: "/images/avatar.png",
    location: "San Francisco, CA",
  },
  links: {
    github: "https://github.com/datto",
    twitter: "https://twitter.com/datto",
    linkedin: "https://linkedin.com/in/datto",
  },
} as const;
