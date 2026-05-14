import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { LATEST_POSTS_QUERY } from "@/sanity/lib/queries";
import { homeMetadata } from "@/lib/metadata/homeMetadata";
import { HomeSchema } from "@/components/schema_org/HomeSchema";
import { Hero } from "@/components/blocks/Hero/Hero";
import { LatestPosts } from "@/components/LatestPosts";
import { WhatWeOffer } from "@/components/WhatWeOffer/WhatWeOffer";
import { StatsBar } from "@/components/StatsBar/StatsBar";
import { YouTubeBanner } from "@/components/YouTubeBanner/YouTubeBanner";
import { getLatestVideo } from "@/lib/getLatestVideo";
import { siteConfig } from "@/lib/siteConfig";
import { Author } from "@/components/Author/Author";

export const metadata: Metadata = homeMetadata;

export default async function Page() {
  const [latestPosts, latestVideo] = await Promise.all([
    sanityFetch({ query: LATEST_POSTS_QUERY }),
    getLatestVideo(siteConfig.youtubeChannelId),
  ]);

  return (
    <>
      <HomeSchema />
      <Hero />
      <StatsBar />
      <WhatWeOffer />
      <Author />
      <YouTubeBanner video={latestVideo} />
      <LatestPosts posts={latestPosts || []} />
    </>
  );
}
