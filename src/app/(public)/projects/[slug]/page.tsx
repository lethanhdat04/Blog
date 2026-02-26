import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getProjectBySlug, getProjectSlugs } from "@/lib/queries/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { absoluteUrl } from "@/lib/utils";

interface ProjectPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  try {
    const slugs = await getProjectSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  try {
    const project = await getProjectBySlug(params.slug);
    if (!project) return {};

    return {
      title: project.title,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        url: absoluteUrl(`/projects/${project.slug}`),
        images: project.image ? [{ url: project.image }] : undefined,
      },
    };
  } catch {
    return {};
  }
}

export const revalidate = 3600;

export default async function ProjectPage({ params }: ProjectPageProps) {
  let project;
  try {
    project = await getProjectBySlug(params.slug);
  } catch {
    notFound();
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">
            {project.title}
          </h1>

          <p className="text-xl text-muted-foreground">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4">
            {project.githubUrl && (
              <Button asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button variant="outline" asChild>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>

        {project.content && (
          <>
            <hr className="my-8" />
            <div className="prose max-w-none dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </div>
          </>
        )}

        {project.tags.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-lg font-semibold">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((pt) => (
                <Badge key={pt.tagId}>{pt.tag.name}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
