import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/layout/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children";

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Prisma",
  "Tailwind CSS",
  "Docker",
  "AWS",
  "Git",
  "GraphQL",
  "Redis",
  "Framer Motion",
];

export function TechBadges() {
  return (
    <section className="container py-12 md:py-24">
      <FadeIn>
        <SectionHeading
          title="Tech Stack"
          description="Technologies I work with daily to build modern applications"
        />
      </FadeIn>
      <StaggerChildren className="mt-8 flex flex-wrap justify-center gap-3">
        {technologies.map((tech) => (
          <StaggerItem key={tech}>
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium"
            >
              {tech}
            </Badge>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
