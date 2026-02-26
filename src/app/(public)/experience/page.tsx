import type { Metadata } from "next";
import type { Experience, Skill } from "@prisma/client";
import { getExperiences, getSkills } from "@/lib/queries/experience";
import { Timeline } from "@/components/experience/timeline";
import { SkillGrid } from "@/components/experience/skill-grid";
import { SectionHeading } from "@/components/layout/section-heading";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Experience",
  description: "My professional experience and technical skills.",
};

export const revalidate = 3600;

export default async function ExperiencePage() {
  let experiences: Experience[] = [];
  let skills: Skill[] = [];

  try {
    [experiences, skills] = await Promise.all([getExperiences(), getSkills()]);
  } catch {
    // Use empty arrays
  }

  return (
    <div className="container py-12 md:py-24">
      <SectionHeading
        title="Experience"
        description="My professional journey and the companies I've worked with"
      />
      <div className="mt-12">
        {experiences.length > 0 ? (
          <Timeline items={experiences} />
        ) : (
          <p className="text-center text-muted-foreground">
            No experience entries found.
          </p>
        )}
      </div>

      {skills.length > 0 && (
        <div className="mt-24">
          <FadeIn>
            <SectionHeading
              title="Skills"
              description="Technologies and tools I'm proficient in"
            />
          </FadeIn>
          <div className="mt-8">
            <SkillGrid skills={skills} />
          </div>
        </div>
      )}
    </div>
  );
}
