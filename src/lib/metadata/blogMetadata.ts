import { siteConfig } from "@/lib/siteConfig";
import type { Metadata } from "next";

export const blogMetadata: Metadata = {
  title: `${siteConfig.shortName} Blog – Insightful Articles & Inspiration for Seniors`,
  description:
    'Explore thoughtful and uplifting articles for seniors focused on wellness, hobbies, mental clarity, aging with grace, meaningful living, and joyful routines – only on ElderlyWisdom.',
  alternates: {
    canonical: `${siteConfig.baseUrl}/blog`,
  },
  openGraph: {
    title: `${siteConfig.shortName} Blog – Insightful Articles & Inspiration for Seniors`,
    description: 'Explore thoughtful and uplifting articles for seniors focused on wellness, hobbies, mental clarity, aging with grace, meaningful living, and joyful routines – only on ElderlyWisdom.',
    url: `${siteConfig.baseUrl}/blog`,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${siteConfig.baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.shortName} – A Blog for Seniors`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.shortName} Blog – Insightful Articles & Inspiration for Seniors`,
    description: 'Explore thoughtful and uplifting articles for seniors focused on wellness, hobbies, mental clarity, aging with grace, meaningful living, and joyful routines – only on ElderlyWisdom.',
    site: '@SolanVoss',
    images: [`${siteConfig.baseUrl}/og-image.jpg`],
  },
};
