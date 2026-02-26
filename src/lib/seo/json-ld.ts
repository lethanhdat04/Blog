import { siteConfig } from "@/config/site";
import { SITE_URL } from "./constants";

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    url: SITE_URL,
    jobTitle: siteConfig.author.title,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.twitter,
      siteConfig.links.linkedin,
    ],
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    url: SITE_URL,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
  };
}

export function getArticleJsonLd({
  title,
  description,
  date,
  url,
  image,
}: {
  title: string;
  description: string;
  date: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    url,
    image,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
  };
}
