import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { AUTHORS_QUERY } from "@/sanity/lib/queries";
import { AuthorsList } from "@/components/AuthorsPage/AuthorsList/AuthorsList";
import { Hero } from "@/components/blocks/Hero/Hero";
import { siteConfig } from "@/lib/siteConfig";
import { FreeJournalBanner } from "@/components/FreeJournalBanner/FreeJournalBanner";

export const metadata: Metadata = {
  title: `Meet Our Authors | ${siteConfig.shortName}`,
  description: `Get to know the writers behind ${siteConfig.shortName} — real people with real experience, dedicated to inspiring adults 60 and over.`,
  alternates: {
    canonical: `${siteConfig.baseUrl}/authors`,
  },
  openGraph: {
    title: `Meet Our Authors | ${siteConfig.shortName}`,
    description: `Get to know the writers behind ${siteConfig.shortName} — real people with real experience, dedicated to inspiring adults 60 and over.`,
    url: `${siteConfig.baseUrl}/authors`,
  },
};

export default async function AuthorsPage() {
  const { data: authors } = await sanityFetch({
    query: AUTHORS_QUERY,
  });

  return (
    <>
      <Hero
        title="Meet Our Authors"
        text={undefined}
      />
      <AuthorsList authors={authors ?? []} />

      <FreeJournalBanner />
    </>
  );
}