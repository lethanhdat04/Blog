"use client";

import { useMemo, useState } from "react";
import { PostCard } from "./post-card";
import { BlogSearch } from "./blog-search";
import { TagFilter } from "./tag-filter";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  metadata?: { readingTime: number; wordCount: number };
}

interface BlogListProps {
  posts: Post[];
}

export function BlogList({ posts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <BlogSearch onSearch={setSearchQuery} />
        <TagFilter
          tags={allTags}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
        />
      </div>
      {filteredPosts.length === 0 ? (
        <p className="text-center text-muted-foreground">No posts found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
      )}
    </div>
  );
}
