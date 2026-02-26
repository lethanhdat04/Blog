import type { Metadata } from "next";
import type { Project, ProjectTag, Tag } from "@prisma/client";
import { getProjects } from "@/lib/queries/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionHeading } from "@/components/layout/section-heading";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of projects I've built and contributed to.",
};

export const revalidate = 3600;

type ProjectWithTags = Project & { tags: (ProjectTag & { tag: Tag })[] };

export default async function ProjectsPage() {
  let projects: ProjectWithTags[] = [];
  try {
    projects = await getProjects();
  } catch {
    projects = [];
  }

  return (
    <div className="container py-12 md:py-24">
      <SectionHeading
        title="Projects"
        description="A collection of projects I've built and contributed to"
      />
      {projects.length === 0 ? (
        <p className="mt-8 text-center text-muted-foreground">
          No projects found. Check back later!
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              slug={project.slug}
              title={project.title}
              description={project.description}
              image={project.image}
              techStack={project.techStack}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}
