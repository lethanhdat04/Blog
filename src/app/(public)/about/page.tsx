import type { Metadata } from "next";
import Link from "next/link";
import { Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social";
import { SectionHeading } from "@/components/layout/section-heading";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about me, my journey, and what drives me.",
};

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-24">
      <SectionHeading title="About Me" />

      <div className="mx-auto mt-12 max-w-3xl space-y-8">
        <FadeIn>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              Hi, I&apos;m {siteConfig.author.name}
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {siteConfig.author.bio}
            </p>
            <p className="leading-relaxed text-muted-foreground">
              I specialize in building full-stack web applications with modern
              technologies like React, Next.js, TypeScript, and Node.js. I&apos;m
              particularly passionate about AI-powered software and creating
              tools that improve developer productivity.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              When I&apos;m not coding, you can find me exploring new technologies,
              contributing to open source, writing technical articles, or
              mentoring aspiring developers.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">What I Do</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Build scalable web applications with modern frameworks
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Design and implement AI-powered features and integrations
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Architect database schemas and API layers
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Write technical content and share knowledge
              </li>
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" />
                Get in Touch
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="h-6 w-6" />
                    <span className="sr-only">{link.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
