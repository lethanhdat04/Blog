import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const postMeta = await prisma.postMeta.upsert({
      where: { slug: params.slug },
      update: { views: { increment: 1 } },
      create: { slug: params.slug, views: 1 },
    });

    return NextResponse.json({ views: postMeta.views });
  } catch {
    return NextResponse.json({ views: 0 });
  }
}

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const postMeta = await prisma.postMeta.findUnique({
      where: { slug: params.slug },
    });

    return NextResponse.json({ views: postMeta?.views ?? 0 });
  } catch {
    return NextResponse.json({ views: 0 });
  }
}
