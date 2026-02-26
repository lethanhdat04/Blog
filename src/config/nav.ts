export const navConfig = {
  mainNav: [
    { title: "Blog", href: "/blog" },
    { title: "Projects", href: "/projects" },
    { title: "Experience", href: "/experience" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  adminNav: [
    { title: "Dashboard", href: "/admin" },
    { title: "Projects", href: "/admin/projects" },
    { title: "Experience", href: "/admin/experience" },
    { title: "Skills", href: "/admin/skills" },
    { title: "Messages", href: "/admin/messages" },
    { title: "Settings", href: "/admin/settings" },
  ],
} as const;
