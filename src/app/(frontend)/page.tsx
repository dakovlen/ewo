import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { LATEST_POSTS_QUERY } from "@/sanity/lib/queries";
import { homeMetadata } from "@/lib/metadata/homeMetadata";
import { HomeSchema } from "@/components/schema_org/HomeSchema";
import { Hero } from "@/components/blocks/Hero/Hero";
import { LatestPosts } from "@/components/LatestPosts";

export const metadata: Metadata = homeMetadata;

export default async function Page() {
  const { data: latestPosts } = await sanityFetch({
    query: LATEST_POSTS_QUERY,
  });

  return (
    <>
      <HomeSchema />
      <Hero />
      <LatestPosts posts={latestPosts || []} />
    </>
  );
}