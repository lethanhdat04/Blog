import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/motion/fade-in";

export function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <FadeIn>
        <div className="flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {siteConfig.author.name}
            </span>
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            {siteConfig.author.title}
          </p>
          <p className="max-w-[600px] text-muted-foreground">
            {siteConfig.author.bio}
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/projects">
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/about">
              <Download className="mr-2 h-4 w-4" />
              Resume
            </Link>
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
