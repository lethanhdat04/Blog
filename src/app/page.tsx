import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/landing/hero";
import { TechBadges } from "@/components/landing/tech-badges";
import { GitHubHeatmap } from "@/components/landing/github-heatmap";
import { FeaturedProjects } from "@/components/landing/featured-projects";
import { LatestPosts } from "@/components/landing/latest-posts";
import { CTASection } from "@/components/landing/cta-section";
import { Skeleton } from "@/components/ui/skeleton";
import { getPersonJsonLd, getWebSiteJsonLd } from "@/lib/seo/json-ld";

export default function HomePage() {
  const personJsonLd = getPersonJsonLd();
  const webSiteJsonLd = getWebSiteJsonLd();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, webSiteJsonLd]),
          }}
        />
        <Hero />
        <TechBadges />
        <GitHubHeatmap />
        <Suspense fallback={<SectionSkeleton />}>
          <FeaturedProjects />
        </Suspense>
        <LatestPosts />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div className="container py-12 md:py-24">
      <div className="space-y-2 text-center">
        <Skeleton className="mx-auto h-10 w-48" />
        <Skeleton className="mx-auto h-5 w-80" />
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
