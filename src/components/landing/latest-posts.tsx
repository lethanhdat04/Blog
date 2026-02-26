import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/layout/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children";
import { posts } from "#site/content";
import { formatDate } from "@/lib/utils";

function getLatestPosts() {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
}

export function LatestPosts() {
  const latestPosts = getLatestPosts();

  if (latestPosts.length === 0) return null;

  return (
    <section className="container py-12 md:py-24">
      <FadeIn>
        <SectionHeading
          title="Latest Posts"
          description="Thoughts on software development, AI, and technology"
        />
      </FadeIn>
      <StaggerChildren className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latestPosts.map((post) => (
          <StaggerItem key={post.slug}>
            <Link href={`/${post.slug}`}>
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.date)}
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </StaggerItem>
        ))}
      </StaggerChildren>
      <FadeIn delay={0.4}>
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
