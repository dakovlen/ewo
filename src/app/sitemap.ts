import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { SITEMAP_QUERY } from "@/sanity/lib/queries";
import { siteConfig } from "@/lib/siteConfig";

type SitemapEntry = MetadataRoute.Sitemap[number];



function getPriority(href: string): number {
  if (href.startsWith("/blog/"))     return 0.7;
  if (href.startsWith("/authors/")) return 0.7;
  if (href.startsWith("/category/")) return 0.6;
  return 0.5;
}

function getChangeFrequency(href: string): SitemapEntry["changeFrequency"] {
  if (href.startsWith("/blog/"))     return "weekly";
  if (href.startsWith("/authors/")) return "monthly";
  if (href.startsWith("/category/")) return "weekly";
  return "monthly";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: SitemapEntry[] = [
    {
      url: `${siteConfig.baseUrl}/`,
      changeFrequency: "daily",
      priority: 1.0,
      lastModified: now,
    },
    {
      url: `${siteConfig.baseUrl}/free-7-day-family-journal`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: now,
    },
    {
      url: `${siteConfig.baseUrl}/blog`,
      changeFrequency: "daily",
      priority: 0.8,
      lastModified: now,
    },
    {
      url: `${siteConfig.baseUrl}/authors`,
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: now,
    },
    {
      url: `${siteConfig.baseUrl}/category`,
      changeFrequency: "weekly",
      priority: 0.6,
      lastModified: now,
    },
    {
      url: `${siteConfig.baseUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.5,
      lastModified: now,
    },
  ];

  try {
    const paths: Array<{ href: string; _updatedAt: string }> =
      await client.fetch(SITEMAP_QUERY);

    const dynamicEntries: MetadataRoute.Sitemap = paths.map((path) => ({
      url: new URL(path.href, siteConfig.baseUrl).toString(),
      lastModified: new Date(path._updatedAt),
      changeFrequency: getChangeFrequency(path.href),
      priority: getPriority(path.href),
    }));

    return [...staticRoutes, ...dynamicEntries];
  } catch (error) {
    console.error("Failed to generate sitemap:", error);
    // Якщо Sanity недоступний — повертаємо хоча б статичні сторінки
    return staticRoutes;
  }
}