import type { Metadata } from "next";
import { posts } from "#site/content";
import { BlogList } from "@/components/blog/blog-list";
import { SectionHeading } from "@/components/layout/section-heading";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read my thoughts on software development, AI, and technology.",
};

function getSortedPosts() {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogPage() {
  const sortedPosts = getSortedPosts();

  return (
    <div className="container py-12 md:py-24">
      <SectionHeading
        title="Blog"
        description="Thoughts on software development, AI, and technology"
      />
      <div className="mt-8">
        <BlogList
          posts={sortedPosts.map((post) => ({
            slug: post.slug,
            title: post.title,
            description: post.description,
            date: post.date,
            tags: post.tags,
            published: post.published,
          }))}
        />
      </div>
    </div>
  );
}
