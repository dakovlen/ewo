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
import { MissionStatement } from "@/components/MissionStatement/MissionStatement";
import { FAQs } from "@/components/blocks/FAQs/FAQs";
import { Testimonials } from "@/components/Testimonials/Testimonials";


export const metadata: Metadata = homeMetadata;

const HOME_FAQS = [
  {
    _id: "home-faq-1",
    title: "What is ElderlyWisdom.org?",
    text: "ElderlyWisdom.org is a website dedicated to adults 60 and over, offering weekly articles, YouTube videos, and books about family relationships, health, purpose, and finding joy in later life. Everything is created to inform, encourage, and uplift — with warmth and genuine respect for the generation that built the world we live in today.",
  },
  {
    _id: "home-faq-2",
    title: "Who writes the content on ElderlyWisdom?",
    text: "All content is created by Solan Voss, an author and content creator focused on enriching life after 60. Solan draws on personal reflection and careful research to share practical, heartfelt guidance — the kind of advice you'd hope to hear from a trusted friend rather than a generic health blog.",
  },
  {
    _id: "home-faq-3",
    title: "Is everything on ElderlyWisdom free?",
    text: "Yes. Every article on the blog is completely free to read, and the YouTube channel is always free to watch. We also offer a free 7-day family journal to help you reconnect with the people you love. Our word search and puzzle books are available separately on Amazon for those who'd like one.",
  },
  {
    _id: "home-faq-4",
    title: "How often is new content published?",
    text: "New articles and videos are published every week. The best way to stay up to date is to subscribe to our email newsletter or follow the ElderlyWisdom Mind channel on YouTube — that way a new story or piece of advice is always waiting for you.",
  },
  {
    _id: "home-faq-5",
    title: "What is the free 7-day family journal?",
    text: "It's a free, printable journal designed to help seniors reconnect with their adult children and grandchildren over the course of a week. Each day offers a simple, gentle prompt to reflect, remember, and reach out — a small daily step toward closer, warmer relationships. No account needed — just print and begin.",
  },
  {
    _id: "home-faq-6",
    title: "Can I share ElderlyWisdom articles with my family and friends?",
    text: "Absolutely, and we hope you do. Every article is free to share by link, and many of our readers pass along stories to their children, grandchildren, and friends. Sharing wisdom is exactly what ElderlyWisdom was made for.",
  },
];

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
      <MissionStatement />
      <Testimonials />
      <FAQs title="Everything you need to know" faqs={HOME_FAQS} />
      <FreeJournalBanner />
      <YouTubeBanner video={latestVideo} />
    </>
  );
}