import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx/mdx-content";
import { TableOfContents } from "@/components/blog/toc";
import { ViewCounter } from "@/components/blog/view-counter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { getArticleJsonLd } from "@/lib/seo/json-ld";
import { absoluteUrl } from "@/lib/utils";

interface PostPageProps {
  params: { slug: string[] };
}

function getPostBySlug(slug: string[]) {
  const slugPath = "blog/" + slug.join("/");
  return posts.find((post) => post.slug === slugPath);
}

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(`/${post.slug}`),
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post || !post.published) {
    notFound();
  }

  const jsonLd = getArticleJsonLd({
    title: post.title,
    description: post.description,
    date: post.date,
    url: absoluteUrl(`/${post.slug}`),
    image: post.image,
  });

  return (
    <article className="container py-12 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            {post.metadata?.readingTime && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.metadata.readingTime} min read
              </span>
            )}
            <ViewCounter slug={post.slugAsParams} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground">{post.description}</p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <hr className="my-8" />

        <div className="flex gap-12">
          <div className="prose min-w-0 flex-1 dark:prose-invert">
            <MDXContent code={post.body} />
          </div>
          {post.toc && post.toc.length > 0 && (
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-20">
                <TableOfContents items={post.toc} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </article>
  );
}
