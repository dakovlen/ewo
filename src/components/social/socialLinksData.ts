// components/social/socialLinksData.ts

import { FacebookIcon } from "../icons/FacebookIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { EmailIcon } from "../icons/EmailIcon";
import { PinterestIcon } from "../icons/PinterestIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { AmazonIcon } from "../icons/AmazonIcon";
import { IconType } from "./IconType";
import { siteConfig } from "@/lib/siteConfig";

export type SocialLink = {
  href: string;
  label: string;
  icon: IconType;
  description?: string;
};

export const socialLinks: SocialLink[] = [
  {
    href: siteConfig.fbLink,
    icon: FacebookIcon,
    label: "Facebook",
    description: "Join our Facebook group and connect with others.",
  },
  {
    href: siteConfig.youtubeLink,
    icon: YoutubeIcon,
    label: "YouTube",
    description: "Subscribe for inspirational videos daily.",
  },
  {
    href: siteConfig.pinterestLink,
    icon: PinterestIcon,
    label: "Pinterest",
    description: "Discover hobby ideas and senior tips.",
  },
  {
    href: siteConfig.xLink,
    icon: TwitterIcon,
    label: "Twitter",
    description: "Follow us for quotes and quick advice.",
  },
  {
    href: siteConfig.amazonLink,
    icon: AmazonIcon,
    label: "Amazon",
    description: "Browse uplifting books by Solan Voss.",
  },
  {
    href: `mailto:${siteConfig.mailLink}`,
    icon: EmailIcon,
    label: "Email",
    description: "Send us a message directly via email.",
  },
];
