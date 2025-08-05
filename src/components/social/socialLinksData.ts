// components/social/socialLinksData.ts

import { FacebookIcon } from "../icons/FacebookIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { EmailIcon } from "../icons/EmailIcon";
import { PinterestIcon } from "../icons/PinterestIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { AmazonIcon } from "../icons/AmazonIcon";
import { IconType } from "./IconType";

export type SocialLink = {
  href: string;
  label: string;
  icon: IconType;
  description?: string;
};

export const socialLinks: SocialLink[] = [
  {
    href: "https://www.facebook.com/groups/1286296679591129",
    icon: FacebookIcon,
    label: "Facebook",
    description: "Join our Facebook group and connect with others.",
  },
  {
    href: "https://www.youtube.com/@ElderlyWisdomDailyTop?sub_confirmation=1",
    icon: YoutubeIcon,
    label: "YouTube",
    description: "Subscribe for inspirational videos daily.",
  },
  {
    href: "https://pinterest.com/SolanVossPro",
    icon: PinterestIcon,
    label: "Pinterest",
    description: "Discover hobby ideas and senior tips.",
  },
  {
    href: "https://x.com/SolanVoss",
    icon: TwitterIcon,
    label: "Twitter",
    description: "Follow us for quotes and quick advice.",
  },
  {
    href: "https://www.amazon.de/stores/Solan-Voss/author/B0F8QWL2FP",
    icon: AmazonIcon,
    label: "Amazon",
    description: "Browse uplifting books by Solan Voss.",
  },
  {
    href: "mailto:elderly.wisdom.daily@gmail.com",
    icon: EmailIcon,
    label: "Email",
    description: "Send us a message directly via email.",
  },
];
