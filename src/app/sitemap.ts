import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { SITEMAP_QUERY } from "@/sanity/lib/queries";
import { siteConfig } from "@/lib/siteConfig";

function getPriority(href: string): number {
  if (href === "/") return 1.0;
  if (href === "/blog") return 0.8;
  if (href.startsWith("/blog/")) return 0.7;
  if (href === "/authors") return 0.7;
  if (href.startsWith("/authors/")) return 0.7;
  if (href.startsWith("/category/")) return 0.6;
  return 0.5;
}

function getChangeFrequency(
  href: string
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (href === "/") return "daily";
  if (href === "/blog") return "daily";
  if (href.startsWith("/blog/")) return "weekly";
  if (href.startsWith("/authors/")) return "monthly";
  return "monthly";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const paths = await client.fetch(SITEMAP_QUERY);
    const baseUrl = siteConfig.baseUrl;

    const validPaths = paths.filter(
      (path: { href?: string }) =>
        typeof path.href === "string" && path.href.startsWith("/")
    );

    if (!validPaths.length) return [];

    return validPaths.map((path: { href: string; _updatedAt: string }) => ({
      url: new URL(path.href, baseUrl).toString(),
      lastModified: new Date(path._updatedAt),
      changeFrequency: getChangeFrequency(path.href),
      priority: getPriority(path.href),
    }));
  } catch (error) {
    console.error("Failed to generate sitemap:", error);
    return [];
  }
}