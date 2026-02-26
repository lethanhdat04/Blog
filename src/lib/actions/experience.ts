"use server";

import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createExperience(formData: FormData) {
  const data = {
    company: formData.get("company") as string,
    position: formData.get("position") as string,
    location: (formData.get("location") as string) || null,
    startDate: new Date(formData.get("startDate") as string),
    endDate: formData.get("endDate")
      ? new Date(formData.get("endDate") as string)
      : null,
    current: formData.get("current") === "on",
    description: (formData.get("description") as string) || null,
    highlights: (formData.get("highlights") as string)
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    techStack: (formData.get("techStack") as string)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  };

  await prisma.experience.create({ data });
  revalidateTag("experiences");
  return { success: true };
}

export async function updateExperience(id: string, formData: FormData) {
  const data = {
    company: formData.get("company") as string,
    position: formData.get("position") as string,
    location: (formData.get("location") as string) || null,
    startDate: new Date(formData.get("startDate") as string),
    endDate: formData.get("endDate")
      ? new Date(formData.get("endDate") as string)
      : null,
    current: formData.get("current") === "on",
    description: (formData.get("description") as string) || null,
    highlights: (formData.get("highlights") as string)
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    techStack: (formData.get("techStack") as string)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  };

  await prisma.experience.update({ where: { id }, data });
  revalidateTag("experiences");
  return { success: true };
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } });
  revalidateTag("experiences");
  return { success: true };
}
