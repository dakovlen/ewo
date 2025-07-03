import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { SITEMAP_QUERY } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const paths = await client.fetch(SITEMAP_QUERY);

    console.log("Fetched paths:", paths); // 🔍 показує все, що прийшло з Sanity

    const validPaths = paths.filter(
      (path) => typeof path.href === "string" && path.href.startsWith("/")
    );

    console.log("Valid paths:", validPaths); // 🔍 лише ті, що реально підуть у sitemap

    if (!validPaths.length) return [];

    const baseUrl = process.env.SITE_URL || "http://localhost:3000";

    return validPaths.map((path) => ({
      url: new URL(path.href!, baseUrl).toString(),
      lastModified: new Date(path._updatedAt),
      changeFrequency: "weekly",
      priority: 1,
    }));
  } catch (error) {
    console.error("Failed to generate sitemap:", error);
    return [];
  }
}
