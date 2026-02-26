import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";

export function CTASection() {
  return (
    <section className="border-t bg-muted/50">
      <div className="container py-12 md:py-24">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Let&apos;s Work Together
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Have a project in mind or just want to chat? Feel free to reach
              out.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in Touch
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/blog">
                  Read My Blog
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
