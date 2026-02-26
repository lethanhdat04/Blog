"use server";

import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createSkill(formData: FormData) {
  await prisma.skill.create({
    data: {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      icon: (formData.get("icon") as string) || null,
      level: parseInt(formData.get("level") as string) || 0,
      order: parseInt(formData.get("order") as string) || 0,
    },
  });
  revalidateTag("skills");
  return { success: true };
}

export async function updateSkill(id: string, formData: FormData) {
  await prisma.skill.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      icon: (formData.get("icon") as string) || null,
      level: parseInt(formData.get("level") as string) || 0,
      order: parseInt(formData.get("order") as string) || 0,
    },
  });
  revalidateTag("skills");
  return { success: true };
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } });
  revalidateTag("skills");
  return { success: true };
}
