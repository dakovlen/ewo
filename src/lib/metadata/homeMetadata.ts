import { siteConfig } from "@/lib/siteConfig";
import type { Metadata } from "next";

export const homeMetadata: Metadata = {
  title: `${siteConfig.name} — Wisdom for Life After 60`,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.baseUrl,
  },
  openGraph: {
    title: `${siteConfig.name} — Wisdom for Life After 60`,
    description: siteConfig.description,
    url: siteConfig.baseUrl,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Wisdom for Life After 60`,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    images: [`${siteConfig.baseUrl}/og-image.jpg`],
  },
};