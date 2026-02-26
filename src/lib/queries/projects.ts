import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getProjects = unstable_cache(
  async () => {
    return prisma.project.findMany({
      where: { status: "published" },
      include: { tags: { include: { tag: true } } },
      orderBy: { order: "asc" },
    });
  },
  ["projects"],
  { revalidate: 3600, tags: ["projects"] }
);

export const getProjectBySlug = unstable_cache(
  async (slug: string) => {
    return prisma.project.findUnique({
      where: { slug, status: "published" },
      include: { tags: { include: { tag: true } } },
    });
  },
  ["project"],
  { revalidate: 3600, tags: ["projects"] }
);

export const getProjectSlugs = unstable_cache(
  async () => {
    const projects = await prisma.project.findMany({
      where: { status: "published" },
      select: { slug: true },
    });
    return projects.map((p) => p.slug);
  },
  ["project-slugs"],
  { revalidate: 3600, tags: ["projects"] }
);
