import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react";
import { getProjectBySlug, getProjectSlugs } from "@/lib/queries/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { absoluteUrl, formatDate } from "@/lib/utils";

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

        {/* Hero Image */}
        {project.image && (
          <div className="relative mb-8 aspect-video overflow-hidden rounded-xl border">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            {project.featured && (
              <div className="absolute left-4 top-4">
                <Badge className="bg-primary/90 backdrop-blur-sm">
                  Featured
                </Badge>
              </div>
            )}
          </div>
        )}

        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">
            {project.title}
          </h1>

          <p className="text-xl text-muted-foreground">
            {project.description}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(project.createdAt)}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4">
            {project.liveUrl && (
              <Button asChild>
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
            {project.githubUrl && (
              <Button variant="outline" asChild>
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
          </div>
        </div>

        {/* Project Content */}
        {project.content && (
          <>
            <hr className="my-8" />
            <div className="prose max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-p:leading-7 prose-li:leading-7 prose-ul:my-4 prose-ol:my-4">
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </div>
          </>
        )}

        {/* Screenshots Gallery */}
        {project.screenshots.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">Screenshots</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className="group relative aspect-video overflow-hidden rounded-lg border"
                >
                  <Image
                    src={screenshot}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="mt-12">
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
