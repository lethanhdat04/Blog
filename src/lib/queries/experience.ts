import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getExperiences = unstable_cache(
  async () => {
    return prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
  },
  ["experiences"],
  { revalidate: 3600, tags: ["experiences"] }
);

export const getSkills = unstable_cache(
  async () => {
    return prisma.skill.findMany({
      orderBy: { order: "asc" },
    });
  },
  ["skills"],
  { revalidate: 3600, tags: ["skills"] }
);
