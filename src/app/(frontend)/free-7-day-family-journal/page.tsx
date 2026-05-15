import type { Metadata } from "next";
import { JournalHero } from "@/components/blocks/JournalPage/Hero/Hero";
import { JournalTopics } from "@/components/blocks/JournalPage/Topics/Topics";
import { JournalHowItWorks } from "@/components/blocks/JournalPage/HowItWorks/HowItWorks";
import { JournalTestimonial } from "@/components/blocks/JournalPage/Testimonial/Testimonial";
// import { JournalFinalCTA } from "@/components/blocks/JournalPage/FinalCTA/FinalCTA";
import { FreeJournalBanner } from "@/components/FreeJournalBanner/FreeJournalBanner";

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_URL = "https://elderlywisdom.org/free-7-day-family-journal";
const OG_IMAGE  = "https://elderlywisdom.org/og/free-journal.jpg";
const TITLE     = "Free 7-Day Family Journal — 7 Days Closer to Family";
const DESC      =
  "Download your free '7 Days Closer to Family' printable journal. Seven gentle daily prompts to help seniors reconnect with family — presence, love, forgiveness, gratitude, legacy, and more.";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: `${TITLE} | ElderlyWisdom`,
  description: DESC,
  keywords: [
    "free family journal for seniors",
    "family conversation starters",
    "seniors family bonding",
    "7 day printable journal",
    "family legacy journal",
    "free printable journal for seniors",
    "ElderlyWisdom Solan Voss",
  ],
  authors:   [{ name: "Solan Voss", url: "https://elderlywisdom.org/about" }],
  creator:   "Solan Voss",
  publisher: "ElderlyWisdom",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title:       TITLE,
    description: "Seven gentle daily prompts for seniors to reconnect with family. Free PDF — no login, just print and begin.",
    url:         PAGE_URL,
    siteName:    "ElderlyWisdom",
    images:      [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
    locale:      "en_US",
    type:        "website",
  },
  twitter: {
    card:        "summary_large_image",
    title:       TITLE,
    description: "Seven gentle daily prompts to reconnect with family. Free PDF — print at home.",
    images:      [OG_IMAGE],
    creator:     "@elderlywisdom",
  },
  alternates: { canonical: PAGE_URL },
};

// ─── Schema.org ───────────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":   PAGE_URL,
      url:     PAGE_URL,
      name:    TITLE,
      description: DESC,
      inLanguage:  "en-US",
      isPartOf: { "@id": "https://elderlywisdom.org/#website" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home",  item: "https://elderlywisdom.org" },
          { "@type": "ListItem", position: 2, name: TITLE,   item: PAGE_URL },
        ],
      },
    },
    {
      "@type":               "LearningResource",
      name:                  "7 Days Closer to Family — Free Printable Journal",
      description:           "A free 7-day printable journal with gentle daily prompts for seniors 65+. Seven themes: presence, love, forgiveness, sharing memories, listening, gratitude, and legacy.",
      url:                   PAGE_URL,
      image:                 OG_IMAGE,
      inLanguage:            "en-US",
      learningResourceType:  "Activity",
      educationalLevel:      "general public",
      audience: { "@type": "Audience", audienceType: "Seniors 65+, family members" },
      author:    { "@type": "Person",       name: "Solan Voss", url: "https://elderlywisdom.org/about" },
      publisher: { "@type": "Organization", name: "ElderlyWisdom", url: "https://elderlywisdom.org" },
      offers:    { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
      datePublished: "2025-01-01",
    },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FreeJournalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content">
        <JournalHero />

        <JournalTopics />

        <JournalHowItWorks />

        <JournalTestimonial />

        <FreeJournalBanner />
      </main>
    </>
  );
}