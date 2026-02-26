"use server";

import { prisma } from "@/lib/prisma";

export async function markMessageRead(id: string) {
  await prisma.contactSubmission.update({
    where: { id },
    data: { read: true },
  });
  return { success: true };
}

export async function markMessageReplied(id: string) {
  await prisma.contactSubmission.update({
    where: { id },
    data: { replied: true },
  });
  return { success: true };
}

export async function deleteMessage(id: string) {
  await prisma.contactSubmission.delete({ where: { id } });
  return { success: true };
}
