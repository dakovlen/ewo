import type { Metadata } from "next";
import { siteConfig } from "../siteConfig";

export const contactMetadata: Metadata = {
  title: `Contact ${siteConfig.name} | Get in Touch`,
  description:
    "Reach out to the Elderly Wisdom team with your questions, ideas, or media inquiries. We’re here to connect with you and support the senior community.",
  alternates: {
    canonical: `${siteConfig.baseUrl}/contact`,
  },
  openGraph: {
    title: `Contact ${siteConfig.name} | Get in Touch`,
    description:
      "Connect with Elderly Wisdom – we're here to help seniors, families, and collaborators. Email us or find us on your favorite platform.",
    url: `${siteConfig.baseUrl}/contact`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: siteConfig.logo,
        width: 800,
        height: 600,
        alt: `${siteConfig.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact ${siteConfig.name} | Get in Touch`,
    description:
      "Join the Elderly Wisdom community. Contact us today with questions, ideas, or collaboration requests.",
    creator: siteConfig.twitterHandle,
    images: [siteConfig.logo],
  },
  robots: {
    index: true,
    follow: true,
  },
};
