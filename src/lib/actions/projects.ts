"use server";

import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations/project";

export async function createProject(formData: FormData) {
  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    content: formData.get("content") as string,
    image: formData.get("image") as string,
    liveUrl: formData.get("liveUrl") as string,
    githubUrl: formData.get("githubUrl") as string,
    techStack: formData.get("techStack") as string,
    featured: formData.get("featured") === "on",
    status: (formData.get("status") as string) || "published",
  };

  const validated = projectSchema.parse(raw);

  await prisma.project.create({
    data: {
      ...validated,
      liveUrl: validated.liveUrl || null,
      githubUrl: validated.githubUrl || null,
      image: validated.image || null,
      content: validated.content || null,
    },
  });

  revalidateTag("projects");
  return { success: true };
}

export async function updateProject(id: string, formData: FormData) {
  const raw = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    content: formData.get("content") as string,
    image: formData.get("image") as string,
    liveUrl: formData.get("liveUrl") as string,
    githubUrl: formData.get("githubUrl") as string,
    techStack: formData.get("techStack") as string,
    featured: formData.get("featured") === "on",
    status: (formData.get("status") as string) || "published",
  };

  const validated = projectSchema.parse(raw);

  await prisma.project.update({
    where: { id },
    data: {
      ...validated,
      liveUrl: validated.liveUrl || null,
      githubUrl: validated.githubUrl || null,
      image: validated.image || null,
      content: validated.content || null,
    },
  });

  revalidateTag("projects");
  return { success: true };
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidateTag("projects");
  return { success: true };
}
