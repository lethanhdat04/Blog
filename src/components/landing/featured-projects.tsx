import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/layout/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children";
import { prisma } from "@/lib/prisma";

async function getFeaturedProjects() {
  try {
    return await prisma.project.findMany({
      where: { featured: true, status: "published" },
      orderBy: { order: "asc" },
      take: 3,
    });
  } catch {
    return [];
  }
}

export async function FeaturedProjects() {
  const projects = await getFeaturedProjects();

  if (projects.length === 0) return null;

  return (
    <section className="container py-12 md:py-24">
      <FadeIn>
        <SectionHeading
          title="Featured Projects"
          description="A selection of projects I've worked on recently"
        />
      </FadeIn>
      <StaggerChildren className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <StaggerItem key={project.id}>
            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                {project.githubUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
      <FadeIn delay={0.4}>
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
