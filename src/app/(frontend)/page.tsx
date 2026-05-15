import type { Metadata } from "next";

// Sanity / data layer
import { sanityFetch } from "@/sanity/lib/live";
import { LATEST_POSTS_QUERY } from "@/sanity/lib/queries";

// Config / lib
import { homeMetadata } from "@/lib/metadata/homeMetadata";
import { getLatestVideo } from "@/lib/getLatestVideo";
import { siteConfig } from "@/lib/siteConfig";

// Schema
import { HomeSchema } from "@/components/schema_org/HomeSchema";

// Components — в порядку появи в JSX
import { Hero } from "@/components/blocks/Hero/Hero";
import { StatsBar } from "@/components/StatsBar/StatsBar";
import { WhatWeOffer } from "@/components/WhatWeOffer/WhatWeOffer";
import { LatestPosts } from "@/components/LatestPosts/LatestPosts";
import { Author } from "@/components/Author/Author";
import { FreeJournalBanner } from "@/components/FreeJournalBanner/FreeJournalBanner";
import { YouTubeBanner } from "@/components/YouTubeBanner/YouTubeBanner";

export const metadata: Metadata = homeMetadata;

export default async function Page() {
  const [{ data: latestPosts }, latestVideo] = await Promise.all([
    sanityFetch({ query: LATEST_POSTS_QUERY }),
    getLatestVideo(siteConfig.youtubeChannelId),
  ]);

  return (
    <>
      <HomeSchema />
      <Hero />
      <StatsBar />
      <WhatWeOffer />
      <LatestPosts posts={latestPosts || []} />
      <Author />
      <FreeJournalBanner />
      <YouTubeBanner video={latestVideo} />
    </>
  );
}