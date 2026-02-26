import type { MetadataRoute } from "next";
import { posts } from "#site/content";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteConfig.url;

  const staticRoutes = [
    "",
    "/blog",
    "/projects",
    "/experience",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const blogRoutes = posts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${siteUrl}/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...blogRoutes];
}
