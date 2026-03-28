import { FacebookIcon }  from "@/components/icons/FacebookIcon";
import { YoutubeIcon }   from "@/components/icons/YoutubeIcon";
import { PinterestIcon } from "@/components/icons/PinterestIcon";
import { TwitterIcon }   from "@/components/icons/TwitterIcon";
import { AmazonIcon }    from "@/components/icons/AmazonIcon";
import { EmailIcon }     from "@/components/icons/EmailIcon";
import { siteConfig }    from "./siteConfig";
import type { ComponentType, SVGProps } from "react";

export type SocialLink = {
  label: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const socialLinks: SocialLink[] = [
  {
    label: "YouTube",
    href:  siteConfig.youtubeLink,
    Icon:  YoutubeIcon,
  },
  {
    label: "Facebook",
    href:  siteConfig.fbLink,
    Icon:  FacebookIcon,
  },
  {
    label: "Pinterest",
    href:  siteConfig.pinterestLink,
    Icon:  PinterestIcon,
  },
  {
    label: "Twitter / X",
    href:  siteConfig.xLink,
    Icon:  TwitterIcon,
  },
  {
    label: "Amazon Books",
    href:  siteConfig.amazonLink,
    Icon:  AmazonIcon,
  },
  {
    label: "Email",
    href:  `mailto:${siteConfig.mailLink}`,
    Icon:  EmailIcon,
  },
];