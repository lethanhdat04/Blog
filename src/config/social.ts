import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/datto",
    icon: Github,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/datto",
    icon: Twitter,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/datto",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:datto@example.com",
    icon: Mail,
  },
] as const;
